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
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from '../../services/usersService'
import { isForeignKeyError } from '../../services/apiErrorUtils'

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
    name: '',
    surname: '',
    dni: '',
    startYear: '',
    image: '',
    isActive: true,
    annualFeePaid: false,
  }
}

function ManagementUsersPage() {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [formData, setFormData] = useState(getDefaultFormData)
  const [selectedUser, setSelectedUser] = useState(getStoredSelectedUser)
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [statusMessage, setStatusMessage] = useState('')

  useEffect(() => {
    let isMounted = true

    getUsers()
      .then((data) => {
        if (!isMounted) {
          return
        }

        setUsers(Array.isArray(data) ? data : [])
        setErrorMessage('')
      })
      .catch(() => {
        if (!isMounted) {
          return
        }

        setUsers([])
        setErrorMessage('No se pudieron cargar los usuarios.')
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
      startYear: user.startYear || '',
      image: user.image || '',
      isActive: user.isActive ?? false,
      annualFeePaid: user.annualFeePaid ?? false,
    })
    setShowForm(true)
    setErrorMessage('')
    setStatusMessage('')
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingUser(null)
    setFormData(getDefaultFormData())
  }

  const handleCreateOrUpdateUser = async (event) => {
    event.preventDefault()
    setErrorMessage('')
    setStatusMessage('')

    if (!formData.name || !formData.surname || !formData.dni) {
      setErrorMessage('Nombre, apellido y DNI son obligatorios.')
      return
    }

    try {
      const userPayload = {
        ...formData,
        startYear: formData.startYear ? Number(formData.startYear) : null,
      }

      const savedUser = editingUser
        ? await updateUser(editingUser.id, userPayload)
        : await createUser(userPayload)

      setUsers((currentUsers) =>
        editingUser
          ? currentUsers.map((user) =>
              user.id === editingUser.id ? savedUser : user
            )
          : [...currentUsers, savedUser]
      )

      if (selectedUser?.id === savedUser.id) {
        const mergedUser = {
          ...selectedUser,
          ...savedUser,
          enrolledActivities: selectedUser.enrolledActivities ?? [],
        }
        setSelectedUser(mergedUser)
        localStorage.setItem('selectedUser', JSON.stringify(mergedUser))
      }

      setStatusMessage(
        editingUser
          ? 'Usuario actualizado correctamente.'
          : 'Usuario creado correctamente.'
      )
      handleCloseForm()
    } catch {
      setErrorMessage(
        editingUser
          ? 'No se pudo actualizar el usuario.'
          : 'No se pudo crear el usuario.'
      )
    }
  }

  const handleDeleteUser = async (event, user) => {
    event.stopPropagation()
    setErrorMessage('')
    setStatusMessage('')

    if (!window.confirm('¿Seguro que quieres borrar este usuario?')) {
      return
    }

    try {
      await deleteUser(user.id)
      setUsers((currentUsers) =>
        currentUsers.filter((currentUser) => currentUser.id !== user.id)
      )

      if (selectedUser?.id === user.id) {
        setSelectedUser(null)
        localStorage.removeItem('selectedUser')
      }

      setStatusMessage('Usuario eliminado correctamente.')
    } catch (error) {
      if (isForeignKeyError(error)) {
        setErrorMessage(
          'No se puede eliminar el usuario porque tiene registros relacionados en otras tablas.'
        )
        return
      }

      setErrorMessage('No se pudo eliminar el usuario.')
    }
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
        Crear usuario
      </ManagementActionButton>
      <span className="sr-only">Total de usuarios: {totalUsers}</span>

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
          onSubmit={handleCreateOrUpdateUser}
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
              type="number"
              name="startYear"
              value={formData.startYear}
              onChange={handleFormChange}
              placeholder="Año de alta"
              className="rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-orange-400 focus:outline-none"
            />
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleFormChange}
              placeholder="URL de la imagen"
              className="rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-orange-400 focus:outline-none md:col-span-2"
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

          <div className="flex flex-wrap gap-3">
            <ManagementActionButton
              type="submit"
              icon={editingUser ? 'edit' : 'plus'}
              label={editingUser ? 'Actualizar usuario' : 'Guardar usuario'}
              tone="primary"
            >
              {editingUser ? 'Actualizar usuario' : 'Guardar usuario'}
            </ManagementActionButton>
            <ManagementActionButton
              icon="cancel"
              label="Cancelar formulario de usuario"
              onClick={handleCloseForm}
            >
              Cancelar
            </ManagementActionButton>
          </div>
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
                const cardDescription = `DNI ${user.dni || 'no disponible'}. Gestiona su seguimiento dentro del panel.`
                const cardAccent = `Alta ${user.startYear || 'no disponible'}`

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
                        <ManagementStatusIcon
                          icon={user.isActive ? 'active' : 'inactive'}
                          label={user.isActive ? 'Usuario activo' : 'Usuario inactivo'}
                          tone={user.isActive ? 'success' : 'muted'}
                        />

                        <ManagementStatusIcon
                          icon={user.annualFeePaid ? 'paid' : 'pending'}
                          label={
                            user.annualFeePaid
                              ? 'Cuota pagada'
                              : 'Cuota pendiente'
                          }
                          tone={user.annualFeePaid ? 'info' : 'warning'}
                        />

                        <div className="ml-auto flex items-center gap-2">
                          <ManagementActionButton
                            onClick={(event) => handleEditUser(event, user)}
                            icon="edit"
                            label={`Editar usuario ${fullName || 'sin nombre'}`}
                            iconOnly
                          />

                          <ManagementActionButton
                            onClick={(event) => handleDeleteUser(event, user)}
                            icon="remove"
                            label={`Eliminar usuario ${fullName || 'sin nombre'}`}
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
