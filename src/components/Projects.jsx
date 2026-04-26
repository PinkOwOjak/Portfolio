// src/components/Projects.jsx
import React, { useState } from 'react'
import { PROJECTS } from '../data'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

// Container animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
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

export default function Projects() {
  const [selected, setSelected] = useState(null)
  const [ref, inView] = useScrollAnimation({ threshold: 0.1 })

  const getRepoLink = (project) => project.repoLink || project.link

  return (
    <section ref={ref} id="projects" className="card">
      <motion.h3 
        initial={{ x: -20, opacity: 0 }}
        animate={inView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="text-xl font-bold mb-4"
      >
        Projects
      </motion.h3>

      {/* Grid of project cards */}
      <motion.div 
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {PROJECTS.map((p) => (
          <motion.article
            key={p.key}
            variants={itemVariants}
            whileHover={{ translateY: -6, boxShadow: '0 12px 30px rgba(0,0,0,0.12)' }}
            className="card card-hover"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-semibold text-lg leading-tight text-white">{p.title}</h4>
                <div className="text-xs text-muted">{p.tags?.join(' • ')}</div>
              </div>

              <p className="mt-3 text-sm text-muted">{p.desc}</p>

              {/* Optional short metadata row */}
              <div className="mt-3 flex flex-wrap gap-2">
                {(p.badges || p.tags || []).slice(0, 4).map((tag, i) => (
                  <span
                    key={i}
                    className="skill-badge text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                {p.liveLink && (
                  <a
                    href={p.liveLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm px-3 py-1 rounded-md border hover:underline"
                  >
                    Live
                  </a>
                )}
                {getRepoLink(p) && (
                  <a
                    href={getRepoLink(p)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm px-3 py-1 rounded-md border hover:underline"
                  >
                    Repo
                  </a>
                )}
              </div>

              <button
                onClick={() => setSelected(p)}
                className="text-sm px-3 py-1 rounded-md bg-primary text-white"
              >
                View
              </button>
            </div>
          </motion.article>
        ))}
      </motion.div>

      {/* Animated modal for project details */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* overlay */}
            <motion.div
              className="absolute inset-0 bg-black/40"
              onClick={() => setSelected(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* modal panel */}
            <motion.dialog
              className="relative z-10 max-w-3xl w-full mx-auto bg-white rounded-2xl p-6 shadow-2xl"
              initial={{ scale: 0.96, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 10 }}
            >
              <header className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-2xl font-bold">{selected.title}</h4>
                  <div className="text-sm opacity-60 mt-1">{selected.tags?.join(' • ')}</div>
                </div>

                <div className="flex items-center gap-2">
                  {selected.liveLink && (
                    <a
                      href={selected.liveLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm px-3 py-1 rounded-md border"
                    >
                      Live
                    </a>
                  )}
                  {getRepoLink(selected) && (
                    <a
                      href={getRepoLink(selected)}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm px-3 py-1 rounded-md border"
                    >
                      Repo
                    </a>
                  )}
                  <button
                    onClick={() => setSelected(null)}
                    className="p-2 rounded-md border text-sm"
                    aria-label="close"
                  >
                    Close
                  </button>
                </div>
              </header>

              <div className="mt-4 grid md:grid-cols-3 gap-6">
                {/* left: description */}
                <div className="md:col-span-2">
                  <h5 className="text-sm font-semibold text-gray-600">Overview</h5>
                  <p className="mt-2 text-sm text-gray-700 leading-relaxed">{selected.longDesc || selected.desc}</p>

                  {selected.highlights && selected.highlights.length > 0 && (
                    <>
                      <h6 className="mt-4 text-sm font-semibold text-gray-600">Highlights</h6>
                      <ul className="list-disc ml-5 mt-2 text-sm text-gray-700">
                        {selected.highlights.map((h, i) => <li key={i}>{h}</li>)}
                      </ul>
                    </>
                  )}
                </div>

                {/* right: tech & quick facts */}
                <aside className="md:col-span-1 bg-gray-50 rounded-xl p-4">
                  <div>
                    <h6 className="text-sm font-semibold text-gray-600">Tech Stack</h6>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {(selected.tags || []).map((t, i) => (
                        <span key={i} className="text-xs px-2 py-1 rounded-full border bg-white">{t}</span>
                      ))}
                    </div>
                  </div>

                  {selected.role && (
                    <div className="mt-4">
                      <h6 className="text-sm font-semibold text-gray-600">Role</h6>
                      <div className="mt-1 text-sm">{selected.role}</div>
                    </div>
                  )}

                  {selected.duration && (
                    <div className="mt-4">
                      <h6 className="text-sm font-semibold text-gray-600">Duration</h6>
                      <div className="mt-1 text-sm">{selected.duration}</div>
                    </div>
                  )}
                </aside>
              </div>

              {/* optional footer with links */}
              <footer className="mt-6 flex items-center justify-between">
                <div className="text-sm opacity-70">Want this project in your resume? Link it or show a quick demo.</div>
                <div className="flex flex-wrap gap-2">
                  {selected.liveLink && (
                    <a href={selected.liveLink} target="_blank" rel="noreferrer" className="px-3 py-1 rounded-md border">
                      Live
                    </a>
                  )}
                  {getRepoLink(selected) && (
                    <a href={getRepoLink(selected)} target="_blank" rel="noreferrer" className="px-3 py-1 rounded-md bg-primary text-white">
                      Repo
                    </a>
                  )}
                </div>
              </footer>
            </motion.dialog>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
