// src/components/Background.jsx
import React, { useEffect, useRef } from 'react'

/**
 * Floating particles with connections background.
 * - Particles float around randomly
 * - Lines connect particles when they're close
 * - Mouse interaction affects nearby particles
 */

export default function Background() {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const particlesRef = useRef([])
  const mouseRef = useRef({ x: 0, y: 0, isDown: false, draggedParticle: null })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const particles = particlesRef.current
    const mouse = mouseRef.current

  // Tunable physics constants
  const DAMPING = 0.996          // Lower damping (closer to 1 means keep energy)
  const RANDOM_JITTER = 0.015    // Ambient jitter energy each frame
  const MAX_VELOCITY = 3.5       // Cap velocity
  const MIN_SPEED = 0.07         // If below this we inject energy
  const STUCK_FRAMES_LIMIT = 120 // After this many low-speed frames, respawn velocity

  // Particle class - DEFINE FIRST
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
    this.vx = (Math.random() - 0.5) * 2.2
    this.vy = (Math.random() - 0.5) * 2.2
        this.radius = Math.random() * 2 + 1
        this.opacity = Math.random() * 0.5 + 0.3
        this.isDragging = false
        this.isHovered = false
        this.glowIntensity = 0
        this.prevX = this.x
        this.prevY = this.y
    this.lowSpeedFrames = 0
      }

      update() {
        this.prevX = this.x
        this.prevY = this.y

        if (!this.isDragging) {
          this.x += this.vx
          this.y += this.vy

          // Apply damping (retain more energy than before)
          this.vx *= DAMPING
          this.vy *= DAMPING

          // Add ambient jitter to avoid stagnation
            this.vx += (Math.random() - 0.5) * RANDOM_JITTER
            this.vy += (Math.random() - 0.5) * RANDOM_JITTER

          // Maintain a minimum kinetic energy
          const speed = Math.hypot(this.vx, this.vy)
          if (speed < MIN_SPEED) {
            this.lowSpeedFrames++
            this.vx += (Math.random() - 0.5) * 0.4
            this.vy += (Math.random() - 0.5) * 0.4
          } else {
            this.lowSpeedFrames = 0
          }

          // If stuck for too long, give a stronger kick
          if (this.lowSpeedFrames > STUCK_FRAMES_LIMIT) {
            const angle = Math.random() * Math.PI * 2
            const boost = 1.2 + Math.random() * 1.5
            this.vx = Math.cos(angle) * boost
            this.vy = Math.sin(angle) * boost
            this.lowSpeedFrames = 0
          }

          // Limit maximum velocity
          this.vx = Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, this.vx))
          this.vy = Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, this.vy))

          // Bounce off edges
          if (this.x <= this.radius) {
            this.x = this.radius
            this.vx = Math.abs(this.vx)
          }
          if (this.x >= canvas.width - this.radius) {
            this.x = canvas.width - this.radius
            this.vx = -Math.abs(this.vx)
          }
          if (this.y <= this.radius) {
            this.y = this.radius
            this.vy = Math.abs(this.vy)
          }
          if (this.y >= canvas.height - this.radius) {
            this.y = canvas.height - this.radius
            this.vy = -Math.abs(this.vy)
          }

          // Mouse interaction
          if (!mouse.isDown && mouse.x > 0 && mouse.y > 0) {
            const dx = mouse.x - this.x
            const dy = mouse.y - this.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            // Gentle repulsion instead of attraction to prevent clustering
            if (distance < 110 && distance > 0) {
              const force = (110 - distance) / 110
              this.vx -= (dx / distance) * force * 0.25
              this.vy -= (dy / distance) * force * 0.25
            }
          }
        }

        // Update glow effect
        if (this.isHovered || this.isDragging) {
          this.glowIntensity = Math.min(1, this.glowIntensity + 0.1)
        } else {
          this.glowIntensity = Math.max(0, this.glowIntensity - 0.05)
        }
      }

      draw() {
        // Draw glow effect - Cyan glow
        if (this.glowIntensity > 0) {
          const glowRadius = this.radius + 8 * this.glowIntensity
          const gradient = ctx.createRadialGradient(this.x, this.y, this.radius, this.x, this.y, glowRadius)
          gradient.addColorStop(0, `rgba(6, 182, 212, ${0.8 * this.glowIntensity})`)
          gradient.addColorStop(1, `rgba(6, 182, 212, 0)`)
          
          ctx.beginPath()
          ctx.arc(this.x, this.y, glowRadius, 0, Math.PI * 2)
          ctx.fillStyle = gradient
          ctx.fill()
        }

        // Draw main particle - Cyan color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        const alpha = this.isDragging ? 1 : this.opacity
        ctx.fillStyle = `rgba(6, 182, 212, ${alpha})`
        ctx.fill()
      }

      isPointInside(x, y) {
        const dx = x - this.x
        const dy = y - this.y
        return Math.sqrt(dx * dx + dy * dy) <= this.radius + 5
      }
    }

    // Create particles function - DEFINE AFTER PARTICLE CLASS
    const createParticles = () => {
      // Increase base density slightly so top area always has visible points
      const target = Math.min(220, Math.floor((canvas.width * canvas.height) / 7500))
      particles.length = 0

      // Stratified vertical distribution so dots cover from very top to bottom
      // This avoids perceived “nothing at the top” due to random clustering.
      for (let i = 0; i < target; i++) {
        const ySliceStart = (i / target) * canvas.height
        const ySliceEnd = ((i + 1) / target) * canvas.height
        const y = ySliceStart + Math.random() * (ySliceEnd - ySliceStart)
        const x = Math.random() * canvas.width
        const p = new Particle()
        p.x = x
        p.y = y
        particles.push(p)
      }
    }

    // Set canvas size function - DEFINE AFTER CREATE PARTICLES
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      // Recreate particles after resize
      createParticles()
    }

  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)

  // Force an initial animation tick after particles creation in case
  // browser delays first rAF until user interacts (rare but possible on some setups)
  requestAnimationFrame(() => animationRef.current || animate())

    // Draw connections between nearby particles - Cyan to Indigo gradient
    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            const opacity = (150 - distance) / 150 * 0.5
            // Create gradient from cyan to indigo
            const gradient = ctx.createLinearGradient(
              particles[i].x, particles[i].y,
              particles[j].x, particles[j].y
            )
            gradient.addColorStop(0, `rgba(6, 182, 212, ${opacity})`)
            gradient.addColorStop(1, `rgba(79, 70, 229, ${opacity})`)
            
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = gradient
            ctx.lineWidth = 1.5
            ctx.stroke()
          }
        }
      }
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })

      drawConnections()

      animationRef.current = requestAnimationFrame(animate)
    }

    // Interaction helpers
    const updateMousePos = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = clientX - rect.left
      mouse.y = clientY - rect.top
    }

    const handleMouseMove = (e) => {
      updateMousePos(e.clientX, e.clientY)
      let hovering = false
      particles.forEach(p => {
        p.isHovered = p.isPointInside(mouse.x, mouse.y)
        if (p.isHovered) hovering = true
      })
      if (!mouse.isDown) {
        document.body.style.cursor = hovering ? 'grab' : ''
      }
      if (mouse.isDown && mouse.draggedParticle) {
        const p = mouse.draggedParticle
        p.x = Math.max(p.radius, Math.min(canvas.width - p.radius, mouse.x))
        p.y = Math.max(p.radius, Math.min(canvas.height - p.radius, mouse.y))
      }
    }

    const handleMouseDown = (e) => {
      updateMousePos(e.clientX, e.clientY)
      mouse.isDown = true
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        if (p.isPointInside(mouse.x, mouse.y)) {
          mouse.draggedParticle = p
          p.isDragging = true
          p.vx = 0; p.vy = 0
          document.body.style.cursor = 'grabbing'
          break
        }
      }
    }

    const handleMouseUp = () => {
      if (mouse.draggedParticle) {
        const p = mouse.draggedParticle
        const vx = (p.x - p.prevX) * 0.4
        const vy = (p.y - p.prevY) * 0.4
        p.vx = Math.max(-6, Math.min(6, vx))
        p.vy = Math.max(-6, Math.min(6, vy))
        p.isDragging = false
        mouse.draggedParticle = null
      }
      mouse.isDown = false
      document.body.style.cursor = ''
    }

    const handleMouseLeave = () => {
      if (mouse.draggedParticle) {
        mouse.draggedParticle.isDragging = false
        mouse.draggedParticle = null
      }
      mouse.isDown = false
      mouse.x = -9999; mouse.y = -9999
      document.body.style.cursor = ''
      particles.forEach(p => p.isHovered = false)
    }

    // Touch equivalents
    const touchToMouse = (touchEvent, cb) => {
      const t = touchEvent.touches[0] || touchEvent.changedTouches[0]
      if (!t) return
      cb({ clientX: t.clientX, clientY: t.clientY })
    }
    const handleTouchStart = (e) => { e.preventDefault(); touchToMouse(e, handleMouseDown) }
    const handleTouchMove = (e) => { e.preventDefault(); touchToMouse(e, handleMouseMove) }
    const handleTouchEnd = (e) => { e.preventDefault(); touchToMouse(e, handleMouseUp) }

  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('mousedown', handleMouseDown)
  window.addEventListener('mouseup', handleMouseUp)
  window.addEventListener('mouseleave', handleMouseLeave)
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false })
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false })
    canvas.addEventListener('touchend', handleTouchEnd, { passive: false })

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('mousedown', handleMouseDown)
  window.removeEventListener('mouseup', handleMouseUp)
  window.removeEventListener('mouseleave', handleMouseLeave)
  document.body.style.cursor = ''
      canvas.removeEventListener('touchstart', handleTouchStart)
      canvas.removeEventListener('touchmove', handleTouchMove)
      canvas.removeEventListener('touchend', handleTouchEnd)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="particle-background fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
