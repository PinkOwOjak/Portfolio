import React from 'react'
import { RESEARCH_PAPERS } from '../data'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function ResearchPapers() {
  const [ref, inView] = useScrollAnimation({ threshold: 0.2 })

  return (
    <motion.section
      ref={ref}
      id="papers"
      initial={{ y: 24, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : { y: 24, opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="card"
    >
      <motion.h3
        initial={{ x: -20, opacity: 0 }}
        animate={inView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold mb-4"
      >
        Research Papers
      </motion.h3>

      {RESEARCH_PAPERS.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {RESEARCH_PAPERS.map((paper) => (
            <article key={paper.key} className="card card-hover">
              <div className="text-sm text-muted kicker">{paper.venue} • {paper.year}</div>
              {paper.status && (
                <div className="mt-2 inline-flex text-xs px-2 py-1 rounded-full border border-emerald-400/40 text-emerald-300">
                  {paper.status}
                </div>
              )}
              <h4 className="mt-2 text-lg font-semibold">{paper.title}</h4>
              <p className="mt-2 text-sm text-muted">{paper.summary}</p>

              {paper.abstract && (
                <details className="mt-3 text-sm">
                  <summary className="cursor-pointer select-none inline-flex px-3 py-1 rounded-md border hover:opacity-90">
                    View Full Abstract
                  </summary>
                  <p className="mt-3 text-sm text-muted leading-relaxed">{paper.abstract}</p>
                </details>
              )}

              {paper.link && paper.link !== '#' && (
                <a
                  href={paper.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex text-sm px-3 py-1 rounded-md border"
                >
                  View Paper
                </a>
              )}
            </article>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted">
          Add your publication titles, venues, and links in <span className="font-medium">src/data.js</span> to show them here.
        </p>
      )}
    </motion.section>
  )
}