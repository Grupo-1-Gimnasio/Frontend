import { NavLink } from 'react-router-dom'
import logoLs from '../../assets/logo-ls.png'

const linkClassName =
  'text-[17px] leading-none font-medium tracking-[-0.02em] text-white transition-colors duration-200 hover:text-orange-200'

function Navbar() {
  return (
    <header className="border-b border-[#1a1a1a] bg-[linear-gradient(90deg,#0c0c0c_0%,#0a0a0a_52%,#090909_100%)]">
      <nav className="mx-auto flex h-[78px] w-full max-w-[1160px] items-center justify-between px-5">
        <NavLink to="/" className="flex items-center gap-2.5">
          <img
            src={logoLs}
            alt="Lorza's Fitness logo"
            className="h-8 w-8 object-contain"
          />
          <p className="whitespace-nowrap text-[18px] leading-none font-semibold tracking-[-0.03em]">
            <span className="text-[#ff6b2c]">Lorza&apos;s</span>{' '}
            <span className="text-white">Fitness</span>
          </p>
        </NavLink>

        <div className="flex items-center gap-8">
          <a href="#about" className={linkClassName}>
            Qui&eacute;nes Somos
          </a>
          <NavLink to="/activities" className={linkClassName}>
            Actividades
          </NavLink>
          <NavLink to="/professors" className={linkClassName}>
            Profesores
          </NavLink>
          <NavLink
            to="/management"
            className="rounded-[12px] bg-[#ff6b2c] px-8 py-[13px] text-[17px] leading-none font-medium tracking-[-0.02em] text-black transition-colors duration-200 hover:bg-[#ff7a42]"
          >
            Gesti&oacute;n
          </NavLink>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
