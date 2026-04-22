import { useEffect, useState } from 'react'
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
    <section
      className="space-y-3"
      aria-label={`Profesores (${totalProfessors})`}
    >
      <p className="text-sm font-semibold uppercase tracking-wide text-orange-400">
        Panel de gesti&oacute;n
      </p>
      <h1 className="text-3xl font-bold">Profesores</h1>
      <p className="text-neutral-300">
        P&aacute;gina base lista para la gesti&oacute;n de profesores.
      </p>
      <button
        type="button"
        onClick={() => setShowForm((currentValue) => !currentValue)}
        className="w-fit rounded-full bg-orange-400 px-4 py-2 text-sm font-semibold text-neutral-950 transition hover:bg-orange-300"
      >
        Crear profesor
      </button>
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
              <label className="text-xs text-neutral-400">
                📅 A&ntilde;o de contrataci&oacute;n
              </label>
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
            <button
              type="submit"
              className="rounded-full bg-orange-400 px-4 py-2 text-sm font-semibold text-neutral-950 transition hover:bg-orange-300"
            >
              {editingProfessor ? 'Actualizar profesor' : 'Crear profesor'}
            </button>
            <button
              type="button"
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
              className="rounded-full border border-neutral-700 px-4 py-2 text-sm font-semibold text-neutral-200 transition hover:bg-neutral-800"
            >
              Cancelar
            </button>
          </div>
        </form>
      ) : null}

      {professors.length === 0 ? (
        <p className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 text-sm text-neutral-300">
          No hay profesores disponibles.
        </p>
      ) : (
        <div className="mt-4 space-y-3">
          {professors.map((professor) => {
            return (
              <article
                key={professor.id}
                className="flex items-center justify-between gap-4 rounded-xl border border-neutral-800 bg-neutral-900 p-4"
              >
                <div className="flex items-center gap-4">
                  {professor.image ? (
                    <img
                      src={professor.image}
                      alt={`Avatar de ${professor.name || 'profesor'}`}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  ) : null}

                  <div className="space-y-1">
                    <p className="font-semibold text-white">
                      {professor.name || 'Profesor sin nombre'}
                    </p>
                    <p className="text-sm text-neutral-300">
                      DNI: {professor.dni || 'Sin DNI'}
                    </p>
                    <p className="text-sm text-neutral-400">
                      A&ntilde;o de contrataci&oacute;n:{' '}
                      {professor.hiringYear || 'No disponible'}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap justify-end gap-2">
                  {typeof professor.isActive !== 'undefined' ? (
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        professor.isActive
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-red-500/20 text-red-300'
                      }`}
                    >
                      {professor.isActive ? 'Activo' : 'Inactivo'}
                    </span>
                  ) : null}

                  <button
                    type="button"
                    onClick={(event) => handleEditProfessor(event, professor)}
                    className="rounded-full border border-neutral-700 px-4 py-2 text-sm font-semibold text-neutral-200 hover:bg-neutral-800"
                  >
                    Editar
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default ManagementProfessorsPage
