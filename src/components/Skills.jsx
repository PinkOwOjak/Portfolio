import React from 'react'
import { SKILLS } from '../data'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

// Container animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
}

// Item animation variants
const itemVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
}

export default function Skills(){
  const [ref, inView] = useScrollAnimation({ threshold: 0.2 })

  return (
    <section ref={ref} id="skills" className="card">
      <motion.h3 
        initial={{ x: -20, opacity: 0 }}
        animate={inView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="text-xl font-bold"
      >
        Skills
      </motion.h3>
      <motion.div 
        className="mt-4 flex flex-wrap gap-2"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {SKILLS.map((s, i) => (
          <motion.span 
            key={i} 
            variants={itemVariants}
            whileHover={{ scale:1.1, rotate: [0, -5, 5, 0] }} 
            className="skill-badge"
          >
            {s}
          </motion.span>
        ))}
      </motion.div>
    </section>
  )
}