import { Link } from 'react-router-dom'
import logoLs from '../../assets/logo-ls.png'

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

const focusRingClassName =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6b2c] focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950'

const iconButtonClassName =
  'inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900/55 text-neutral-300 transition-colors hover:border-neutral-500 hover:text-white'

const communityIcons = {
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
  events: CalendarIcon,
}

function Footer({ footerLinks, contactInfo }) {
  const isInternalLink = (href) => href.startsWith('/')
  const isExternalLink = (href) => /^https?:\/\//.test(href)
  const isHashLink = (href) => href.startsWith('/#')

  const handleInternalLinkClick = (href) => {
    if (isHashLink(href)) {
      const sectionId = href.replace('/#', '')

      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)

      return
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const contactActions = [
    contactInfo?.email
      ? {
          label: 'Email',
          href: `mailto:${contactInfo.email}`,
          icon: MailIcon,
        }
      : null,
    contactInfo?.phone
      ? {
          label: 'Teléfono',
          href: `tel:${contactInfo.phone.replace(/\s+/g, '')}`,
          icon: PhoneIcon,
        }
      : null,
    contactInfo?.address
      ? {
          label: 'Dirección',
          href: `https://maps.google.com/?q=${encodeURIComponent(contactInfo.address)}`,
          icon: MapPinIcon,
        }
      : null,
  ].filter(Boolean)

  return (
    <footer className="relative overflow-hidden rounded-[30px] border border-neutral-800 bg-[linear-gradient(160deg,#0a0a0a_0%,#0e0e0e_50%,#111111_100%)] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-12 -top-16 h-44 w-44 rounded-full bg-[#ff6b2c]/10 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ff6b2c] to-transparent" />
      </div>

      {/* Franja superior: logo + iconos */}
      <div className="relative z-10 px-6 py-10 md:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src={logoLs}
              alt="Lorza's Fitness logo"
              className="h-8 w-8 object-contain"
            />
            <p className="whitespace-nowrap text-[18px] leading-none font-semibold tracking-[-0.03em]">
              <span className="text-[#ff6b2c]">Lorza&apos;s</span>{' '}
              <span className="text-white">Fitness</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            {contactActions.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  title={item.label}
                  target={isExternalLink(item.href) ? '_blank' : undefined}
                  rel={isExternalLink(item.href) ? 'noreferrer noopener' : undefined}
                  className={`${iconButtonClassName} ${focusRingClassName}`}
                >
                  <Icon className="h-4 w-4 text-[#ff6b2c]" />
                </a>
              )
            })}
            {footerLinks.community.map((item) => {
              const Icon = communityIcons[item.label.toLowerCase()] || CalendarIcon
              return (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  title={item.label}
                  target={isExternalLink(item.href) ? '_blank' : undefined}
                  rel={isExternalLink(item.href) ? 'noreferrer noopener' : undefined}
                  className={`${iconButtonClassName} ${focusRingClassName}`}
                >
                  <Icon className="h-4 w-4 text-[#ff6b2c]" />
                </a>
              )
            })}
          </div>
        </div>
      </div>

      {/* Franja media: navegación + legal */}
      <div className="relative z-10 border-y border-neutral-800/80 px-6 py-5 md:px-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-300">
            {footerLinks.navigation.map((item) => (
              <li key={item.label}>
                {isInternalLink(item.href) ? (
                  <Link
                    to={item.href}
                    onClick={() => handleInternalLinkClick(item.href)}
                    className={`transition-colors hover:text-white ${focusRingClassName}`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    className={`transition-colors hover:text-white ${focusRingClassName}`}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>

          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs uppercase tracking-[0.16em] text-neutral-400">
            {footerLinks.legal.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={`transition-colors hover:text-neutral-200 ${focusRingClassName}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Franja inferior: copyright + frase */}
      <div className="relative z-10 flex flex-col gap-1 px-6 py-4 text-xs text-neutral-500 md:flex-row md:items-center md:justify-between md:px-10">
        <p>© 2026 Lorza&apos;s Fitness. Todos los derechos reservados.</p>
        <p>Un espacio inclusivo y para todos los públicos</p>
      </div>
    </footer>
  )
}

export default Footer
