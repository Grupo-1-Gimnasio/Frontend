import { useEffect, useRef, useState } from 'react'

const STORAGE_KEY = 'lorzas-accessibility-preferences'

const defaultPreferences = {
  highContrast: false,
  largeText: false,
  reduceMotion: false,
  highlightLinks: false,
}

function getInitialPreferences() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return defaultPreferences
    }

    const parsed = JSON.parse(raw)
    return {
      ...defaultPreferences,
      ...parsed,
    }
  } catch {
    return defaultPreferences
  }
}

function AccessibilityIcon({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
    >
      <circle cx="12" cy="4.4" r="1.8" />
      <path d="M5 8.5h14" strokeLinecap="round" />
      <path d="M12 8.5v11.2" strokeLinecap="round" />
      <path d="m8.5 20.5 3.5-6 3.5 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CloseIcon({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
    >
      <path d="M6 6 18 18M18 6 6 18" strokeLinecap="round" />
    </svg>
  )
}

function ToggleRow({ id, label, description, checked, onToggle }) {
  return (
    <button
      id={id}
      type="button"
      aria-pressed={checked}
      onClick={onToggle}
      className="flex w-full items-center justify-between rounded-xl border border-neutral-700 bg-neutral-900/85 px-4 py-3 text-left transition-colors hover:border-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6b2c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090909]"
    >
      <span className="space-y-0.5">
        <span className="block text-sm font-semibold text-white">{label}</span>
        <span className="block text-xs text-neutral-300">{description}</span>
      </span>
      <span
        aria-hidden="true"
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors ${
          checked
            ? 'border-orange-400 bg-orange-500/80'
            : 'border-neutral-500 bg-neutral-700/70'
        }`}
      >
        <span
          className={`h-4 w-4 rounded-full bg-white transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-1'
          }`}
        />
      </span>
    </button>
  )
}

function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [announcement, setAnnouncement] = useState('')
  const [preferences, setPreferences] = useState(getInitialPreferences)
  const panelRef = useRef(null)
  const triggerRef = useRef(null)

  useEffect(() => {
    const root = document.documentElement

    root.dataset.a11yContrast = preferences.highContrast ? 'high' : 'normal'
    root.dataset.a11yFont = preferences.largeText ? 'large' : 'normal'
    root.dataset.a11yMotion = preferences.reduceMotion ? 'reduced' : 'normal'
    root.dataset.a11yLinks = preferences.highlightLinks ? 'enhanced' : 'normal'

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences))
    } catch {
      // If storage is blocked we still keep runtime preferences active.
    }
  }, [preferences])

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        triggerRef.current?.focus()
      }
    }

    const handlePointerDown = (event) => {
      const panel = panelRef.current
      const trigger = triggerRef.current
      const target = event.target

      if (panel?.contains(target) || trigger?.contains(target)) {
        return
      }

      setIsOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handlePointerDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handlePointerDown)
    }
  }, [isOpen])

  const togglePreference = (key, label) => {
    setPreferences((current) => {
      const next = {
        ...current,
        [key]: !current[key],
      }

      setAnnouncement(`${label} ${next[key] ? 'activado' : 'desactivado'}`)
      return next
    })
  }

  const resetPreferences = () => {
    setPreferences(defaultPreferences)
    setAnnouncement('Ajustes de accesibilidad restablecidos')
  }

  return (
    <>
      <div className="fixed bottom-6 right-5 z-[80]">
        <button
          ref={triggerRef}
          type="button"
          aria-expanded={isOpen}
          aria-controls="accessibility-panel"
          aria-label={isOpen ? 'Cerrar ajustes de accesibilidad' : 'Abrir ajustes de accesibilidad'}
          onClick={() => setIsOpen((current) => !current)}
          className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-orange-400/40 bg-neutral-900/95 text-orange-300 shadow-[0_10px_35px_rgba(0,0,0,0.45)] transition-colors hover:border-orange-300 hover:text-orange-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6b2c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090909]"
        >
          <AccessibilityIcon className="h-7 w-7" />
          <span className="sr-only">Ajustes de accesibilidad</span>
        </button>

        {isOpen ? (
          <section
            id="accessibility-panel"
            ref={panelRef}
            role="dialog"
            aria-label="Ajustes de accesibilidad"
            className="absolute bottom-16 right-0 w-[min(94vw,355px)] space-y-4 rounded-2xl border border-neutral-700 bg-[linear-gradient(170deg,#0a0a0a_0%,#111111_100%)] p-4 text-white shadow-[0_18px_65px_rgba(0,0,0,0.55)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold tracking-wide text-orange-300">Accesibilidad</p>
                <p className="mt-1 text-xs text-neutral-300">
                  Ajustes rapidos para mejorar lectura y contraste.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-neutral-600 bg-neutral-900 text-neutral-200 transition-colors hover:border-neutral-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6b2c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090909]"
                aria-label="Cerrar panel de accesibilidad"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-2">
              <ToggleRow
                id="toggle-contrast"
                label="Alto contraste"
                description="Mejora la diferencia entre textos y fondos."
                checked={preferences.highContrast}
                onToggle={() => togglePreference('highContrast', 'Alto contraste')}
              />
              <ToggleRow
                id="toggle-text"
                label="Texto grande"
                description="Aumenta tamano de letra y legibilidad general."
                checked={preferences.largeText}
                onToggle={() => togglePreference('largeText', 'Texto grande')}
              />
              <ToggleRow
                id="toggle-links"
                label="Resaltar enlaces"
                description="Subraya enlaces para identificarlos mas rapido."
                checked={preferences.highlightLinks}
                onToggle={() => togglePreference('highlightLinks', 'Resaltar enlaces')}
              />
              <ToggleRow
                id="toggle-motion"
                label="Reducir movimiento"
                description="Disminuye animaciones y transiciones visuales."
                checked={preferences.reduceMotion}
                onToggle={() => togglePreference('reduceMotion', 'Reducir movimiento')}
              />
            </div>

            <button
              type="button"
              onClick={resetPreferences}
              className="w-full rounded-xl border border-neutral-600 bg-neutral-900/70 px-3 py-2 text-sm font-medium text-neutral-100 transition-colors hover:border-neutral-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6b2c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#090909]"
            >
              Restablecer ajustes
            </button>
          </section>
        ) : null}
      </div>

      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>
    </>
  )
}

export default AccessibilityWidget
