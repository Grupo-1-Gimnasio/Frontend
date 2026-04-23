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
import { getUsers } from '../../services/usersService'

function getStoredUsersState() {
  try {
    const savedUsers = localStorage.getItem('users')
    if (!savedUsers) {
      return { users: [], shouldFetch: true }
    }

    return {
      users: JSON.parse(savedUsers),
      shouldFetch: false,
    }
  } catch {
    localStorage.removeItem('users')
    return { users: [], shouldFetch: true }
  }
}

function ManagementUsersPage() {
  const navigate = useNavigate()
  const [initialUsersState] = useState(() => getStoredUsersState())
  const [users, setUsers] = useState(initialUsersState.users)
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    dni: '',
    image: '',
    isActive: true,
    annualFeePaid: false,
  })
  const [selectedUser, setSelectedUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('selectedUser')
      return savedUser ? JSON.parse(savedUser) : null
    } catch {
      return null
    }
  })
  const [loading, setLoading] = useState(initialUsersState.shouldFetch)

  useEffect(() => {
    if (!loading) {
      return undefined
    }

    let isMounted = true

    getUsers().then((data) => {
      if (!isMounted) {
        return
      }

      setUsers(data)
      localStorage.setItem('users', JSON.stringify(data))
      setLoading(false)
    })

    return () => {
      isMounted = false
    }
  }, [loading])

  const totalUsers = users.length
  const normalizedSearchTerm = searchTerm.trim().toLowerCase()

  const handleUserSelect = (user) => {
    let finalUser = user

    try {
      const savedUser = JSON.parse(localStorage.getItem('selectedUser'))

      if (savedUser && savedUser.id === user.id) {
        finalUser = {
          ...savedUser,
          ...user,
          enrolledActivities: savedUser.enrolledActivities ?? [],
        }
      }
    } catch {
      finalUser = user
    }

    setSelectedUser(finalUser)
    localStorage.setItem('selectedUser', JSON.stringify(finalUser))
  }

  const handleViewCourses = (event, user) => {
    event.stopPropagation()
    handleUserSelect(user)
    navigate('/dashboard/user-activities')
  }

  const handleFormChange = (event) => {
    const { name, value, type, checked } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleEditUser = (event, user) => {
    event.stopPropagation()
    setEditingUser(user)
    setFormData({
      name: user.name || '',
      surname: user.surname || '',
      dni: user.dni || '',
      image: user.image || '',
      isActive: user.isActive ?? false,
      annualFeePaid: user.annualFeePaid ?? false,
    })
    setShowForm(true)
  }

  const handleCreateUser = (event) => {
    event.preventDefault()

    const updatedUsers =
      editingUser !== null
        ? users.map((user) =>
            user.id === editingUser.id ? { ...user, ...formData } : user
          )
        : [
            ...users,
            {
              id: Date.now(),
              name: formData.name,
              surname: formData.surname,
              dni: formData.dni,
              image: formData.image,
              isActive: formData.isActive,
              annualFeePaid: formData.annualFeePaid,
            },
          ]

    setUsers(updatedUsers)
    localStorage.setItem('users', JSON.stringify(updatedUsers))
    setFormData({
      name: '',
      surname: '',
      dni: '',
      image: '',
      isActive: true,
      annualFeePaid: false,
    })
    setEditingUser(null)
    setShowForm(false)
  }

  const filteredUsers =
    normalizedSearchTerm === ''
      ? users
      : users.filter((user) => {
          const name = (user.name || '').toLowerCase()
          const surname = (user.surname || '').toLowerCase()
          const dni = (user.dni || '').toLowerCase()

          return (
            name.includes(normalizedSearchTerm) ||
            surname.includes(normalizedSearchTerm) ||
            dni.includes(normalizedSearchTerm)
          )
        })

  if (loading) {
    return (
      <section className="space-y-3">
        <p className="text-sm text-neutral-400">Cargando datos...</p>
      </section>
    )
  }

  return (
    <section className="space-y-4" aria-label={`Usuarios (${totalUsers})`}>
      <p className="text-sm font-semibold uppercase tracking-wide text-orange-400">
        Panel de gestion
      </p>
      <h1 className="text-3xl font-bold">Usuarios</h1>
      <ManagementActionButton
        icon="plus"
        label={showForm ? 'Cerrar formulario de usuario' : 'Crear usuario'}
        tone="primary"
        onClick={() => setShowForm((currentValue) => !currentValue)}
      >
        Crear usuario
      </ManagementActionButton>
      <span className="sr-only">Total de usuarios: {totalUsers}</span>

      {showForm ? (
        <form
          onSubmit={handleCreateUser}
          className="space-y-4 rounded-xl border border-neutral-800 bg-neutral-900 p-4"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              placeholder="Nombre"
              className="rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-orange-400 focus:outline-none"
            />
            <input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleFormChange}
              placeholder="Apellido"
              className="rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-orange-400 focus:outline-none"
            />
            <input
              type="text"
              name="dni"
              value={formData.dni}
              onChange={handleFormChange}
              placeholder="DNI"
              className="rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-orange-400 focus:outline-none"
            />
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleFormChange}
              placeholder="URL de la imagen"
              className="rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-orange-400 focus:outline-none"
            />
          </div>

          <label className="flex items-center gap-3 text-sm text-neutral-300">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleFormChange}
              className="h-4 w-4 rounded border-neutral-700 bg-neutral-950 text-orange-400 focus:ring-orange-400"
            />
            Usuario activo
          </label>

          <label className="flex items-center gap-3 text-sm text-neutral-300">
            <input
              type="checkbox"
              name="annualFeePaid"
              checked={formData.annualFeePaid}
              onChange={handleFormChange}
              className="h-4 w-4 rounded border-neutral-700 bg-neutral-950 text-orange-400 focus:ring-orange-400"
            />
            Cuota pagada
          </label>

          <ManagementActionButton
            type="submit"
            icon={editingUser ? 'edit' : 'plus'}
            label={editingUser ? 'Actualizar usuario' : 'Guardar usuario'}
            tone="primary"
          >
            {editingUser ? 'Actualizar usuario' : 'Guardar usuario'}
          </ManagementActionButton>
        </form>
      ) : null}

      {users.length === 0 ? (
        <p className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 text-sm text-neutral-300">
          No hay usuarios disponibles.
        </p>
      ) : (
        <div className="mt-4 space-y-3">
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Buscar por nombre, apellido o DNI"
            className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-orange-400 focus:outline-none"
          />

          {filteredUsers.length === 0 ? (
            <p className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 text-sm text-neutral-300">
              No hay usuarios que coincidan con la busqueda.
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredUsers.map((user) => {
              const fullName = [user.name, user.surname]
                .filter(Boolean)
                .join(' ')
              const startYear = user.startYear ?? user.start_year
              const cardDescription = `DNI ${user.dni || 'no disponible'}. Gestiona su seguimiento dentro del panel.`
              const cardAccent = `Alta ${startYear || 'no disponible'}`

              return (
                <ManagementCard
                  key={user.id}
                  onClick={() => handleUserSelect(user)}
                  selected={selectedUser?.id === user.id}
                  media={
                    <ManagementCardImage
                      src={user.image}
                      alt={`Avatar de ${fullName || 'usuario'}`}
                      fallback={fullName?.slice(0, 1).toUpperCase() || 'U'}
                    />
                  }
                  title={fullName || 'Nombre no disponible'}
                  description={cardDescription}
                  accent={cardAccent}
                  titleClassName="text-[2rem]"
                  footer={
                    <div className="flex flex-wrap items-center gap-2">
                      {typeof user.isActive !== 'undefined' ? (
                        <ManagementStatusIcon
                          icon={user.isActive ? 'active' : 'inactive'}
                          label={user.isActive ? 'Usuario activo' : 'Usuario inactivo'}
                          tone={user.isActive ? 'success' : 'muted'}
                        />
                      ) : null}

                      {typeof user.annualFeePaid !== 'undefined' ? (
                        <ManagementStatusIcon
                          icon={user.annualFeePaid ? 'paid' : 'pending'}
                          label={
                            user.annualFeePaid
                              ? 'Cuota pagada'
                              : 'Cuota pendiente'
                          }
                          tone={user.annualFeePaid ? 'info' : 'warning'}
                        />
                      ) : null}

                      <div className="ml-auto flex items-center gap-2">
                        <ManagementActionButton
                          onClick={(event) => handleEditUser(event, user)}
                          icon="edit"
                          label={`Editar usuario ${fullName || 'sin nombre'}`}
                          iconOnly
                        />

                        <ManagementActionButton
                          onClick={(event) => handleViewCourses(event, user)}
                          icon="courses"
                          label={`Ver cursos de ${fullName || 'usuario'}`}
                          tone="primary"
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
        </div>
      )}
    </section>
  )
}

export default ManagementUsersPage
