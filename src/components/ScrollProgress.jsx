import React from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * Scroll progress indicator - shows how far down the page you've scrolled
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-indigo-600 origin-left z-50"
      style={{ scaleX }}
    />
  )
}
