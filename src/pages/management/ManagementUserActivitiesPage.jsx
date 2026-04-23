import { useEffect, useState } from 'react'
import { getActivities } from '../../services/activitiesService'

function ManagementUserActivitiesPage() {
  const [activities, setActivities] = useState([])
  const [selectedUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('selectedUser')
      return savedUser ? JSON.parse(savedUser) : null
    } catch {
      return null
    }
  })
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

  const enrolledActivities = selectedUser?.enrolledActivities ?? []
  const userActivities = activities.filter(({ id }) =>
    enrolledActivities.includes(id)
  )
  const selectedUserFullName = [selectedUser?.name, selectedUser?.surname]
    .filter(Boolean)
    .join(' ')

  if (loading) {
    return (
      <section className="space-y-3">
        <p className="text-sm text-neutral-400">Cargando datos...</p>
      </section>
    )
  }

  return (
    <section
      className="space-y-4"
      aria-label={`Cursos del usuario (${userActivities.length})`}
    >
      <p className="text-sm font-semibold uppercase tracking-wide text-orange-400">
        Panel de gesti&oacute;n
      </p>
      <h1 className="text-3xl font-bold">Cursos del usuario</h1>
      <p className="text-neutral-300">
        {selectedUserFullName || 'Selecciona un usuario primero'}
      </p>

      {!selectedUser ? (
        <p className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 text-sm text-neutral-300">
          Selecciona un usuario primero
        </p>
      ) : userActivities.length === 0 ? (
        <p className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 text-sm text-neutral-300">
          Este usuario no est&aacute; inscrito en ninguna actividad
        </p>
      ) : (
        <div className="mt-4 space-y-3">
          {userActivities.map((activity) => {
            const weekDay = activity.weekDay ?? activity.week_day
            const startHour = activity.startHour ?? activity.start_hour
            const endHour = activity.endHour ?? activity.end_hour

            return (
              <article
                key={activity.id}
                className="rounded-xl border border-neutral-800 bg-neutral-900 p-4"
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

export default ManagementUserActivitiesPage
