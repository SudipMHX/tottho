'use client'

import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import { v4 as uuidv4 } from 'uuid'
import { cn } from '@/lib/utils'
import { useDimensions } from '@/components/hooks/use-debounced-dimensions'

interface PixelTrailProps {
  pixelSize: number
  fadeDuration?: number
  delay?: number
  className?: string
  pixelClassName?: string
}

const PixelTrail: React.FC<PixelTrailProps> = ({
  pixelSize = 20,
  fadeDuration = 500,
  delay = 0,
  className,
  pixelClassName,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const dimensions = useDimensions(containerRef as React.RefObject<HTMLElement | null>)
  // Stable ID generated once per component instance — using useMemo not useRef
  // so the value can be safely read during render without triggering the refs rule.
  const trailId = useMemo(() => uuidv4(), [])

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      // Ignore if cursor is outside the container bounds
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) return
      const x = Math.floor((e.clientX - rect.left) / pixelSize)
      const y = Math.floor((e.clientY - rect.top) / pixelSize)
      const pixelElement = document.getElementById(
        `${trailId}-pixel-${x}-${y}`
      )
      if (pixelElement) {
        const animatePixel = (pixelElement as HTMLElement & { __animatePixel?: () => void }).__animatePixel
        if (animatePixel) animatePixel()
      }
    },
    [pixelSize, trailId]
  )

  useEffect(() => {
    window.addEventListener('pointermove', handlePointerMove)
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [handlePointerMove])

  const columns = useMemo(() => Math.ceil(dimensions.width / pixelSize), [dimensions.width, pixelSize])
  const rows    = useMemo(() => Math.ceil(dimensions.height / pixelSize), [dimensions.height, pixelSize])


  return (
    <div
      ref={containerRef}
      className={cn('absolute inset-0 w-full h-full pointer-events-none', className)}
    >
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <PixelDot
              key={`${colIndex}-${rowIndex}`}
              id={`${trailId}-pixel-${colIndex}-${rowIndex}`}
              size={pixelSize}
              fadeDuration={fadeDuration}
              delay={delay}
              className={pixelClassName}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

interface PixelDotProps {
  id: string
  size: number
  fadeDuration: number
  delay: number
  className?: string
}

const PixelDot: React.FC<PixelDotProps> = React.memo(({ id, size, fadeDuration, delay, className }) => {
  const controls = useAnimationControls()

  const animatePixel = useCallback(() => {
    controls.start({
      opacity: [1, 0],
      transition: { duration: fadeDuration / 1000, delay: delay / 1000 },
    })
  }, [controls, fadeDuration, delay])

  const ref = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) {
        ;(node as HTMLDivElement & { __animatePixel?: () => void }).__animatePixel = animatePixel
      }
    },
    [animatePixel]
  )

  return (
    <motion.div
      id={id}
      ref={ref}
      className={cn(className)}
      style={{ width: `${size}px`, height: `${size}px` }}
      initial={{ opacity: 0 }}
      animate={controls}
    />
  )
})

PixelDot.displayName = 'PixelDot'
export { PixelTrail }
