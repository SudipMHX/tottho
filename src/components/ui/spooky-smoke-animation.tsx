'use client'

import React, { useEffect, useRef } from 'react'

/* ── GLSL Shaders ── */
const VERTEX_SRC = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`

const FRAGMENT_SRC = `#version 300 es
precision highp float;
out vec4 O;
uniform float time;
uniform vec2 resolution;
uniform vec3 u_color;

#define FC gl_FragCoord.xy
#define R resolution
#define T (time+660.)

float rnd(vec2 p){p=fract(p*vec2(12.9898,78.233));p+=dot(p,p+34.56);return fract(p.x*p.y);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);return mix(mix(rnd(i),rnd(i+vec2(1,0)),u.x),mix(rnd(i+vec2(0,1)),rnd(i+1.),u.x),u.y);}
float fbm(vec2 p){float t=.0,a=1.;for(int i=0;i<5;i++){t+=a*noise(p);p*=mat2(1,-1.2,.2,1.2)*2.;a*=.5;}return t;}

void main(){
  vec2 uv=(FC-.5*R)/R.y;
  vec3 col=vec3(1);
  uv.x+=.25;
  uv*=vec2(2,1);

  float n=fbm(uv*.28-vec2(T*.01,0));
  n=noise(uv*3.+n*2.);

  col.r-=fbm(uv+vec2(0,T*.015)+n);
  col.g-=fbm(uv*1.003+vec2(0,T*.015)+n+.003);
  col.b-=fbm(uv*1.006+vec2(0,T*.015)+n+.006);

  col=mix(col, u_color, dot(col,vec3(.21,.71,.07)));

  col=mix(vec3(.08),col,min(time*.1,1.));
  col=clamp(col,.08,1.);
  O=vec4(col,1);
}`

/* ── WebGL2 Renderer ── */
class Renderer {
  private gl: WebGL2RenderingContext | null
  private canvas: HTMLCanvasElement
  private program: WebGLProgram | null = null
  private vs: WebGLShader | null = null
  private fs: WebGLShader | null = null
  private buffer: WebGLBuffer | null = null
  private color: [number, number, number] = [0.5, 0.5, 0.5]
  public isSupported: boolean

  constructor(canvas: HTMLCanvasElement, fragmentSource: string) {
    this.canvas = canvas
    this.gl = canvas.getContext('webgl2')
    this.isSupported = this.gl !== null
    if (!this.isSupported) return
    this.setup(fragmentSource)
    this.init()
  }

  updateColor(color: [number, number, number]) {
    this.color = color
  }

  updateScale() {
    if (!this.gl) return
    const dpr = Math.max(1, window.devicePixelRatio)
    this.canvas.width = window.innerWidth * dpr
    this.canvas.height = window.innerHeight * dpr
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height)
  }

  private compile(shader: WebGLShader, source: string) {
    if (!this.gl) return
    this.gl.shaderSource(shader, source)
    this.gl.compileShader(shader)
    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      console.error('Shader error:', this.gl.getShaderInfoLog(shader))
    }
  }

  private setup(fragmentSource: string) {
    const gl = this.gl!
    this.vs = gl.createShader(gl.VERTEX_SHADER)!
    this.fs = gl.createShader(gl.FRAGMENT_SHADER)!
    this.program = gl.createProgram()!
    this.compile(this.vs, VERTEX_SRC)
    this.compile(this.fs, fragmentSource)
    gl.attachShader(this.program, this.vs)
    gl.attachShader(this.program, this.fs)
    gl.linkProgram(this.program)
    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      console.error('Link error:', gl.getProgramInfoLog(this.program))
    }
  }

  private init() {
    const gl = this.gl!
    const { program } = this
    if (!program) return
    const vertices = new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1])
    this.buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer)
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
    const pos = gl.getAttribLocation(program, 'position')
    gl.enableVertexAttribArray(pos)
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)
    ;(program as WebGLProgram & Record<string, unknown>)['resolution'] = gl.getUniformLocation(program, 'resolution')
    ;(program as WebGLProgram & Record<string, unknown>)['time'] = gl.getUniformLocation(program, 'time')
    ;(program as WebGLProgram & Record<string, unknown>)['u_color'] = gl.getUniformLocation(program, 'u_color')
  }

  render(now = 0) {
    const gl = this.gl
    const { program, buffer, canvas, color } = this
    if (!gl || !program || !gl.isProgram(program)) return
    const p = program as WebGLProgram & Record<string, WebGLUniformLocation>
    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.useProgram(program)
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.uniform2f(p['resolution'], canvas.width, canvas.height)
    gl.uniform1f(p['time'], now * 1e-3)
    gl.uniform3fv(p['u_color'], color)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
  }

  reset() {
    const gl = this.gl
    const { program, vs, fs } = this
    if (!gl || !program) return
    if (vs) { gl.detachShader(program, vs); gl.deleteShader(vs) }
    if (fs) { gl.detachShader(program, fs); gl.deleteShader(fs) }
    gl.deleteProgram(program)
    this.program = null
  }
}

/* ── Hex → RGB float tuple ── */
function hexToRgb(hex: string): [number, number, number] | null {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return r
    ? [parseInt(r[1], 16) / 255, parseInt(r[2], 16) / 255, parseInt(r[3], 16) / 255]
    : null
}

/* ── React component ── */
interface SmokeBackgroundProps {
  smokeColor?: string // hex, e.g. "#8A2BE2"
  className?: string
}

export const SmokeBackground: React.FC<SmokeBackgroundProps> = ({
  smokeColor = '#808080',
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rendererRef = useRef<Renderer | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const renderer = new Renderer(canvasRef.current, FRAGMENT_SRC)
    rendererRef.current = renderer

    // Gracefully degrade when WebGL2 is unavailable (e.g. sandboxed iframe)
    if (!renderer.isSupported) return

    const handleResize = () => renderer.updateScale()
    handleResize()
    window.addEventListener('resize', handleResize)

    let rafId: number
    const loop = (now: number) => {
      renderer.render(now)
      rafId = requestAnimationFrame(loop)
    }
    loop(0)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(rafId)
      renderer.reset()
    }
  }, [])

  useEffect(() => {
    if (!rendererRef.current) return
    const rgb = hexToRgb(smokeColor)
    if (rgb) rendererRef.current.updateColor(rgb)
  }, [smokeColor])

  return <canvas ref={canvasRef} className={className ?? 'w-full h-full block'} />
}
