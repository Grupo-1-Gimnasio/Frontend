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

import Button from '../ui/Button'

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

function FinalCtaSection({ contactInfo }) {
  return (
    <section
      id="cta"
      className="scroll-mt-24 py-16 text-center md:py-24"
    >
      <div className="mx-auto max-w-5xl space-y-6">
        <h2 className="text-4xl font-extrabold leading-tight text-white md:text-6xl">
          &Uacute;nete a una comunidad que te{' '}
          <span className="block text-orange-500">celebra</span>
        </h2>
        <p className="mx-auto max-w-3xl text-lg leading-8 text-neutral-300 md:text-xl">
          Da el primer paso hacia un bienestar aut&eacute;ntico. Todos los cuerpos,
          todas las personas, todas bienvenidas.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 pt-3 sm:flex-row">
          <Button
            href={`mailto:${contactInfo.email}`}
            variant="primary"
            size="lg"
            className="w-full sm:w-auto"
          >
            Cont&aacute;ctanos
          </Button>
          <Button
            href="#activities"
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto"
          >
            Ver Horarios
          </Button>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-4xl flex-col items-center justify-center gap-5 text-base leading-relaxed text-neutral-300 md:flex-row md:flex-wrap md:gap-10">
        <a
          href={`mailto:${contactInfo.email}`}
          className="inline-flex items-center gap-3 transition-colors hover:text-white"
        >
          <MailIcon className="h-5 w-5 text-neutral-400" />
          <span>{contactInfo.email}</span>
        </a>
        <a
          href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`}
          className="inline-flex items-center gap-3 transition-colors hover:text-white"
        >
          <PhoneIcon className="h-5 w-5 text-neutral-400" />
          <span>{contactInfo.phone}</span>
        </a>
        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(contactInfo.address)}`}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-3 transition-colors hover:text-white"
        >
          <MapPinIcon className="h-5 w-5 text-neutral-400" />
          <span>{contactInfo.address}</span>
        </a>
      </div>
    </section>
  )
}

export default FinalCtaSection
