import { Link, NavLink } from 'react-router-dom'
import logoLs from '../../assets/logo-ls.png'

const getSidebarLinkClassName = ({ isActive }) =>
  [
    'block rounded-md px-3 py-2 text-sm font-medium transition-colors',
    isActive
      ? 'bg-orange-500 text-neutral-950'
      : 'text-neutral-300 hover:bg-neutral-800 hover:text-white',
  ].join(' ')

function ManagementSidebar() {
  return (
    <aside className="flex w-64 flex-col border-r border-neutral-800 bg-neutral-900 p-4">
      <div className="mb-8">
        <Link to="/" className="flex items-center gap-2.5">
          <img
            src={logoLs}
            alt="Lorza's Fitness logo"
            className="h-8 w-8 object-contain"
          />
          <p className="whitespace-nowrap text-[18px] leading-none font-semibold tracking-[-0.03em]">
            <span className="text-[#ff6b2c]">Lorza&apos;s</span>{' '}
            <span className="text-white">Fitness</span>
          </p>
        </Link>
        <p className="mt-2 text-xs text-neutral-400">Panel de gesti&oacute;n</p>
      </div>

      <nav className="space-y-2">
        <NavLink to="/dashboard" end className={getSidebarLinkClassName}>
          Panel de control
        </NavLink>
        <NavLink to="/dashboard/users" className={getSidebarLinkClassName}>
          Usuarios
        </NavLink>
        <NavLink to="/dashboard/activities" className={getSidebarLinkClassName}>
          Actividades
        </NavLink>
        <NavLink
          to="/dashboard/user-activities"
          className={getSidebarLinkClassName}
        >
          Cursos usuario
        </NavLink>
        <NavLink to="/dashboard/professors" className={getSidebarLinkClassName}>
          Profesores
        </NavLink>
      </nav>

      <div className="mt-8">
        <Link
          to="/"
          className="block rounded-md border border-neutral-700 px-3 py-2 text-sm font-medium text-neutral-300 transition-colors hover:bg-neutral-800 hover:text-white"
        >
          &larr; Volver a la web
        </Link>
      </div>
    </aside>
  )
}

export default ManagementSidebar
