import { Link } from 'react-router-dom'

function Footer({ footerLinks }) {
  const isInternalLink = (href) => href.startsWith('/')

  return (
    <footer className="bg-neutral-950 text-white">
      {/* Main footer content */}
      <div className="mx-auto max-w-[1160px] px-5 py-12">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand section */}
          <div className="space-y-3">
            <div>
              <p className="text-sm font-semibold tracking-[-0.02em]">
                <span className="text-[#ff6b2c]">Lorza&apos;s</span>{' '}
                <span className="text-white">Fitness</span>
              </p>
            </div>
            <p className="text-xs leading-6 text-neutral-400">
              A community for inclusive movement, sustainable wellbeing, and shared care.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-neutral-300">
              Navegación
            </h3>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              {footerLinks.navigation.map((item) => (
                <li key={item.label}>
                  {isInternalLink(item.href) ? (
                    <Link
                      to={item.href}
                      className="transition-colors duration-200 hover:text-white"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      className="transition-colors duration-200 hover:text-white"
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-neutral-300">
              Comunidad
            </h3>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              {footerLinks.community.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="transition-colors duration-200 hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-neutral-300">
              Legal
            </h3>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              {footerLinks.legal.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="transition-colors duration-200 hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-neutral-900 bg-neutral-950">
        <div className="mx-auto flex max-w-[1160px] items-center justify-between px-5 py-3 text-xs text-neutral-500">
          <p>© 2026 Lorza&apos;s Fitness. Todos los derechos reservados.</p>
          <p>Crafted with care</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
