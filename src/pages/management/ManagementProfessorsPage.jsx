import { useEffect, useState } from 'react'
import { getProfessors } from '../../services/professorsService'

function ManagementProfessorsPage() {
  const [professors, setProfessors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    getProfessors().then((data) => {
      if (!isMounted) {
        return
      }

      setProfessors(data)
      setLoading(false)
    })

    return () => {
      isMounted = false
    }
  }, [])

  const totalProfessors = professors.length

  if (loading) {
    return (
      <section className="space-y-3">
        <p className="text-sm text-neutral-400">Cargando datos...</p>
      </section>
    )
  }

  return (
    <section
      className="space-y-3"
      aria-label={`Profesores (${totalProfessors})`}
    >
      <p className="text-sm font-semibold uppercase tracking-wide text-orange-400">
        Panel de gesti&oacute;n
      </p>
      <h1 className="text-3xl font-bold">Profesores</h1>
      <p className="text-neutral-300">
        P&aacute;gina base lista para la gesti&oacute;n de profesores.
      </p>
      <span className="sr-only">
        Total de profesores mock: {totalProfessors}
      </span>
    </section>
  )
}

export default ManagementProfessorsPage
