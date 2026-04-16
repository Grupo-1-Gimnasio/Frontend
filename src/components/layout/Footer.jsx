import { Link } from 'react-router-dom'
import logoLs from '../../assets/logo-ls.png'

function Footer() {
  return (
    <footer className="rounded-3xl border border-neutral-800 bg-neutral-900 px-8 py-10">
      <div className="grid gap-10 lg:grid-cols-3">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img
              src={logoLs}
              alt="Lorza's Fitness logo"
              className="h-10 w-10 object-contain"
            />
            <p className="text-lg font-semibold text-white">Lorza&apos;s Fitness</p>
          </div>
          <p className="max-w-xs text-sm text-neutral-400">
            Tu comunidad inclusiva de bienestar
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-orange-400">
            Navegaci&oacute;n
          </h3>
          <ul className="space-y-3 text-sm text-neutral-300">
            <li>
              <a href="#home" className="transition-colors hover:text-white">
                Inicio
              </a>
            </li>
            <li>
              <a href="#about" className="transition-colors hover:text-white">
                Qui&eacute;nes Somos
              </a>
            </li>
            <li>
              <a
                href="#activities"
                className="transition-colors hover:text-white"
              >
                Actividades
              </a>
            </li>
            <li>
              <a href="#team" className="transition-colors hover:text-white">
                Profesores
              </a>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="transition-colors hover:text-white"
              >
                Gesti&oacute;n
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-orange-400">
            Contacto
          </h3>
          <ul className="space-y-3 text-sm text-neutral-300">
            <li>
              <a
                href="tel:+34600123456"
                className="transition-colors hover:text-white"
              >
                +34 600 123 456
              </a>
            </li>
            <li>
              <a
                href="mailto:hello@lorzasfitness.com"
                className="transition-colors hover:text-white"
              >
                hello@lorzasfitness.com
              </a>
            </li>
            <li className="text-neutral-400">Barcelona, Espa&ntilde;a</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-3 border-t border-neutral-800 pt-6 text-sm text-neutral-400 md:flex-row md:items-center md:justify-between">
        <p>&copy; 2026 Lorza&apos;s Fitness. Todos los derechos reservados.</p>
        <p>Un espacio inclusivo para todas las personas</p>
      </div>
    </footer>
  )
}

export default Footer
