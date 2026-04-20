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

const focusRingClassName =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6b2c] focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950'

function Footer({ footerLinks, contactInfo }) {
  const isInternalLink = (href) => href.startsWith('/')
  const isExternalLink = (href) => /^https?:\/\//.test(href)

  const contactRows = [
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
    <footer className="relative overflow-hidden rounded-[28px] border border-neutral-800 bg-[linear-gradient(135deg,#0a0a0a_0%,#0e0e0e_45%,#111111_100%)] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-14 top-0 h-52 w-52 rounded-full bg-[#ff6b2c]/12 blur-3xl" />
        <div className="absolute -right-12 bottom-0 h-48 w-48 rounded-full bg-[#ff6b2c]/10 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff6b2c] to-transparent" />
      </div>

      <div className="relative z-10 px-6 py-12 md:px-10 md:py-14">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
          <section className="space-y-8">
            <div className="space-y-4">
              <p className="text-sm font-semibold tracking-[-0.02em]">
                <span className="text-[#ff6b2c]">Lorza&apos;s</span>{' '}
                <span className="text-white">Fitness</span>
              </p>
              <h3 className="max-w-lg text-3xl leading-tight font-semibold tracking-[-0.04em] text-white md:text-[2.35rem]">
                Minimalismo potente para entrenar mejor cada dia.
              </h3>
              <p className="max-w-md text-sm leading-6 text-neutral-300">
                Un espacio cuidado, una metodologia clara y una comunidad que te ayuda
                a sostener el proceso.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/activities"
                className={`inline-flex items-center gap-2 rounded-full bg-[#ff6b2c] px-5 py-2.5 text-sm font-semibold text-neutral-950 transition-colors hover:bg-[#ff7a42] ${focusRingClassName}`}
              >
                Explorar actividades
                <ArrowUpRightIcon className="h-3.5 w-3.5" />
              </Link>
              <a
                href={contactInfo?.email ? `mailto:${contactInfo.email}` : '#'}
                className={`inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900/55 px-5 py-2.5 text-sm font-medium text-neutral-200 transition-colors hover:border-neutral-500 hover:text-white ${focusRingClassName}`}
              >
                Escribenos
                <MailIcon className="h-3.5 w-3.5 text-[#ff6b2c]" />
              </a>
            </div>

            <ul className="grid gap-3 sm:grid-cols-2">
              {contactRows.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      aria-label={`${item.label}: ${item.value}`}
                      target={isExternalLink(item.href) ? '_blank' : undefined}
                      rel={isExternalLink(item.href) ? 'noreferrer noopener' : undefined}
                      className={`group flex h-full items-center gap-3 rounded-2xl border border-neutral-800/80 bg-neutral-900/35 px-4 py-3 text-sm text-neutral-300 transition-colors hover:border-neutral-600 hover:text-white ${focusRingClassName}`}
                    >
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-neutral-700 bg-neutral-950/80">
                        <Icon className="h-3.5 w-3.5 text-[#ff6b2c]" />
                      </span>
                      <span className="truncate">{item.value}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </section>

          <section className="rounded-2xl border border-neutral-800/80 bg-neutral-950/55 p-6 md:p-7">
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-300">
                  Navegacion
                </h3>
                <ul className="space-y-2.5 text-sm text-neutral-400">
                  {footerLinks.navigation.map((item, index) => (
                    <li key={item.label}>
                      {isInternalLink(item.href) ? (
                        <Link
                          to={item.href}
                          className={`group inline-flex items-center gap-2 transition-colors duration-200 hover:text-white ${focusRingClassName}`}
                        >
                          <span className="text-neutral-500">0{index + 1}</span>
                          <span>{item.label}</span>
                          <ArrowUpRightIcon className="h-3.5 w-3.5 text-neutral-500 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-[#ff6b2c]" />
                        </Link>
                      ) : (
                        <a
                          href={item.href}
                          className={`group inline-flex items-center gap-2 transition-colors duration-200 hover:text-white ${focusRingClassName}`}
                        >
                          <span className="text-neutral-500">0{index + 1}</span>
                          <span>{item.label}</span>
                          <ArrowUpRightIcon className="h-3.5 w-3.5 text-neutral-500 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-[#ff6b2c]" />
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-300">
                  Legal
                </h3>
                <ul className="space-y-2.5 text-sm text-neutral-400">
                  {footerLinks.legal.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className={`inline-flex items-center gap-2 transition-colors duration-200 hover:text-white ${focusRingClassName}`}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 border-t border-neutral-800/80 pt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-300">
                Comunidad
              </p>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {footerLinks.community.map((item) => {
                  const Icon = communityIcons[item.label.toLowerCase()] || CalendarIcon

                  return (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        aria-label={`Open ${item.label}`}
                        target={isExternalLink(item.href) ? '_blank' : undefined}
                        rel={isExternalLink(item.href) ? 'noreferrer noopener' : undefined}
                        className={`inline-flex items-center gap-2 rounded-full border border-neutral-700/80 bg-neutral-900/50 px-3.5 py-2 text-sm text-neutral-300 transition-colors hover:border-neutral-500 hover:text-white ${focusRingClassName}`}
                      >
                        <Icon className="h-3.5 w-3.5 text-[#ff6b2c]" />
                        <span>{item.label}</span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          </section>
        </div>
      </div>

      <div className="relative z-10 border-t border-neutral-800/80 px-6 py-4 sm:px-10">
        <div className="grid gap-2 text-xs text-neutral-500 md:grid-cols-3 md:items-center">
          <p className="md:text-left">(c) 2026 Lorza&apos;s Fitness. Todos los derechos reservados.</p>
          <p className="md:text-center">{contactInfo?.schedule || 'Mon-Fri 07:00 - 22:00'}</p>
          <p className="md:text-right">Built for inclusive wellbeing.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
