import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
        ? users.map((u) =>
            u.id === editingUser.id ? { ...u, ...formData } : u
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
    <section className="space-y-3" aria-label={`Usuarios (${totalUsers})`}>
      <p className="text-sm font-semibold uppercase tracking-wide text-orange-400">
        Panel de gesti&oacute;n
      </p>
      <h1 className="text-3xl font-bold">Usuarios</h1>
      <p className="text-neutral-300">
        P&aacute;gina base lista para la gesti&oacute;n de usuarios.
      </p>
      <button
        type="button"
        onClick={() => setShowForm((currentValue) => !currentValue)}
        className="rounded-full bg-orange-400 px-4 py-2 text-sm font-semibold text-neutral-950 transition hover:bg-orange-300"
      >
        Crear usuario
      </button>
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

          <button
            type="submit"
            className="rounded-full bg-orange-400 px-4 py-2 text-sm font-semibold text-neutral-950 transition hover:bg-orange-300"
          >
            {editingUser ? 'Actualizar usuario' : 'Guardar usuario'}
          </button>
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
              No hay usuarios que coincidan con la b&uacute;squeda.
            </p>
          ) : (
            filteredUsers.map((user) => {
              const fullName = [user.name, user.surname]
                .filter(Boolean)
                .join(' ')
              const startYear = user.startYear ?? user.start_year

              return (
                <article
                  key={user.id}
                  onClick={() => handleUserSelect(user)}
                  className={`flex cursor-pointer items-center justify-between gap-4 rounded-xl border p-4 transition ${
                    selectedUser?.id === user.id
                      ? 'border-orange-400 bg-neutral-800'
                      : 'border-neutral-800 bg-neutral-900'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={`Avatar de ${fullName || 'usuario'}`}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                    ) : null}

                    <div className="space-y-1">
                      <p className="font-semibold text-white">
                        {fullName || 'Nombre no disponible'}
                      </p>
                      <p className="text-sm text-neutral-300">
                        DNI: {user.dni || 'No disponible'}
                      </p>
                      <p className="text-sm text-neutral-400">
                        A&ntilde;o de inicio: {startYear || 'No disponible'}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-end gap-2">
                    {typeof user.isActive !== 'undefined' ? (
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          user.isActive
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : 'bg-red-500/20 text-red-300'
                        }`}
                      >
                        {user.isActive ? 'Activo' : 'Inactivo'}
                      </span>
                    ) : null}

                    {typeof user.annualFeePaid !== 'undefined' ? (
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          user.annualFeePaid
                            ? 'bg-blue-500/20 text-blue-300'
                            : 'bg-amber-500/20 text-amber-300'
                        }`}
                      >
                        {user.annualFeePaid
                          ? 'Cuota pagada'
                          : 'Cuota pendiente'}
                      </span>
                    ) : null}

                    <button
                      type="button"
                      onClick={(event) => handleEditUser(event, user)}
                      className="rounded-full border border-neutral-700 px-4 py-2 text-sm font-semibold text-neutral-200 transition hover:bg-neutral-800"
                    >
                      Editar
                    </button>

                    <button
                      type="button"
                      onClick={(event) => handleViewCourses(event, user)}
                      className="rounded-full bg-orange-400 px-4 py-2 text-sm font-semibold text-neutral-950 transition hover:bg-orange-300"
                    >
                      Ver cursos
                    </button>
                  </div>
                </article>
              )
            })
          )}
        </div>
      )}
    </section>
  )
}

export default ManagementUsersPage
