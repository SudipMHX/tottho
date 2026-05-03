'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { ReactNode, forwardRef } from 'react'

interface MotionDivProps extends HTMLMotionProps<"div"> {
  children?: ReactNode
}

export const MotionDiv = forwardRef<HTMLDivElement, MotionDivProps>(
  ({ children, ...props }, ref) => {
    return (
      <motion.div ref={ref} {...props}>
        {children}
      </motion.div>
    )
  }
)

MotionDiv.displayName = 'MotionDiv'
