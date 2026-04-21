import { useState } from 'react'
import { Link } from 'react-router-dom'
import logoLs from '../../assets/logo-ls.png'

const linkClassName =
  'text-[17px] leading-none font-medium tracking-[-0.02em] text-white transition-colors duration-200 hover:text-orange-200'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = () => setIsMenuOpen(false)

  const scrollToTop = () => {
    closeMenu()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (sectionId) => {
    closeMenu()
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <header className="relative z-50 border-b border-[#1a1a1a] bg-[linear-gradient(90deg,#0c0c0c_0%,#0a0a0a_52%,#090909_100%)]">
      <nav className="mx-auto flex h-[78px] w-full max-w-[1160px] items-center justify-between px-5">
        <Link to="/" onClick={scrollToTop} className="flex items-center gap-2.5">
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

        <div className="hidden items-center gap-8 md:flex">
          <Link to="/" onClick={scrollToTop} className={linkClassName}>
            Inicio
          </Link>
          <Link
            to="/#about"
            onClick={() => scrollToSection('about')}
            className={linkClassName}
          >
            Qui&eacute;nes Somos
          </Link>
          <Link
            to="/#activities"
            onClick={() => scrollToSection('activities')}
            className={linkClassName}
          >
            Actividades
          </Link>
          <Link
            to="/#team"
            onClick={() => scrollToSection('team')}
            className={linkClassName}
          >
            Profesores
          </Link>
          <Link
            to="/dashboard"
            onClick={closeMenu}
            className="rounded-[12px] bg-[#ff6b2c] px-8 py-[13px] text-[17px] leading-none font-medium tracking-[-0.02em] text-black transition-colors duration-200 hover:bg-[#ff7a42]"
          >
            Gesti&oacute;n
          </Link>
        </div>

        <button
          type="button"
          aria-label={isMenuOpen ? 'Cerrar menu' : 'Abrir menu'}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-[10px] border border-white/15 bg-[#1a1a1a] text-white shadow-[0_8px_24px_rgba(0,0,0,0.28)] transition hover:border-orange-400/45 hover:bg-[#222] md:hidden"
        >
          <span className="relative h-5 w-5">
            <span
              className={`absolute left-0 top-1 h-0.5 w-5 rounded-full bg-current transition duration-200 ${
                isMenuOpen ? 'translate-y-2 rotate-45' : ''
              }`}
            />
            <span
              className={`absolute left-0 top-2.5 h-0.5 w-5 rounded-full bg-current transition duration-200 ${
                isMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`absolute left-0 top-4 h-0.5 w-5 rounded-full bg-current transition duration-200 ${
                isMenuOpen ? '-translate-y-1.5 -rotate-45' : ''
              }`}
            />
          </span>
        </button>
      </nav>

      <div
        className={`absolute left-0 top-full w-full overflow-hidden border-t border-[#1a1a1a] bg-[#0a0a0a]/98 px-5 shadow-2xl transition-all duration-200 ease-out md:hidden ${
          isMenuOpen
            ? 'max-h-96 py-5 opacity-100'
            : 'pointer-events-none max-h-0 py-0 opacity-0'
        }`}
      >
          <div className="mx-auto flex w-full max-w-[1160px] flex-col gap-4">
            <Link to="/" onClick={scrollToTop} className={linkClassName}>
              Inicio
            </Link>
            <Link
              to="/#about"
              onClick={() => scrollToSection('about')}
              className={linkClassName}
            >
              Qui&eacute;nes Somos
            </Link>
            <Link
              to="/#activities"
              onClick={() => scrollToSection('activities')}
              className={linkClassName}
            >
              Actividades
            </Link>
            <Link
              to="/#team"
              onClick={() => scrollToSection('team')}
              className={linkClassName}
            >
              Profesores
            </Link>
            <Link
              to="/dashboard"
              onClick={closeMenu}
              className="w-fit rounded-[12px] bg-[#ff6b2c] px-8 py-[13px] text-[17px] leading-none font-medium tracking-[-0.02em] text-black transition-colors duration-200 hover:bg-[#ff7a42]"
            >
              Gesti&oacute;n
            </Link>
          </div>
        </div>
    </header>
  )
}

export default Navbar
