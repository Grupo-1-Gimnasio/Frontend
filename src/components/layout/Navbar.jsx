import { NavLink } from 'react-router-dom'
import logoLs from '../../assets/logo-ls.png'

const getLinkClassName = ({ isActive }) =>
  [
    'text-2xl font-medium tracking-tight transition-colors',
    isActive ? 'text-white' : 'text-neutral-200 hover:text-orange-300',
  ].join(' ')

function Navbar() {
  return (
    <header className="border-b border-neutral-900 bg-[linear-gradient(90deg,#07090d_0%,#0b1018_48%,#07090d_100%)]">
      <nav className="mx-auto flex h-20 w-full max-w-[1280px] items-center justify-between px-6">
        <NavLink to="/" className="flex items-center gap-3">
          <img
            src={logoLs}
            alt="Lorza's Fitness logo"
            className="h-12 w-12 rounded-lg object-cover"
          />
          <p className="text-2xl font-semibold tracking-tight">
            <span className="text-orange-500">Lorza&apos;s</span>{' '}
            <span className="text-white">Fitness</span>
          </p>
        </NavLink>

        <div className="flex items-center gap-8">
          <NavLink to="/" className={getLinkClassName}>
            Quiénes Somos
          </NavLink>
          <NavLink to="/activities" className={getLinkClassName}>
            Actividades
          </NavLink>
          <NavLink to="/professors" className={getLinkClassName}>
            Profesores
          </NavLink>
          <NavLink
            to="/management"
            className="rounded-xl bg-orange-500 px-8 py-2.5 text-2xl font-medium tracking-tight text-neutral-950 transition-colors hover:bg-orange-400"
          >
            Gestión
          </NavLink>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
