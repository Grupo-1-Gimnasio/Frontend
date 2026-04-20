import { useEffect, useState } from 'react'
import { getActivities } from '../../services/activitiesService'

function ManagementActivitiesPage() {
  const [activities, setActivities] = useState([])
  const [selectedUser, setSelectedUser] = useState(() => {
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

  const totalActivities = activities.length
  const selectedUserFullName = [selectedUser?.name, selectedUser?.surname]
    .filter(Boolean)
    .join(' ')
  const hasSelectedUser = Boolean(selectedUser)
  const enrolledActivities = selectedUser?.enrolledActivities ?? []
  const hasReachedLimit = enrolledActivities.length >= 3
  const canUserEnroll =
    hasSelectedUser &&
    selectedUser.isActive === true &&
    selectedUser.annualFeePaid === true &&
    !hasReachedLimit

  const handleEnroll = (activity) => {
    setSelectedUser((currentUser) => {
      if (!currentUser) {
        return currentUser
      }

      const currentEnrolledActivities = currentUser.enrolledActivities ?? []
      const isAlreadyEnrolled = currentEnrolledActivities.includes(activity.id)
      const canSelectActivity =
        currentUser.isActive === true &&
        currentUser.annualFeePaid === true &&
        currentEnrolledActivities.length < 3 &&
        !isAlreadyEnrolled

      if (!canSelectActivity) {
        return currentUser
      }

      const updatedUser = {
        ...currentUser,
        enrolledActivities: [...currentEnrolledActivities, activity.id],
      }

      localStorage.setItem('selectedUser', JSON.stringify(updatedUser))

      return updatedUser
    })
  }

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
      <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 text-sm text-neutral-300">
        <p>{selectedUserFullName || 'Selecciona un usuario primero'}</p>

        {hasSelectedUser ? (
          <>
            <div className="mt-3 flex flex-wrap gap-2">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  selectedUser.isActive
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : 'bg-red-500/20 text-red-300'
                }`}
              >
                {selectedUser.isActive ? 'Activo' : 'Inactivo'}
              </span>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  selectedUser.annualFeePaid
                    ? 'bg-blue-500/20 text-blue-300'
                    : 'bg-amber-500/20 text-amber-300'
                }`}
              >
                {selectedUser.annualFeePaid
                  ? 'Cuota pagada'
                  : 'Cuota pendiente'}
              </span>
            </div>

            {!selectedUser.isActive ? (
              <p className="mt-3 text-sm text-red-300">Usuario no activo</p>
            ) : null}

            {!selectedUser.annualFeePaid ? (
              <p className="mt-1 text-sm text-amber-300">Cuota pendiente</p>
            ) : null}

            {hasReachedLimit ? (
              <p className="mt-1 text-sm text-red-300">
                M&aacute;ximo de actividades alcanzado
              </p>
            ) : null}
          </>
        ) : null}
      </div>
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
            const isAlreadyEnrolled = enrolledActivities.includes(activity.id)
            const canSelectActivity =
              canUserEnroll && !isAlreadyEnrolled

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
                    {isAlreadyEnrolled ? (
                      <p className="text-sm text-red-300">
                        Ya inscrito en esta actividad
                      </p>
                    ) : null}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleEnroll(activity)}
                  disabled={!canSelectActivity}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    canSelectActivity
                      ? 'bg-orange-400 text-neutral-950 hover:bg-orange-300'
                      : 'cursor-not-allowed bg-neutral-700 text-neutral-400 opacity-60'
                  }`}
                >
                  {isAlreadyEnrolled ? 'Ya inscrito' : 'Seleccionar actividad'}
                </button>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default ManagementActivitiesPage
