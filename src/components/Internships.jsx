import React from 'react'
import { INTERNSHIPS } from '../data'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

// Container animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

// Item animation variants
const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

export default function Internships(){
  const [ref, inView] = useScrollAnimation({ threshold: 0.2 })

  return (
    <section ref={ref} id="internships" className="card">
      <motion.h3 
        initial={{ x: -20, opacity: 0 }}
        animate={inView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="text-xl font-bold"
      >
        Internships
      </motion.h3>
      <motion.div 
        className="mt-4 grid md:grid-cols-2 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {INTERNSHIPS.map(it => (
          <motion.article 
            key={it.key} 
            variants={itemVariants}
            whileHover={{ scale:1.02, y: -8 }} 
            className="card card-hover"
          >
            <div className="text-sm text-muted kicker">{it.role}</div>
            <div className="font-semibold mt-1">{it.org}</div>
            <p className="mt-2 text-sm text-muted">{it.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {it.certificateLink && (
                <a
                  href={it.certificateLink}
                  download
                  className="inline-flex text-xs px-3 py-1 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 transition"
                >
                  Download Certificate
                </a>
              )}
              {it.recommendationLink && (
                <a
                  href={it.recommendationLink}
                  download
                  className="inline-flex text-xs px-3 py-1 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 transition"
                >
                  Download Recommendation Letter
                </a>
              )}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}