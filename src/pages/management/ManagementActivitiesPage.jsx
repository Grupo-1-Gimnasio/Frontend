import { useEffect, useState } from 'react'
import { getActivities } from '../../services/activitiesService'

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
  const activeProfessors = professors.filter((p) => p.isActive)
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
    const newActivity = {
      id: Date.now(),
      title: formData.title,
      price: Number(formData.price) || 0,
      weekDay: day || '',
      startHour: startHour || '',
      endHour: endHour || '',
      instructor: formData.instructor,
      image: formData.image,
    }
    const updatedActivities = [...activities, newActivity]

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
    setShowForm(false)
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
      <button
        type="button"
        onClick={() => setShowForm((currentValue) => !currentValue)}
        className="w-fit rounded-full bg-orange-400 px-4 py-2 text-sm font-semibold text-neutral-950 transition hover:bg-orange-300"
      >
        Crear actividad
      </button>

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
              placeholder="T&iacute;tulo"
              className="rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-orange-400 focus:outline-none"
            />
            <div className="space-y-1">
              <label className="text-xs text-neutral-400">
                🏷 Tipo de actividad
              </label>
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
              <label className="text-xs text-neutral-400">🕒 Horario</label>
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
              <label className="text-xs text-neutral-400">
                💰 Precio (€)
              </label>
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
                <label className="text-xs text-neutral-400">
                  🧍 Capacidad (m&aacute;x. personas)
                </label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleFormChange}
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white focus:border-orange-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-neutral-400">👥 Inscritos</label>
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
              placeholder="Descripci&oacute;n"
              rows="4"
              className="rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-orange-400 focus:outline-none md:col-span-2"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              className="rounded-full bg-orange-400 px-4 py-2 text-sm font-semibold text-neutral-950 transition hover:bg-orange-300"
            >
              Crear actividad
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-full border border-neutral-700 px-4 py-2 text-sm font-semibold text-neutral-200 transition hover:bg-neutral-800"
            >
              Cancelar
            </button>
          </div>
        </form>
      ) : null}

      <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 text-sm text-neutral-300">
        <p>{selectedUserFullName || 'Selecciona un usuario primero'}</p>

        {hasSelectedUser ? (
          <>
            <p className="mt-3 text-sm text-neutral-300">
              Actividades: {enrolledActivities.length} / 3
            </p>

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
            const canEnrollInActivity =
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
                  onClick={() =>
                    isAlreadyEnrolled
                      ? handleUnenroll(activity)
                      : handleEnroll(activity)
                  }
                  disabled={!isAlreadyEnrolled && !canEnrollInActivity}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    isAlreadyEnrolled || canEnrollInActivity
                      ? 'bg-orange-400 text-neutral-950 hover:bg-orange-300'
                      : 'cursor-not-allowed bg-neutral-700 text-neutral-400 opacity-60'
                  }`}
                >
                  {isAlreadyEnrolled
                    ? 'Desinscribirse'
                    : 'Seleccionar actividad'}
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
