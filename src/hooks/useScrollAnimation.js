import { useEffect, useRef, useState } from 'react'

/**
 * Custom hook for scroll-triggered animations
 * Returns ref and inView state for animating elements as they enter viewport
 */
export function useScrollAnimation(options = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  
  const {
    threshold = 0.1,
    triggerOnce = true,
    rootMargin = '0px'
  } = options

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (triggerOnce) {
            observer.unobserve(element)
          }
        } else if (!triggerOnce) {
          setInView(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [threshold, triggerOnce, rootMargin])

  return [ref, inView]
}
