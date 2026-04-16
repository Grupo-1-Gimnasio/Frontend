import { Link } from 'react-router-dom'

function Footer({ footerLinks, contactInfo }) {
  const isInternalLink = (href) => href.startsWith('/')

  return (
    <footer className="rounded-3xl border border-neutral-800 bg-neutral-900 px-8 py-10">
      <div className="grid gap-10 lg:grid-cols-[1.9fr_1fr_1fr]">
        <div className="space-y-6">
          <div className="max-w-sm space-y-4">
            <p className="text-lg font-semibold text-white">Lorza&apos;s Fitness</p>
            <p className="text-sm leading-7 text-neutral-400">
              A community for inclusive movement, sustainable wellbeing, and shared care.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl border border-neutral-800 bg-neutral-950/50 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-neutral-500">Contacto</p>
              <dl className="mt-4 space-y-3 text-sm text-neutral-300">
                <div className="flex gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-300">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.76 19.76 0 0 1 3.1 5.18 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.72 12.14 12.14 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L9.2 10.8a16 16 0 0 0 6 6l1.16-1.16a2 2 0 0 1 2.11-.45 12.14 12.14 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
                    </svg>
                  </span>
                  <div>
                    <dt className="font-medium text-white">Teléfono</dt>
                    <dd>{contactInfo?.phone}</dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-300">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                      <path d="M4 4h16v16H4z" />
                      <path d="m22 6-10 7L2 6" />
                    </svg>
                  </span>
                  <div>
                    <dt className="font-medium text-white">Email</dt>
                    <dd>{contactInfo?.email}</dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-300">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                      <path d="M12 2.5c4.4 0 8 3.6 8 8 0 6.4-8 11.5-8 11.5S4 16.9 4 10.5c0-4.4 3.6-8 8-8Z" />
                      <circle cx="12" cy="10.5" r="2" />
                    </svg>
                  </span>
                  <div>
                    <dt className="font-medium text-white">Ubicación</dt>
                    <dd>{contactInfo?.address}</dd>
                  </div>
                </div>
              </dl>
            </div>

            <div className="rounded-3xl border border-neutral-800 bg-neutral-950/50 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-neutral-500">Horario</p>
              <p className="mt-4 text-sm leading-7 text-neutral-300">{contactInfo?.schedule}</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-orange-400">
            Navegación
          </h3>
          <ul className="space-y-2 text-sm text-neutral-300">
            {footerLinks.navigation.map((item) => (
              <li key={item.label}>
                {isInternalLink(item.href) ? (
                  <Link to={item.href} className="hover:text-white">
                    {item.label}
                  </Link>
                ) : (
                  <a href={item.href} className="hover:text-white">
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-orange-400">
              Comunidad
            </h3>
            <ul className="space-y-2 text-sm text-neutral-300">
              {footerLinks.community.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="hover:text-white">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-orange-400">
              Legal
            </h3>
            <ul className="space-y-2 text-sm text-neutral-300">
              {footerLinks.legal.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="hover:text-white">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-neutral-800 pt-6 text-sm text-neutral-500 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Lorza&apos;s Fitness. Todos los derechos reservados.</p>
        <p className="text-neutral-400">Minimal, moderno y profesional con la paleta actual.</p>
      </div>
    </footer>
  )
}

export default Footer
