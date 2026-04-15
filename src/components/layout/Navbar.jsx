import { NavLink } from 'react-router-dom'

const getLinkClassName = ({ isActive }) =>
  isActive
    ? 'text-orange-400'
    : 'text-neutral-300 transition-colors hover:text-white'

function Navbar() {
  return (
    <header className="border-b border-neutral-800 bg-neutral-950">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="text-lg font-semibold text-white">
          Lorza&apos;s Fitness
        </NavLink>

        <div className="flex items-center gap-6 text-sm font-medium">
          <NavLink to="/" className={getLinkClassName}>
            Qui&eacute;nes Somos
          </NavLink>
          <NavLink to="/activities" className={getLinkClassName}>
            Actividades
          </NavLink>
          <NavLink to="/professors" className={getLinkClassName}>
            Profesores
          </NavLink>
          <NavLink
            to="/management"
            className="rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold text-neutral-950 transition-colors hover:bg-orange-400"
          >
            Gesti&oacute;n
          </NavLink>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
