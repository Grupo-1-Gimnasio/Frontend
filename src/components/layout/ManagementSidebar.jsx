import { NavLink } from 'react-router-dom'

const getSidebarLinkClassName = ({ isActive }) =>
  [
    'block rounded-md px-3 py-2 text-sm font-medium transition-colors',
    isActive
      ? 'bg-orange-500 text-neutral-950'
      : 'text-neutral-300 hover:bg-neutral-800 hover:text-white',
  ].join(' ')

function ManagementSidebar() {
  return (
    <aside className="w-64 border-r border-neutral-800 bg-neutral-900 p-4">
      <div className="mb-8">
        <p className="text-lg font-semibold text-white">Lorza&apos;s Fitness</p>
        <p className="text-xs text-neutral-400">Management Panel</p>
      </div>

      <nav className="space-y-2">
        <NavLink to="/management" end className={getSidebarLinkClassName}>
          Inicio
        </NavLink>
        <NavLink to="/management/users" className={getSidebarLinkClassName}>
          Usuarios
        </NavLink>
        <NavLink to="/management/activities" className={getSidebarLinkClassName}>
          Actividades
        </NavLink>
        <NavLink to="/management/professors" className={getSidebarLinkClassName}>
          Profesores
        </NavLink>
      </nav>
    </aside>
  )
}

export default ManagementSidebar
