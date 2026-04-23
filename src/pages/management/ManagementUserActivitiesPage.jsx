import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ManagementActionButton,
  ManagementStatusIcon,
} from '../../components/management/ManagementUi'
import { getActivities } from '../../services/activitiesService'

function ActivityThumbnail({ src, title }) {
  const [hasError, setHasError] = useState(false)

  if (!src || hasError) {
    return (
      <div
        aria-hidden="true"
        className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl border border-neutral-700 bg-neutral-900 text-lg font-semibold text-neutral-300"
      >
        {title?.slice(0, 1).toUpperCase() || 'A'}
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={`Imagen de ${title || 'actividad'}`}
      onError={() => setHasError(true)}
      className="h-24 w-24 shrink-0 rounded-xl object-cover"
    />
  )
}

function SummaryStatusItem({ icon, label, tone }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-950/60 px-3 py-2 text-sm text-neutral-200">
      <ManagementStatusIcon
        icon={icon}
        label={label}
        tone={tone}
        className="h-9 w-9"
      />
      <span>{label}</span>
    </div>
  )
}

function getStoredActivitiesState() {
  try {
    const savedActivities = localStorage.getItem('activities')

    if (!savedActivities) {
      return { activities: [], shouldFetch: true }
    }

    return {
      activities: JSON.parse(savedActivities),
      shouldFetch: false,
    }
  } catch {
    localStorage.removeItem('activities')
    return { activities: [], shouldFetch: true }
  }
}

function getStoredSelectedUser() {
  try {
    const savedUser = localStorage.getItem('selectedUser')
    return savedUser ? JSON.parse(savedUser) : null
  } catch {
    return null
  }
}

function ManagementUserActivitiesPage() {
  const navigate = useNavigate()
  const [initialActivitiesState] = useState(() => getStoredActivitiesState())
  const [activities, setActivities] = useState(initialActivitiesState.activities)
  const [selectedUser, setSelectedUser] = useState(getStoredSelectedUser)
  const [loading, setLoading] = useState(initialActivitiesState.shouldFetch)

  useEffect(() => {
    if (!loading) {
      return undefined
    }

    let isMounted = true

    getActivities().then((data) => {
      if (!isMounted) {
        return
      }

      setActivities(data)
      localStorage.setItem('activities', JSON.stringify(data))
      setLoading(false)
    })

    return () => {
      isMounted = false
    }
  }, [loading])

  const enrolledActivities = selectedUser?.enrolledActivities ?? []
  const selectedUserFullName = [selectedUser?.name, selectedUser?.surname]
    .filter(Boolean)
    .join(' ')
  const totalActivities = activities.length
  const hasReachedLimit = enrolledActivities.length >= 3
  const canUserEnroll =
    selectedUser &&
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

      if (
        isAlreadyEnrolled ||
        currentUser.isActive !== true ||
        currentUser.annualFeePaid !== true ||
        currentEnrolledActivities.length >= 3
      ) {
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

  const handleUnenroll = (activity) => {
    setSelectedUser((currentUser) => {
      if (!currentUser) {
        return currentUser
      }

      const currentEnrolledActivities = currentUser.enrolledActivities ?? []
      const updatedUser = {
        ...currentUser,
        enrolledActivities: currentEnrolledActivities.filter(
          (id) => id !== activity.id
        ),
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
      className="space-y-4"
      aria-label={`Cursos del usuario (${totalActivities})`}
    >
      <p className="text-sm font-semibold uppercase tracking-wide text-orange-400">
        Panel de gesti&oacute;n
      </p>
      <h1 className="text-3xl font-bold">Cursos del usuario</h1>

      {!selectedUser ? (
        <p className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 text-sm text-neutral-300">
          Selecciona un usuario primero
        </p>
      ) : (
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 text-sm text-neutral-300">
          <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[minmax(0,280px)_auto] lg:items-start lg:justify-between">
            <div className="space-y-2">
              <p className="text-lg font-semibold text-white">
                {selectedUserFullName || 'Usuario seleccionado'}
              </p>
              <p className="text-sm text-neutral-400">Usuario seleccionado</p>
              <div className="inline-flex items-baseline gap-2 rounded-xl border border-neutral-800 bg-neutral-950/60 px-4 py-3">
                <span className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
                  Actividades
                </span>
                <span className="text-2xl font-bold text-white">
                  {enrolledActivities.length}
                  <span className="text-neutral-500">/3</span>
                </span>
              </div>
            </div>

            <div className="flex max-w-2xl flex-col gap-3">
              <div className="flex flex-wrap gap-2">
                <SummaryStatusItem
                  icon={selectedUser.isActive ? 'active' : 'inactive'}
                  label={selectedUser.isActive ? 'Usuario activo' : 'Usuario inactivo'}
                  tone={selectedUser.isActive ? 'success' : 'muted'}
                />
                <SummaryStatusItem
                  icon={selectedUser.annualFeePaid ? 'paid' : 'pending'}
                  label={
                    selectedUser.annualFeePaid
                      ? 'Cuota pagada'
                      : 'Cuota pendiente'
                  }
                  tone={selectedUser.annualFeePaid ? 'info' : 'warning'}
                />
              </div>

              {hasReachedLimit ? (
                <p className="rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-200">
                  Maximo de actividades alcanzado
                </p>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {!selectedUser ? null : activities.length === 0 ? (
        <p className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 text-sm text-neutral-300">
          No hay actividades disponibles.
        </p>
      ) : (
        <div className="space-y-3">
          {activities.map((activity) => {
            const weekDay = activity.weekDay ?? activity.week_day
            const startHour = activity.startHour ?? activity.start_hour
            const endHour = activity.endHour ?? activity.end_hour
            const isAlreadyEnrolled = enrolledActivities.includes(activity.id)
            const canEnrollInActivity = canUserEnroll && !isAlreadyEnrolled

            return (
              <article
                key={activity.id}
                className="flex flex-col gap-4 rounded-xl border border-neutral-800 bg-neutral-900 p-4 lg:grid lg:grid-cols-[minmax(0,520px)_auto] lg:items-center lg:justify-between"
              >
                <div className="flex items-start gap-4">
                  <ActivityThumbnail
                    src={activity.image}
                    title={activity.title}
                  />

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
                      <p className="text-sm text-sky-200">
                        Ya inscrito en esta actividad
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <ManagementActionButton
                    onClick={() => navigate('/dashboard/activities')}
                    icon="edit"
                    label={`Editar actividad ${activity.title || 'sin titulo'}`}
                    iconOnly
                  />
                  <ManagementActionButton
                    onClick={() =>
                      isAlreadyEnrolled
                        ? handleUnenroll(activity)
                        : handleEnroll(activity)
                    }
                    disabled={!isAlreadyEnrolled && !canEnrollInActivity}
                    icon={isAlreadyEnrolled ? 'cancel' : 'plus'}
                    label={`${
                      isAlreadyEnrolled
                        ? 'Desinscribirse de'
                        : 'Inscribirse en'
                    } ${activity.title || 'sin titulo'}`}
                    tone="primary"
                    iconOnly
                  />
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
