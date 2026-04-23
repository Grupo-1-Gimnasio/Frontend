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
  createProfessor,
  deleteProfessor,
  getProfessors,
  updateProfessor,
} from '../../services/professorsService'
import { isTrainerRelationError } from '../../services/apiErrorUtils'

function getDefaultFormData() {
  return {
    name: '',
    dni: '',
    specialty: '',
    experience: '',
    hiringYear: '',
    image: '',
    isActive: true,
  }
}

function ManagementProfessorsPage() {
  const [professors, setProfessors] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingProfessor, setEditingProfessor] = useState(null)
  const [formData, setFormData] = useState(getDefaultFormData)
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [statusMessage, setStatusMessage] = useState('')

  useEffect(() => {
    let isMounted = true

    getProfessors()
      .then((data) => {
        if (!isMounted) {
          return
        }

        setProfessors(Array.isArray(data) ? data : [])
        setErrorMessage('')
      })
      .catch(() => {
        if (!isMounted) {
          return
        }

        setProfessors([])
        setErrorMessage('No se pudieron cargar los profesores.')
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

  const totalProfessors = professors.length

  const handleFormChange = (event) => {
    const { name, value, type, checked } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleEditProfessor = (event, professor) => {
    event.stopPropagation()
    setEditingProfessor(professor)
    setFormData({
      name: professor.name || '',
      dni: professor.dni || '',
      specialty: professor.specialty || '',
      experience: professor.experience || '',
      hiringYear: professor.hiringYear || '',
      image: professor.image || '',
      isActive: professor.isActive ?? true,
    })
    setShowForm(true)
    setErrorMessage('')
    setStatusMessage('')
  }

  const handleCloseForm = () => {
    setFormData(getDefaultFormData())
    setEditingProfessor(null)
    setShowForm(false)
  }

  const handleCreateOrUpdateProfessor = async (event) => {
    event.preventDefault()
    setErrorMessage('')
    setStatusMessage('')

    if (!formData.name || !formData.dni || !formData.specialty) {
      setErrorMessage('Nombre, DNI y especialidad son obligatorios.')
      return
    }

    try {
      const professorPayload = {
        ...formData,
        hiringYear: formData.hiringYear ? Number(formData.hiringYear) : null,
      }

      const savedProfessor = editingProfessor
        ? await updateProfessor(editingProfessor.id, professorPayload)
        : await createProfessor(professorPayload)

      setProfessors((currentProfessors) =>
        editingProfessor
          ? currentProfessors.map((professor) =>
              professor.id === editingProfessor.id ? savedProfessor : professor
            )
          : [...currentProfessors, savedProfessor]
      )

      setStatusMessage(
        editingProfessor
          ? 'Profesor actualizado correctamente.'
          : 'Profesor creado correctamente.'
      )
      handleCloseForm()
    } catch {
      setErrorMessage(
        editingProfessor
          ? 'No se pudo actualizar el profesor.'
          : 'No se pudo crear el profesor.'
      )
    }
  }

  const handleDeleteProfessor = async (event, professor) => {
    event.stopPropagation()
    setErrorMessage('')
    setStatusMessage('')

    if (!window.confirm('¿Seguro que quieres borrar este profesor?')) {
      return
    }

    try {
      await deleteProfessor(professor.id)
      setProfessors((currentProfessors) =>
        currentProfessors.filter(
          (currentProfessor) => currentProfessor.id !== professor.id
        )
      )
      setStatusMessage('Profesor eliminado correctamente.')
    } catch (error) {
      if (isTrainerRelationError(error)) {
        setErrorMessage(
          'No se puede eliminar el profesor porque esta relacionado con actividades mediante trainer_id. Reasigna o elimina esas actividades primero.'
        )
        return
      }

      setErrorMessage('No se pudo eliminar el profesor.')
    }
  }

  if (loading) {
    return (
      <section className="space-y-3">
        <p className="text-sm text-neutral-400">Cargando datos...</p>
      </section>
    )
  }

  return (
    <section className="space-y-4" aria-label={`Profesores (${totalProfessors})`}>
      <p className="text-sm font-semibold uppercase tracking-wide text-orange-400">
        Panel de gestion
      </p>
      <h1 className="text-3xl font-bold">Profesores</h1>
      <ManagementActionButton
        icon="plus"
        label={showForm ? 'Cerrar formulario de profesor' : 'Crear profesor'}
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
        Crear profesor
      </ManagementActionButton>
      <span className="sr-only">Total de profesores: {totalProfessors}</span>

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
          onSubmit={handleCreateOrUpdateProfessor}
          className="space-y-4 rounded-xl border border-neutral-800 bg-neutral-900 p-4"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <label className="text-xs text-neutral-400">Nombre</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                placeholder="Nombre"
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-orange-400 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-neutral-400">DNI</label>
              <input
                type="text"
                name="dni"
                value={formData.dni}
                onChange={handleFormChange}
                placeholder="Ej: 12345678A"
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-orange-400 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-neutral-400">Especialidad</label>
              <input
                type="text"
                name="specialty"
                value={formData.specialty}
                onChange={handleFormChange}
                placeholder="Ej: Yoga"
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-orange-400 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-neutral-400">Experiencia</label>
              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleFormChange}
                placeholder="Ej: 5 años"
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-orange-400 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-neutral-400">Año de contratacion</label>
              <input
                type="number"
                name="hiringYear"
                value={formData.hiringYear}
                onChange={handleFormChange}
                placeholder="Ej: 2022"
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-orange-400 focus:outline-none"
              />
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="text-xs text-neutral-400">Imagen (URL)</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleFormChange}
                placeholder="URL de la imagen"
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-orange-400 focus:outline-none"
              />
            </div>
          </div>

          <label className="flex items-center gap-3 text-sm text-neutral-300">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleFormChange}
              className="h-4 w-4 rounded border-neutral-700 bg-neutral-950 text-orange-400 focus:ring-orange-400"
            />
            Profesor activo
          </label>

          <div className="flex flex-wrap gap-3">
            <ManagementActionButton
              type="submit"
              icon={editingProfessor ? 'edit' : 'plus'}
              label={
                editingProfessor ? 'Actualizar profesor' : 'Crear profesor'
              }
              tone="primary"
            >
              {editingProfessor ? 'Actualizar profesor' : 'Crear profesor'}
            </ManagementActionButton>
            <ManagementActionButton
              icon="cancel"
              label="Cancelar formulario de profesor"
              onClick={handleCloseForm}
            >
              Cancelar
            </ManagementActionButton>
          </div>
        </form>
      ) : null}

      {professors.length === 0 ? (
        <p className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 text-sm text-neutral-300">
          No hay profesores disponibles.
        </p>
      ) : (
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {professors.map((professor) => {
            const description = `${professor.specialty || 'Sin especialidad'}. DNI ${professor.dni || 'sin DNI'}.`
            const accent = `Contratacion ${professor.hiringYear || 'no disponible'}`

            return (
              <ManagementCard
                key={professor.id}
                media={
                  <ManagementCardImage
                    src={professor.image}
                    alt={`Avatar de ${professor.name || 'profesor'}`}
                    fallback={professor.name?.slice(0, 1).toUpperCase() || 'P'}
                    imageClassName="object-[center_24%]"
                  />
                }
                title={professor.name || 'Profesor sin nombre'}
                description={description}
                accent={accent}
                titleClassName="text-[2rem]"
                footer={
                  <div className="flex flex-wrap items-center gap-2">
                    <ManagementStatusIcon
                      icon={professor.isActive ? 'active' : 'inactive'}
                      label={
                        professor.isActive ? 'Profesor activo' : 'Profesor inactivo'
                      }
                      tone={professor.isActive ? 'success' : 'muted'}
                    />

                    <div className="ml-auto flex items-center gap-2">
                      <ManagementActionButton
                        onClick={(event) => handleEditProfessor(event, professor)}
                        icon="edit"
                        label={`Editar profesor ${professor.name || 'sin nombre'}`}
                        iconOnly
                      />
                      <ManagementActionButton
                        onClick={(event) => handleDeleteProfessor(event, professor)}
                        icon="remove"
                        label={`Eliminar profesor ${professor.name || 'sin nombre'}`}
                        iconOnly
                      />
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

export default ManagementProfessorsPage
