import { Link } from 'react-router-dom'

function Footer({ footerLinks }) {
  const isInternalLink = (href) => href.startsWith('/')

  return (
    <footer className="overflow-hidden rounded-3xl border border-neutral-800 bg-gradient-to-br from-neutral-950 via-neutral-950 to-neutral-900 text-white">
      <div className="border-b border-neutral-800/80 px-6 py-12 md:px-10">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-5">
            <p className="text-sm font-semibold tracking-[-0.02em]">
              <span className="text-[#ff6b2c]">Lorza&apos;s</span>{' '}
              <span className="text-white">Fitness</span>
            </p>
            <h3 className="max-w-sm text-2xl leading-tight font-semibold tracking-[-0.03em] text-white">
              Movimiento con acompanamiento profesional y cercano.
            </h3>
            <p className="max-w-md text-sm leading-6 text-neutral-300">
              Construimos una experiencia de entrenamiento respetuosa, sostenible y
              adaptada a cada persona.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3 lg:col-span-7">
            <div>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-300">
                Navegacion
              </h3>
              <ul className="space-y-2.5 text-sm text-neutral-400">
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

            <div>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-300">
                Comunidad
              </h3>
              <ul className="space-y-2.5 text-sm text-neutral-400">
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

            <div>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-300">
                Legal
              </h3>
              <ul className="space-y-2.5 text-sm text-neutral-400">
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
      </div>

      <div className="flex flex-col gap-2 px-6 py-4 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <p>(c) 2026 Lorza&apos;s Fitness. Todos los derechos reservados.</p>
        <p>Built for inclusive wellbeing.</p>
      </div>
    </footer>
  )
}

export default Footer
