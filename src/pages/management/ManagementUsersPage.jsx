import { useEffect, useState } from 'react'
import { getUsers } from '../../services/usersService'

function ManagementUsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    getUsers().then((data) => {
      if (!isMounted) {
        return
      }

      setUsers(data)
      setLoading(false)
    })

    return () => {
      isMounted = false
    }
  }, [])

  const totalUsers = users.length

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
      <span className="sr-only">Total de usuarios: {totalUsers}</span>

      {users.length === 0 ? (
        <p className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 text-sm text-neutral-300">
          No hay usuarios disponibles.
        </p>
      ) : (
        <div className="mt-4 space-y-3">
          {users.map((user) => {
            const fullName = [user.name, user.surname].filter(Boolean).join(' ')
            const startYear = user.startYear ?? user.start_year

            return (
              <article
                key={user.id}
                className="flex items-center justify-between gap-4 rounded-xl border border-neutral-800 bg-neutral-900 p-4"
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
                      {user.annualFeePaid ? 'Cuota pagada' : 'Cuota pendiente'}
                    </span>
                  ) : null}
                </div>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default ManagementUsersPage
