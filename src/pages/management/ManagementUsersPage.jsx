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
      <span className="sr-only">Total de usuarios mock: {totalUsers}</span>
    </section>
  )
}

export default ManagementUsersPage
