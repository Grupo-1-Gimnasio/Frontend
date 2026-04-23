import { useEffect, useState } from 'react'
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
        className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl border border-neutral-700 bg-neutral-900 text-lg font-semibold text-neutral-300 md:h-32 md:w-32"
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
      className="h-24 w-24 shrink-0 rounded-xl object-cover md:h-32 md:w-32"
    />
  )
}

function SummaryStatusItem({ icon, label, tone }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-950/60 px-3 py-2 text-sm text-neutral-200">
      <ManagementStatusIcon icon={icon} label={label} tone={tone} className="h-9 w-9" />
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

function getStoredProfessors() {
  try {
    const savedProfessors = localStorage.getItem('professors')
    return savedProfessors ? JSON.parse(savedProfessors) : []
  } catch {
    return []
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

function ManagementActivitiesPage() {
  const [initialActivitiesState] = useState(() => getStoredActivitiesState())
  const [activities, setActivities] = useState(initialActivitiesState.activities)
  const [professors] = useState(getStoredProfessors)
  const [showForm, setShowForm] = useState(false)
  const [editingActivity, setEditingActivity] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    schedule: '',
    price: '',
    capacity: 10,
    enrolled: 0,
    instructor: '',
    location: 'Lorza Fitness',
    image: '',
  })
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

  const totalActivities = activities.length
  const selectedUserFullName = [selectedUser?.name, selectedUser?.surname]
    .filter(Boolean)
    .join(' ')
  const hasSelectedUser = Boolean(selectedUser)
  const enrolledActivities = selectedUser?.enrolledActivities ?? []
  const activeProfessors = professors.filter((professor) => professor.isActive)
  const hasReachedLimit = enrolledActivities.length >= 3
  const canUserEnroll =
    hasSelectedUser &&
    selectedUser.isActive === true &&
    selectedUser.annualFeePaid === true &&
    !hasReachedLimit

  const handleFormChange = (event) => {
    const { name, value } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: name === 'capacity' || name === 'enrolled' ? Number(value) : value,
    }))
  }

  const handleCreateActivity = (event) => {
    event.preventDefault()

    const [day, hours] = formData.schedule.split(' ')
    const [startHour, endHour] = (hours || '').split('-')
    const activityData = {
      title: formData.title,
      price: Number(formData.price) || 0,
      weekDay: day || '',
      startHour: startHour || '',
      endHour: endHour || '',
      instructor: formData.instructor,
      image: formData.image,
    }
    const updatedActivities =
      editingActivity !== null
        ? activities.map((activity) =>
            activity.id === editingActivity.id
              ? { ...activity, ...activityData }
              : activity
          )
        : [
            ...activities,
            {
              id: Date.now(),
              ...activityData,
            },
          ]

    setActivities(updatedActivities)
    localStorage.setItem('activities', JSON.stringify(updatedActivities))
    setFormData({
      title: '',
      description: '',
      type: '',
      schedule: '',
      price: '',
      capacity: 10,
      enrolled: 0,
      instructor: '',
      location: 'Lorza Fitness',
      image: '',
    })
    setEditingActivity(null)
    setShowForm(false)
  }

  const handleEditActivity = (activity) => {
    const weekDay = activity.weekDay ?? activity.week_day ?? ''
    const startHour = activity.startHour ?? activity.start_hour ?? ''
    const endHour = activity.endHour ?? activity.end_hour ?? ''

    setEditingActivity(activity)
    setFormData({
      title: activity.title || '',
      description: activity.description || '',
      type: activity.type || '',
      schedule:
        weekDay && startHour && endHour
          ? `${weekDay} ${startHour}-${endHour}`
          : '',
      price: activity.price ?? '',
      capacity: activity.capacity ?? 10,
      enrolled: activity.enrolled ?? 0,
      instructor: activity.instructor || '',
      location: activity.location || 'Lorza Fitness',
      image: activity.image || '',
    })
    setShowForm(true)
  }

  const handleEnroll = (activity) => {
    setSelectedUser((currentUser) => {
      if (!currentUser) {
        return currentUser
      }

      const currentEnrolledActivities = currentUser.enrolledActivities ?? []
      const isAlreadyEnrolled = currentEnrolledActivities.includes(activity.id)
      const canEnrollInActivity =
        currentUser.isActive === true &&
        currentUser.annualFeePaid === true &&
        currentEnrolledActivities.length < 3 &&
        !isAlreadyEnrolled

      if (!canEnrollInActivity) {
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
    <section className="space-y-3" aria-label={`Actividades (${totalActivities})`}>
      <p className="text-sm font-semibold uppercase tracking-wide text-orange-400">
        Panel de gestion
      </p>
      <h1 className="text-3xl font-bold">Actividades</h1>
      <p className="text-neutral-300">
        Pagina base lista para la gestion de actividades.
      </p>
      <ManagementActionButton
        icon="plus"
        label={
          showForm
            ? 'Cerrar formulario de actividad'
            : 'Crear actividad'
        }
        tone="primary"
        onClick={() => {
          if (showForm) {
            setShowForm(false)
            setEditingActivity(null)
            setFormData({
              title: '',
              description: '',
              type: '',
              schedule: '',
              price: '',
              capacity: 10,
              enrolled: 0,
              instructor: '',
              location: 'Lorza Fitness',
              image: '',
            })
            return
          }

          setShowForm(true)
        }}
      >
        Crear actividad
      </ManagementActionButton>

      {showForm ? (
        <form
          onSubmit={handleCreateActivity}
          className="space-y-4 rounded-xl border border-neutral-800 bg-neutral-900 p-4"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleFormChange}
              placeholder="Titulo"
              className="rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-orange-400 focus:outline-none"
            />
            <div className="space-y-1">
              <label className="text-xs text-neutral-400">Tipo de actividad</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleFormChange}
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white focus:border-orange-400 focus:outline-none"
              >
                <option value="">Seleccionar tipo</option>
                <option value="Yoga">Yoga</option>
                <option value="Cardio">Cardio</option>
                <option value="Fuerza">Fuerza</option>
                <option value="Funcional">Funcional</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-neutral-400">Horario</label>
              <input
                type="text"
                name="schedule"
                value={formData.schedule}
                onChange={handleFormChange}
                placeholder="Ej: Lun 09:00-10:00"
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-orange-400 focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-neutral-400">Precio (EUR)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleFormChange}
                placeholder="Ej: 20"
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-orange-400 focus:outline-none"
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <label className="text-xs text-neutral-400">Capacidad maxima</label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleFormChange}
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white focus:border-orange-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-neutral-400">Inscritos</label>
                <input
                  type="number"
                  value={formData.enrolled}
                  disabled
                  className="w-full cursor-not-allowed rounded-xl border border-neutral-800 bg-neutral-800 px-4 py-3 text-sm text-neutral-400"
                />
              </div>
            </div>
            <select
              name="instructor"
              value={formData.instructor}
              onChange={handleFormChange}
              className="rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white focus:border-orange-400 focus:outline-none"
            >
              <option value="">Seleccionar instructor</option>
              {activeProfessors.map((professor) => (
                <option key={professor.id} value={professor.name}>
                  {professor.name} - {professor.specialty}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleFormChange}
              placeholder="URL de la imagen"
              className="rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-orange-400 focus:outline-none md:col-span-2"
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleFormChange}
              placeholder="Descripcion"
              rows="4"
              className="rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-orange-400 focus:outline-none md:col-span-2"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <ManagementActionButton
              type="submit"
              icon={editingActivity ? 'edit' : 'plus'}
              label={
                editingActivity
                  ? 'Actualizar actividad'
                  : 'Crear actividad'
              }
              tone="primary"
            >
              {editingActivity ? 'Actualizar actividad' : 'Crear actividad'}
            </ManagementActionButton>
            <ManagementActionButton
              icon="cancel"
              label="Cancelar formulario de actividad"
              onClick={() => {
                setShowForm(false)
                setEditingActivity(null)
                setFormData({
                  title: '',
                  description: '',
                  type: '',
                  schedule: '',
                  price: '',
                  capacity: 10,
                  enrolled: 0,
                  instructor: '',
                  location: 'Lorza Fitness',
                  image: '',
                })
              }}
            >
              Cancelar
            </ManagementActionButton>
          </div>
        </form>
      ) : null}

      <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 text-sm text-neutral-300">
        {hasSelectedUser ? (
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-2">
              <p className="text-lg font-semibold text-white">
                {selectedUserFullName}
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
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                  <p className="rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-2 text-amber-200">
                    Maximo de actividades alcanzado
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <p className="text-base font-semibold text-white">
              Selecciona un usuario primero
            </p>
            <p className="text-sm text-neutral-400">
              Elige una persona desde Usuarios para gestionar sus actividades.
            </p>
          </div>
        )}
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
            const canEnrollInActivity = canUserEnroll && !isAlreadyEnrolled

            return (
              <article
                key={activity.id}
                className="flex flex-col gap-4 rounded-xl border border-neutral-800 bg-neutral-900 p-4 md:grid md:grid-cols-[minmax(0,1fr)_auto] md:items-center"
              >
                <div className="flex items-start gap-4">
                  <ActivityThumbnail
                    src={activity.image}
                    title={activity.title}
                  />

                  <div className="space-y-1">
                    <p className="font-semibold text-white">
                      {activity.title || 'Titulo no disponible'}
                    </p>
                    <p className="text-sm text-neutral-300">
                      Precio: {activity.price ?? 'No disponible'}
                    </p>
                    <p className="text-sm text-neutral-400">
                      Dia: {weekDay ?? 'No disponible'}
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
                    onClick={() => handleEditActivity(activity)}
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
                        : 'Seleccionar actividad'
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

export default ManagementActivitiesPage
