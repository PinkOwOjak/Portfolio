import React from 'react'
import { PERSONAL } from '../data'
import { motion, useScroll, useTransform } from 'framer-motion'

// Text reveal component - animates each letter/word
const TextReveal = ({ text, className }) => {
  // Split text into words and characters
  const words = text.split(' ')
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 * i },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  }

  return (
    <motion.h2
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: 'inline-block', marginRight: '0.25em' }}>
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={charIndex}
              variants={child}
              style={{ display: 'inline-block' }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h2>
  )
}

export default function Hero(){
  // Parallax scroll effect - elements move at different speeds
  const { scrollY } = useScroll()
  const yText = useTransform(scrollY, [0, 500], [0, 150])
  const yImage = useTransform(scrollY, [0, 500], [0, -100])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  return (
    <section id="about" className="card grid md:grid-cols-2 gap-6 items-center">
      <motion.div style={{ y: yText, opacity }}>
        <TextReveal 
          text={`Hi — I'm ${PERSONAL.name}`}
          className="text-3xl md:text-5xl font-extrabold"
        />
        <motion.p 
          initial={{ x:-10, opacity:0 }} 
          animate={{ x:0, opacity:1 }} 
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mt-4 text-lg text-muted"
        >
          B.Tech Computer Science student at NIT Silchar (4th year, 8th sem). I build interactive apps and prototypes focused on full-stack web & mobile development.
        </motion.p>
        <motion.div 
          initial={{ y: 20, opacity:0 }} 
          animate={{ y: 0, opacity:1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="mt-6 flex gap-3"
        >
          <a href={PERSONAL.resumeLink} className="btn-outline">Download Resume</a>
          <a href="#projects" className="btn-accent">See Projects</a>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ scale:0.95, opacity:0 }} 
        animate={{ scale:1, opacity:1 }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        style={{ y: yImage }}
        className="mx-auto w-64 h-64 md:w-80 md:h-80 rounded-2xl shadow-2xl overflow-hidden border"
        whileHover={{ scale: 1.05 }}
      >
        <img src="/images/profile_1.jpg" alt="profile big" className="w-full h-full object-cover" />
      </motion.div>
    </section>
  )
}
