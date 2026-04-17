import { useEffect, useState } from 'react'
import { getActivities } from '../../services/activitiesService'

function ManagementActivitiesPage() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    getActivities().then((data) => {
      if (!isMounted) {
        return
      }

      setActivities(data)
      setLoading(false)
    })

    return () => {
      isMounted = false
    }
  }, [])

  const totalActivities = activities.length

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
      aria-label={`Actividades (${totalActivities})`}
    >
      <p className="text-sm font-semibold uppercase tracking-wide text-orange-400">
        Panel de gesti&oacute;n
      </p>
      <h1 className="text-3xl font-bold">Actividades</h1>
      <p className="text-neutral-300">
        P&aacute;gina base lista para la gesti&oacute;n de actividades.
      </p>
      <span className="sr-only">Total de actividades: {totalActivities}</span>

      {activities.length === 0 ? (
        <p className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 text-sm text-neutral-300">
          No hay actividades disponibles.
        </p>
      ) : (
        <div className="mt-4 space-y-3">
          {activities.map((activity) => {
            const weekDay = activity.weekDay ?? activity.week_day
            const startHour = activity.startHour ?? activity.start_hour
            const endHour = activity.endHour ?? activity.end_hour

            return (
              <article
                key={activity.id}
                className="flex items-center justify-between gap-4 rounded-xl border border-neutral-800 bg-neutral-900 p-4"
              >
                <div className="flex items-center gap-4">
                  {activity.image ? (
                    <img
                      src={activity.image}
                      alt={`Imagen de ${activity.title || 'actividad'}`}
                      className="h-12 w-12 rounded-md object-cover"
                    />
                  ) : null}

                  <div className="space-y-1">
                    <p className="font-semibold text-white">
                      {activity.title || 'T&iacute;tulo no disponible'}
                    </p>
                    <p className="text-sm text-neutral-300">
                      Precio: {activity.price ?? 'No disponible'}
                    </p>
                    <p className="text-sm text-neutral-400">
                      D&iacute;a: {weekDay ?? 'No disponible'}
                    </p>
                    <p className="text-sm text-neutral-400">
                      Horario: {startHour ?? 'No disponible'} -{' '}
                      {endHour ?? 'No disponible'}
                    </p>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default ManagementActivitiesPage
