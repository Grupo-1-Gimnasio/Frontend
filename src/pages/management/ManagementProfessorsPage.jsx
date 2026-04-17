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
      <span className="sr-only">Total de profesores: {totalProfessors}</span>

      {professors.length === 0 ? (
        <p className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 text-sm text-neutral-300">
          No hay profesores disponibles.
        </p>
      ) : (
        <div className="mt-4 space-y-3">
          {professors.map((professor) => {
            const hiringYear = professor.hiringYear ?? professor.hiring_year

            return (
              <article
                key={professor.id}
                className="flex items-center justify-between gap-4 rounded-xl border border-neutral-800 bg-neutral-900 p-4"
              >
                <div className="flex items-center gap-4">
                  {professor.image ? (
                    <img
                      src={professor.image}
                      alt={`Avatar de ${professor.name || 'profesor'}`}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  ) : null}

                  <div className="space-y-1">
                    <p className="font-semibold text-white">
                      {professor.name || 'Nombre no disponible'}
                    </p>
                    <p className="text-sm text-neutral-300">
                      DNI: {professor.dni || 'No disponible'}
                    </p>
                    <p className="text-sm text-neutral-400">
                      A&ntilde;o de contrataci&oacute;n:{' '}
                      {hiringYear || 'No disponible'}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap justify-end gap-2">
                  {typeof professor.isActive !== 'undefined' ? (
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        professor.isActive
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-red-500/20 text-red-300'
                      }`}
                    >
                      {professor.isActive ? 'Activo' : 'Inactivo'}
                    </span>
                  ) : null}
                </div>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default ManagementProfessorsPage
