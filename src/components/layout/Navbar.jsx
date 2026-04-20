import { Link } from 'react-router-dom'
import logoLs from '../../assets/logo-ls.png'

const linkClassName =
  'text-[17px] leading-none font-medium tracking-[-0.02em] text-white transition-colors duration-200 hover:text-orange-200'

function Navbar() {
  return (
    <header className="border-b border-[#1a1a1a] bg-[linear-gradient(90deg,#0c0c0c_0%,#0a0a0a_52%,#090909_100%)]">
      <nav className="mx-auto flex h-[78px] w-full max-w-[1160px] items-center justify-between px-5">
        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2.5">
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

        <div className="flex items-center gap-8">
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={linkClassName}>
            Inicio
          </Link>
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={linkClassName}>
            Quiénes Somos
          </Link>
          <Link to="/activities" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={linkClassName}>
            Actividades
          </Link>
          <Link to="/professors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={linkClassName}>
            Profesores
          </Link>
          <Link
            to="/management"
            className="rounded-[12px] bg-[#ff6b2c] px-8 py-[13px] text-[17px] leading-none font-medium tracking-[-0.02em] text-black transition-colors duration-200 hover:bg-[#ff7a42]"
          >
            Gestión
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
