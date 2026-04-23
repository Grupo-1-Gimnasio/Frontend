import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ManagementCard,
  ManagementCardImage,
} from '../../components/management/ManagementCards'
import {
  ManagementActionButton,
  ManagementStatusIcon,
} from '../../components/management/ManagementUi'
import { getActivities } from '../../services/activitiesService'

function getWeekDayLabel(weekDay) {
  const dayMap = {
    1: 'Lun',
    2: 'Mar',
    3: 'Mie',
    4: 'Jue',
    5: 'Vie',
    6: 'Sab',
    7: 'Dom',
  }

  if (typeof weekDay === 'number') {
    return dayMap[weekDay] || 'Dia'
  }

  if (typeof weekDay === 'string' && weekDay.trim() !== '') {
    return weekDay
  }

  return 'Dia'
}

function getActivityDescription(activity) {
  if (activity.description && activity.description.trim() !== '') {
    return activity.description
  }

  if (activity.instructor && activity.instructor.trim() !== '') {
    return `Sesion guiada por ${activity.instructor}.`
  }

  if (activity.type && activity.type.trim() !== '') {
    return `Actividad de ${activity.type.toLowerCase()} adaptada al ritmo del grupo.`
  }

  return 'Actividad inclusiva con seguimiento del equipo.'
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
  const userActivities = activities.filter((activity) =>
    enrolledActivities.includes(activity.id)
  )
  const selectedUserFullName = [selectedUser?.name, selectedUser?.surname]
    .filter(Boolean)
    .join(' ')
  const totalActivities = userActivities.length
  const hasReachedLimit = enrolledActivities.length >= 3

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

      {!selectedUser ? null : userActivities.length === 0 ? (
        <p className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 text-sm text-neutral-300">
          Este usuario no esta inscrito en ninguna actividad.
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {userActivities.map((activity) => {
            const weekDay = activity.weekDay ?? activity.week_day
            const startHour = activity.startHour ?? activity.start_hour
            const endHour = activity.endHour ?? activity.end_hour
            const description = getActivityDescription(activity)
            const accent = `${getWeekDayLabel(weekDay).toUpperCase()} ${startHour ?? '--:--'}-${endHour ?? '--:--'}`

            return (
              <ManagementCard
                key={activity.id}
                media={
                  <ManagementCardImage
                    src={activity.image}
                    alt={`Imagen de ${activity.title || 'actividad'}`}
                    fallback={activity.title?.slice(0, 1).toUpperCase() || 'A'}
                  />
                }
                title={activity.title || 'Titulo no disponible'}
                description={description}
                accent={accent}
                footer={
                  <div className="space-y-3">
                    <p className="text-sm text-neutral-300">
                      Precio: {activity.price ?? 'No disponible'} EUR
                    </p>
                    <p className="text-sm text-sky-200">
                      Ya inscrito en esta actividad
                    </p>

                    <div className="flex items-center gap-2">
                      <div className="ml-auto flex items-center gap-2">
                        <ManagementActionButton
                          onClick={() => navigate('/dashboard/activities')}
                          icon="edit"
                          label={`Editar actividad ${activity.title || 'sin titulo'}`}
                          iconOnly
                        />
                        <ManagementActionButton
                          onClick={() => handleUnenroll(activity)}
                          icon="cancel"
                          label={`Desinscribirse de ${activity.title || 'sin titulo'}`}
                          tone="primary"
                          iconOnly
                        />
                      </div>
                    </div>
                  </div>
                }
              />
            )
          })}
        </div>
      )}
    </section>
  )
}

export default ManagementUserActivitiesPage
