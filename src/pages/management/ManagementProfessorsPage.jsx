import { useEffect, useState } from 'react'
import {
  ManagementCard,
  ManagementCardImage,
} from '../../components/management/ManagementCards'
import {
  ManagementActionButton,
  ManagementStatusIcon,
} from '../../components/management/ManagementUi'
import { getProfessors } from '../../services/professorsService'

function getStoredProfessorsState() {
  try {
    const savedProfessors = localStorage.getItem('professors')
    if (!savedProfessors) {
      return { professors: [], shouldFetch: true }
    }

    const parsedProfessors = JSON.parse(savedProfessors)
    const cleanProfessors = parsedProfessors.filter(
      (professor) => professor.name && professor.dni && professor.specialty
    )

    return {
      professors: cleanProfessors,
      shouldFetch: false,
    }
  } catch {
    localStorage.removeItem('professors')
    return { professors: [], shouldFetch: true }
  }
}

function ManagementProfessorsPage() {
  const [initialProfessorsState] = useState(() => getStoredProfessorsState())
  const [professors, setProfessors] = useState(initialProfessorsState.professors)
  const [showForm, setShowForm] = useState(false)
  const [editingProfessor, setEditingProfessor] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    dni: '',
    specialty: '',
    hiringYear: '',
    image: '',
    isActive: true,
  })
  const [loading, setLoading] = useState(initialProfessorsState.shouldFetch)

  useEffect(() => {
    if (!loading) {
      return undefined
    }

    let isMounted = true

    getProfessors().then((data) => {
      if (!isMounted) {
        return
      }

      setProfessors(data)
      localStorage.setItem('professors', JSON.stringify(data))
      setLoading(false)
    })

    return () => {
      isMounted = false
    }
  }, [loading])

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
      image: professor.image || '',
      isActive: professor.isActive ?? true,
      hiringYear: professor.hiringYear || '',
    })
    setShowForm(true)
  }

  const handleCreateProfessor = (event) => {
    event.preventDefault()

    if (!formData.name || !formData.dni || !formData.specialty) {
      alert('Completa todos los campos obligatorios')
      return
    }

    const updatedProfessors =
      editingProfessor !== null
        ? professors.map((professor) =>
            professor.id === editingProfessor.id
              ? { ...professor, ...formData }
              : professor
          )
        : [
            ...professors,
            {
              id: Date.now(),
              ...formData,
            },
          ]

    setProfessors(updatedProfessors)
    localStorage.setItem('professors', JSON.stringify(updatedProfessors))
    setFormData({
      name: '',
      dni: '',
      specialty: '',
      hiringYear: '',
      image: '',
      isActive: true,
    })
    setEditingProfessor(null)
    setShowForm(false)
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
        onClick={() => setShowForm((currentValue) => !currentValue)}
      >
        Crear profesor
      </ManagementActionButton>
      <span className="sr-only">Total de profesores: {totalProfessors}</span>

      {showForm ? (
        <form
          onSubmit={handleCreateProfessor}
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
              <select
                name="specialty"
                value={formData.specialty}
                onChange={handleFormChange}
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-orange-400 focus:outline-none"
              >
                <option value="">Selecciona una especialidad</option>
                <option value="Yoga">Yoga</option>
                <option value="Cardio">Cardio</option>
                <option value="Fuerza">Fuerza</option>
                <option value="Funcional">Funcional</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-neutral-400">Ano de contratacion</label>
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
              onClick={() => {
                setFormData({
                  name: '',
                  dni: '',
                  specialty: '',
                  hiringYear: '',
                  image: '',
                  isActive: true,
                })
                setEditingProfessor(null)
                setShowForm(false)
              }}
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
            const description = `DNI ${professor.dni || 'sin DNI'}. Gestiona su perfil docente dentro del centro.`
            const accent = `Contratacion ${professor.hiringYear || 'no disponible'}`

            return (
              <ManagementCard
                key={professor.id}
                media={
                  <ManagementCardImage
                    src={professor.image}
                    alt={`Avatar de ${professor.name || 'profesor'}`}
                    fallback={professor.name?.slice(0, 1).toUpperCase() || 'P'}
                  />
                }
                title={professor.name || 'Profesor sin nombre'}
                description={description}
                accent={accent}
                titleClassName="text-[2rem]"
                footer={
                  <div className="flex flex-wrap items-center gap-2">
                    {typeof professor.isActive !== 'undefined' ? (
                      <ManagementStatusIcon
                        icon={professor.isActive ? 'active' : 'inactive'}
                        label={
                          professor.isActive ? 'Profesor activo' : 'Profesor inactivo'
                        }
                        tone={professor.isActive ? 'success' : 'muted'}
                      />
                    ) : null}

                    <div className="ml-auto flex items-center gap-2">
                      <ManagementActionButton
                        onClick={(event) => handleEditProfessor(event, professor)}
                        icon="edit"
                        label={`Editar profesor ${professor.name || 'sin nombre'}`}
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
