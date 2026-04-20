import { Link } from 'react-router-dom'

function ArrowUpRightIcon({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
    >
      <path d="M7 17 17 7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function InstagramIcon({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  )
}

function YoutubeIcon({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
    >
      <path d="M21 9.2a3 3 0 0 0-2.2-2.2C16.9 6.5 12 6.5 12 6.5s-4.9 0-6.8.5A3 3 0 0 0 3 9.2C2.5 11.1 2.5 12 2.5 12s0 .9.5 2.8A3 3 0 0 0 5.2 17c1.9.5 6.8.5 6.8.5s4.9 0 6.8-.5a3 3 0 0 0 2.2-2.2c.5-1.9.5-2.8.5-2.8s0-.9-.5-2.8Z" />
      <path d="m10 9.9 5 2.1-5 2.1v-4.2Z" fill="currentColor" stroke="none" />
    </svg>
  )
}

function CalendarIcon({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
    >
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M8 3v4M16 3v4M3 10h18" strokeLinecap="round" />
      <path d="M8 14h3M13 14h3M8 17h3" strokeLinecap="round" />
    </svg>
  )
}

function MailIcon({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
    >
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PhoneIcon({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
    >
      <path d="M4.7 4.7c.9-.9 2.4-1 3.4-.1l2 1.7a2.3 2.3 0 0 1 .6 2.7L10 11a15 15 0 0 0 3 3l2-1a2.3 2.3 0 0 1 2.7.6l1.7 2c.8 1 1 2.5.1 3.4l-.7.7a4 4 0 0 1-4 1C9.4 19.8 4.2 14.6 3.3 9a4 4 0 0 1 1-4l.4-.3Z" />
    </svg>
  )
}

function MapPinIcon({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
    >
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  )
}

const communityIcons = {
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
  events: CalendarIcon,
}

function Footer({ footerLinks, contactInfo }) {
  const isInternalLink = (href) => href.startsWith('/')
  const isExternalLink = (href) => /^https?:\/\//.test(href)

  const contactItems = [
    contactInfo?.email
      ? {
          label: 'Email',
          href: `mailto:${contactInfo.email}`,
          value: contactInfo.email,
          icon: MailIcon,
        }
      : null,
    contactInfo?.phone
      ? {
          label: 'Telefono',
          href: `tel:${contactInfo.phone.replace(/\s+/g, '')}`,
          value: contactInfo.phone,
          icon: PhoneIcon,
        }
      : null,
    contactInfo?.address
      ? {
          label: 'Direccion',
          href: `https://maps.google.com/?q=${encodeURIComponent(contactInfo.address)}`,
          value: contactInfo.address,
          icon: MapPinIcon,
        }
      : null,
  ].filter(Boolean)

  return (
    <footer className="overflow-hidden rounded-3xl border border-neutral-800 bg-gradient-to-br from-neutral-950 via-neutral-950 to-neutral-900 text-white">
      <div className="border-b border-neutral-800/80 px-6 py-12 md:px-10">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-5">
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

            <ul className="flex flex-wrap gap-2.5">
              {contactItems.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={isExternalLink(item.href) ? '_blank' : undefined}
                      rel={isExternalLink(item.href) ? 'noreferrer noopener' : undefined}
                      className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900/70 px-3 py-1.5 text-xs text-neutral-200 transition-colors hover:border-neutral-500 hover:text-white"
                    >
                      <Icon className="h-3.5 w-3.5 text-[#ff6b2c]" />
                      <span>{item.value}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
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
                        className="group inline-flex items-center gap-2 transition-colors duration-200 hover:text-white"
                      >
                        {item.label}
                        <ArrowUpRightIcon className="h-3.5 w-3.5 text-neutral-500 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-[#ff6b2c]" />
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        className="group inline-flex items-center gap-2 transition-colors duration-200 hover:text-white"
                      >
                        {item.label}
                        <ArrowUpRightIcon className="h-3.5 w-3.5 text-neutral-500 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-[#ff6b2c]" />
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
              <ul className="space-y-2 text-sm text-neutral-400">
                {footerLinks.community.map((item) => {
                  const Icon = communityIcons[item.label.toLowerCase()] || CalendarIcon

                  return (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        target={isExternalLink(item.href) ? '_blank' : undefined}
                        rel={isExternalLink(item.href) ? 'noreferrer noopener' : undefined}
                        className="group inline-flex items-center gap-2 rounded-full border border-neutral-700/80 bg-neutral-900/40 px-3 py-1.5 text-sm transition-colors hover:border-neutral-500 hover:text-white"
                      >
                        <Icon className="h-3.5 w-3.5 text-[#ff6b2c]" />
                        <span>{item.label}</span>
                        <ArrowUpRightIcon className="h-3 w-3 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
                      </a>
                    </li>
                  )
                })}
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
                      className="inline-flex items-center gap-2 transition-colors duration-200 hover:text-white"
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
