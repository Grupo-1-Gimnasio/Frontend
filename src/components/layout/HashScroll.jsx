import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function HashScroll() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) {
      return undefined
    }

    const sectionId = location.hash.replace('#', '')

    const timeoutId = window.setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    }, 100)

    return () => window.clearTimeout(timeoutId)
  }, [location.pathname, location.hash])

  return null
}

export default HashScroll
