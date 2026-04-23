import { useEffect, useState } from 'react'
import {
  ManagementCard,
  ManagementCardImage,
} from '../../components/management/ManagementCards'
import {
  ManagementActionButton,
  ManagementStatusIcon,
} from '../../components/management/ManagementUi'
import {
  createActivity,
  deleteActivity,
  getActivities,
  updateActivity,
} from '../../services/activitiesService'
import { getProfessors } from '../../services/professorsService'
import { isForeignKeyError } from '../../services/apiErrorUtils'

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

function getActivitySchedule(activity) {
  const day = getWeekDayLabel(activity.weekDay)
  const start = (activity.startHour ?? '00:00:00').slice(0, 5)
  const end = (activity.endHour ?? '00:00:00').slice(0, 5)

  return `${day.toUpperCase()} ${start}-${end}`
}

function getStoredSelectedUser() {
  try {
    const savedUser = localStorage.getItem('selectedUser')
    return savedUser ? JSON.parse(savedUser) : null
  } catch {
    return null
  }
}

function getDefaultFormData() {
  return {
    title: '',
    weekDay: '',
    startHour: '',
    endHour: '',
    price: '',
    trainerId: '',
    image: '',
  }
}

function SummaryStatusItem({ icon, label, tone }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-950/60 px-3 py-2 text-sm text-neutral-200">
      <ManagementStatusIcon icon={icon} label={label} tone={tone} className="h-9 w-9" />
      <span>{label}</span>
    </div>
  )
}

function ManagementActivitiesPage() {
  const [activities, setActivities] = useState([])
  const [professors, setProfessors] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingActivity, setEditingActivity] = useState(null)
  const [formData, setFormData] = useState(getDefaultFormData)
  const [selectedUser, setSelectedUser] = useState(getStoredSelectedUser)
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [statusMessage, setStatusMessage] = useState('')

  useEffect(() => {
    let isMounted = true

    Promise.all([getActivities(), getProfessors()])
      .then(([activitiesData, professorsData]) => {
        if (!isMounted) {
          return
        }

        setActivities(Array.isArray(activitiesData) ? activitiesData : [])
        setProfessors(Array.isArray(professorsData) ? professorsData : [])
        setErrorMessage('')
      })
      .catch(() => {
        if (!isMounted) {
          return
        }

        setActivities([])
        setProfessors([])
        setErrorMessage('No se pudieron cargar actividades y profesores.')
      })
      .finally(() => {
        if (!isMounted) {
          return
        }

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
  const activeProfessors = professors.filter((professor) => professor.isActive)
  const hasReachedLimit = enrolledActivities.length >= 3
  const canUserEnroll =
    hasSelectedUser &&
    selectedUser.isActive === true &&
    selectedUser.annualFeePaid === true &&
    !hasReachedLimit
  const professorsById = Object.fromEntries(
    professors.map((professor) => [professor.id, professor])
  )

  const handleFormChange = (event) => {
    const { name, value } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingActivity(null)
    setFormData(getDefaultFormData())
  }

  const handleCreateOrUpdateActivity = async (event) => {
    event.preventDefault()
    setErrorMessage('')
    setStatusMessage('')

    if (
      !formData.title ||
      !formData.weekDay ||
      !formData.startHour ||
      !formData.endHour ||
      !formData.trainerId
    ) {
      setErrorMessage(
        'Titulo, dia, hora inicio, hora fin y profesor son obligatorios.'
      )
      return
    }

    try {
      const activityPayload = {
        title: formData.title,
        price: formData.price,
        weekDay: formData.weekDay,
        startHour: `${formData.startHour}:00`,
        endHour: `${formData.endHour}:00`,
        image: formData.image,
        trainerId: Number(formData.trainerId),
      }

      const savedActivity = editingActivity
        ? await updateActivity(editingActivity.id, activityPayload)
        : await createActivity(activityPayload)

      setActivities((currentActivities) =>
        editingActivity
          ? currentActivities.map((activity) =>
              activity.id === editingActivity.id ? savedActivity : activity
            )
          : [...currentActivities, savedActivity]
      )

      setStatusMessage(
        editingActivity
          ? 'Actividad actualizada correctamente.'
          : 'Actividad creada correctamente.'
      )
      handleCloseForm()
    } catch {
      setErrorMessage(
        editingActivity
          ? 'No se pudo actualizar la actividad.'
          : 'No se pudo crear la actividad.'
      )
    }
  }

  const handleEditActivity = (activity) => {
    setEditingActivity(activity)
    setFormData({
      title: activity.title || '',
      weekDay: activity.weekDay || '',
      startHour: (activity.startHour || '').slice(0, 5),
      endHour: (activity.endHour || '').slice(0, 5),
      price: activity.price ?? '',
      trainerId: activity.trainerId ? String(activity.trainerId) : '',
      image: activity.image || '',
    })
    setShowForm(true)
    setErrorMessage('')
    setStatusMessage('')
  }

  const handleDeleteActivity = async (activity) => {
    setErrorMessage('')
    setStatusMessage('')

    if (!window.confirm('¿Seguro que quieres borrar esta actividad?')) {
      return
    }

    try {
      await deleteActivity(activity.id)
      setActivities((currentActivities) =>
        currentActivities.filter(
          (currentActivity) => currentActivity.id !== activity.id
        )
      )

      setSelectedUser((currentUser) => {
        if (!currentUser) {
          return currentUser
        }

        const updatedUser = {
          ...currentUser,
          enrolledActivities: (currentUser.enrolledActivities ?? []).filter(
            (activityId) => activityId !== activity.id
          ),
        }
        localStorage.setItem('selectedUser', JSON.stringify(updatedUser))
        return updatedUser
      })

      setStatusMessage('Actividad eliminada correctamente.')
    } catch (error) {
      if (isForeignKeyError(error)) {
        setErrorMessage(
          'No se puede eliminar la actividad porque tiene registros relacionados en otras tablas.'
        )
        return
      }

      setErrorMessage('No se pudo eliminar la actividad.')
    }
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
    <section className="space-y-4" aria-label={`Actividades (${totalActivities})`}>
      <p className="text-sm font-semibold uppercase tracking-wide text-orange-400">
        Panel de gestion
      </p>
      <h1 className="text-3xl font-bold">Actividades</h1>
      <ManagementActionButton
        icon="plus"
        label={showForm ? 'Cerrar formulario de actividad' : 'Crear actividad'}
        tone="primary"
        onClick={() => {
          if (showForm) {
            handleCloseForm()
            return
          }

          setShowForm(true)
          setErrorMessage('')
          setStatusMessage('')
        }}
      >
        Crear actividad
      </ManagementActionButton>

      {errorMessage ? (
        <p className="rounded-xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-200">
          {errorMessage}
        </p>
      ) : null}

      {statusMessage ? (
        <p className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4 text-sm text-emerald-200">
          {statusMessage}
        </p>
      ) : null}

      {showForm ? (
        <form
          onSubmit={handleCreateOrUpdateActivity}
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
              <label className="text-xs text-neutral-400">Dia de la semana</label>
              <select
                name="weekDay"
                value={formData.weekDay}
                onChange={handleFormChange}
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white focus:border-orange-400 focus:outline-none"
              >
                <option value="">Seleccionar dia</option>
                <option value="Lunes">Lunes</option>
                <option value="Martes">Martes</option>
                <option value="Miércoles">Miércoles</option>
                <option value="Jueves">Jueves</option>
                <option value="Viernes">Viernes</option>
                <option value="Sábado">Sábado</option>
                <option value="Domingo">Domingo</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-neutral-400">Hora de inicio</label>
              <input
                type="time"
                name="startHour"
                value={formData.startHour}
                onChange={handleFormChange}
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white focus:border-orange-400 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-neutral-400">Hora de fin</label>
              <input
                type="time"
                name="endHour"
                value={formData.endHour}
                onChange={handleFormChange}
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white focus:border-orange-400 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-neutral-400">Precio (EUR)</label>
              <input
                type="number"
                step="0.01"
                name="price"
                value={formData.price}
                onChange={handleFormChange}
                placeholder="Ej: 20.00"
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-orange-400 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-neutral-400">Profesor</label>
              <select
                name="trainerId"
                value={formData.trainerId}
                onChange={handleFormChange}
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white focus:border-orange-400 focus:outline-none"
              >
                <option value="">Seleccionar profesor</option>
                {activeProfessors.map((professor) => (
                  <option key={professor.id} value={professor.id}>
                    {professor.name} - {professor.specialty}
                  </option>
                ))}
              </select>
            </div>

            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleFormChange}
              placeholder="URL de la imagen"
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
              onClick={handleCloseForm}
            >
              Cancelar
            </ManagementActionButton>
          </div>
        </form>
      ) : null}

      <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 text-sm text-neutral-300">
        {hasSelectedUser ? (
          <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[minmax(0,280px)_auto] lg:items-start lg:justify-between">
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
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {activities.map((activity) => {
            const isAlreadyEnrolled = enrolledActivities.includes(activity.id)
            const canEnrollInActivity = canUserEnroll && !isAlreadyEnrolled
            const professor = professorsById[activity.trainerId]
            const trainerName = professor?.name || 'Profesor no disponible'
            const description = `Sesion guiada por ${trainerName}.`

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
                accent={getActivitySchedule(activity)}
                footer={
                  <div className="space-y-3">
                    <p className="text-sm text-neutral-300">
                      Precio: {activity.price ?? 'No disponible'} EUR
                    </p>
                    <p className="text-sm text-neutral-400">
                      Profesor: {trainerName}
                    </p>
                    {isAlreadyEnrolled ? (
                      <p className="text-sm text-sky-200">
                        Ya inscrito en esta actividad
                      </p>
                    ) : (
                      <p className="text-sm text-neutral-400">
                        Gestiona su asignacion desde esta tarjeta.
                      </p>
                    )}

                    <div className="flex items-center gap-2">
                      <div className="ml-auto flex items-center gap-2">
                        <ManagementActionButton
                          onClick={() => handleEditActivity(activity)}
                          icon="edit"
                          label={`Editar actividad ${activity.title || 'sin titulo'}`}
                          iconOnly
                        />
                        <ManagementActionButton
                          onClick={() => handleDeleteActivity(activity)}
                          icon="remove"
                          label={`Eliminar actividad ${activity.title || 'sin titulo'}`}
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

export default ManagementActivitiesPage
