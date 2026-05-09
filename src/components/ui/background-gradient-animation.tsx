'use client'

import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'

interface BackgroundGradientAnimationProps {
  firstColor?: string
  secondColor?: string
  thirdColor?: string
  fourthColor?: string
  fifthColor?: string
  pointerColor?: string
  size?: string
  blendingValue?: string
  children?: React.ReactNode
  className?: string
  interactive?: boolean
  containerClassName?: string
  /** Background gradient start colour (CSS colour string) */
  bgStart?: string
  /** Background gradient end colour (CSS colour string) */
  bgEnd?: string
}

export function BackgroundGradientAnimation({
  firstColor = '242, 0, 137',
  secondColor = '209, 0, 209',
  thirdColor = '161, 0, 242',
  fourthColor = '45, 0, 247',
  fifthColor = '242, 0, 137',
  pointerColor = '209, 0, 209',
  size = '50%',
  blendingValue = 'hard-light',
  children,
  className,
  interactive = true,
  containerClassName,
  bgStart = '#000000',
  bgEnd = '#000000',
}: BackgroundGradientAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const interactiveRef = useRef<HTMLDivElement>(null)
  const curXRef = useRef(0)
  const curYRef = useRef(0)
  const tgXRef = useRef(0)
  const tgYRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const [isSafari, setIsSafari] = useState(false)

  // Set CSS variables on the container (not document.body) to avoid polluting global scope
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    el.style.setProperty('--gradient-background-start', bgStart)
    el.style.setProperty('--gradient-background-end', bgEnd)
    el.style.setProperty('--first-color', firstColor)
    el.style.setProperty('--second-color', secondColor)
    el.style.setProperty('--third-color', thirdColor)
    el.style.setProperty('--fourth-color', fourthColor)
    el.style.setProperty('--fifth-color', fifthColor)
    el.style.setProperty('--pointer-color', pointerColor)
    el.style.setProperty('--size', size)
    el.style.setProperty('--blending-value', blendingValue)
  }, [bgStart, bgEnd, firstColor, secondColor, thirdColor, fourthColor, fifthColor, pointerColor, size, blendingValue])

  useEffect(() => {
    const isSafariUA = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    const t = setTimeout(() => setIsSafari(isSafariUA), 0)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!interactive) return

    function animate() {
      if (interactiveRef.current) {
        curXRef.current += (tgXRef.current - curXRef.current) / 20
        curYRef.current += (tgYRef.current - curYRef.current) / 20
        interactiveRef.current.style.transform = `translate(${Math.round(curXRef.current)}px, ${Math.round(curYRef.current)}px)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => { if (rafRef.current !== null) cancelAnimationFrame(rafRef.current) }
  }, [interactive])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactiveRef.current) return
    const rect = interactiveRef.current.getBoundingClientRect()
    tgXRef.current = e.clientX - rect.left
    tgYRef.current = e.clientY - rect.top
  }

  return (
    <div
      ref={containerRef}
      className={classNames(
        'fixed inset-0 overflow-hidden bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]',
        containerClassName,
      )}
    >
      {/* Gooey SVG filter */}
      <svg className="hidden absolute" aria-hidden="true">
        <defs>
          <filter id="aurora-blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* Content slot */}
      <div className={classNames(className)}>{children}</div>

      {/* Animated blobs */}
      <div
        className={classNames(
          'absolute inset-0 h-full w-full blur-lg pointer-events-none',
          isSafari ? 'blur-2xl' : '[filter:url(#aurora-blur)_blur(40px)]',
        )}
      >
        {/* blob 1 */}
        <div className={classNames(
          'absolute [background:radial-gradient(circle_at_center,_rgba(var(--first-color),_0.9)_0,_rgba(var(--first-color),_0)_50%)_no-repeat]',
          '[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)]',
          'top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]',
          '[transform-origin:center_center] animate-first opacity-100',
        )} />
        {/* blob 2 */}
        <div className={classNames(
          'absolute [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.8)_0,_rgba(var(--second-color),_0)_50%)_no-repeat]',
          '[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)]',
          'top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]',
          '[transform-origin:calc(50%-400px)] animate-second opacity-100',
        )} />
        {/* blob 3 */}
        <div className={classNames(
          'absolute [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.8)_0,_rgba(var(--third-color),_0)_50%)_no-repeat]',
          '[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)]',
          'top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]',
          '[transform-origin:calc(50%+400px)] animate-third opacity-100',
        )} />
        {/* blob 4 */}
        <div className={classNames(
          'absolute [background:radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.8)_0,_rgba(var(--fourth-color),_0)_50%)_no-repeat]',
          '[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)]',
          'top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]',
          '[transform-origin:calc(50%-200px)] animate-fourth opacity-70',
        )} />
        {/* blob 5 */}
        <div className={classNames(
          'absolute [background:radial-gradient(circle_at_center,_rgba(var(--fifth-color),_0.8)_0,_rgba(var(--fifth-color),_0)_50%)_no-repeat]',
          '[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)]',
          'top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]',
          '[transform-origin:calc(50%-800px)_calc(50%+800px)] animate-fifth opacity-100',
        )} />

        {/* Interactive pointer blob */}
        {interactive && (
          <div
            ref={interactiveRef}
            onMouseMove={handleMouseMove}
            className={classNames(
              'absolute [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.8)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat]',
              '[mix-blend-mode:var(--blending-value)] w-full h-full -top-1/2 -left-1/2 opacity-70',
            )}
          />
        )}
      </div>
    </div>
  )
}
