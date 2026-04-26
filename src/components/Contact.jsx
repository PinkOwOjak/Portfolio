import React from 'react'
import { PERSONAL } from '../data'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function Contact() {
  const [ref, inView] = useScrollAnimation({ threshold: 0.3 })

  return (
    <motion.section 
      ref={ref}
      id="contact" 
      initial={{ y: 30, opacity: 0 }} 
      animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="card"
    >
      <motion.h3 
        initial={{ x: -20, opacity: 0 }}
        animate={inView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-2xl font-bold mb-4"
      >
        Contact
      </motion.h3>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-lg mb-4">
            Let's connect! Feel free to reach out for collaborations, opportunities, or just to say hello.
          </p>
          <div className="space-y-2">
            <p><strong>Email:</strong> {PERSONAL.email}</p>
            <p><strong>Phone:</strong> {PERSONAL.phone}</p>
            <p><strong>WhatsApp:</strong> {PERSONAL.whatsapp}</p>
            <p><strong>Location:</strong> {PERSONAL.location}</p>
          </div>
        </motion.div>
        <motion.div 
          className="flex flex-col gap-3"
          initial={{ x: 20, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : { x: 20, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a 
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${PERSONAL.email}`} 
            target="_blank"
            rel="noreferrer"
            className="btn-accent text-center"
          >
            Send Email
          </a>
          <a 
            href={PERSONAL.resumeLink} 
            download
            className="btn-outline text-center"
          >
            Download Resume
          </a>
        </motion.div>
      </div>
    </motion.section>
  )
}