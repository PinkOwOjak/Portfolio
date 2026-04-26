import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Background from './components/Background'
import ScrollProgress from './components/ScrollProgress'
import Header from './components/Header'
import Hero from './components/Hero'
import Education from './components/Education'
import Internships from './components/Internships'
import Skills from './components/Skills'
import Projects from './components/Projects'
import ResearchPapers from './components/ResearchPapers'
import Contact from './components/Contact'

export default function App(){
  const [theme, setTheme] = useState('dark')
  
  // Apply theme to document body and html
  useEffect(() => {
    const root = document.documentElement
    const body = document.body
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark')
    body.classList.remove('light', 'dark')
    
    // Add current theme class
    root.classList.add(theme)
    body.classList.add(theme)
  }, [theme])
  
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : 'light'}`}>
      <Background />
      <ScrollProgress />
      <Header theme={theme} setTheme={setTheme} />
      <main className="relative z-20 max-w-6xl mx-auto p-6 grid gap-10">
        <Hero />
        <Education />
        <Internships />
        <Skills />
        <Projects />
        <ResearchPapers />
        <Contact />
      </main>
      <footer className="relative z-20 text-center text-sm opacity-70 py-6">Made with ♥ — Pranto Mollik</footer>
    </div>
  )
}