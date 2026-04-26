import React from 'react'
import { EDUCATION } from '../data'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

// Container animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

// Item animation variants
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

export default function Education(){
  const [ref, inView] = useScrollAnimation({ threshold: 0.2 })

  return (
    <section ref={ref} id="education" className="card">
      <motion.h3 
        initial={{ x: -20, opacity: 0 }}
        animate={inView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="text-xl font-bold"
      >
        Education
      </motion.h3>
      <motion.div 
        className="mt-4 grid md:grid-cols-3 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {EDUCATION.map(e => (
          <motion.div 
            key={e.key} 
            variants={itemVariants}
            whileHover={{ y:-6, scale: 1.02 }} 
            className="card card-hover"
          >
            <div className="text-sm text-muted kicker">{e.year}</div>
            <div className="font-semibold mt-1">{e.school}{e.degree ? ` — ${e.degree}` : ''}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}