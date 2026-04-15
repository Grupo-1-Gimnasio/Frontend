import { Link } from 'react-router-dom'

function FinalCtaSection({ contactInfo }) {
  return (
    <section className="rounded-3xl border border-orange-500/30 bg-gradient-to-br from-neutral-900 to-neutral-950 px-8 py-12 md:px-12">
      <div className="space-y-5">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
          Let&apos;s begin together
        </p>
        <h2 className="max-w-3xl text-3xl font-bold leading-tight md:text-5xl">
          Choose movement that cares for your body and your wellbeing.
        </h2>
        <p className="max-w-2xl text-neutral-300">
          Start with the option that feels right for you. We are here to guide
          your process step by step, with respect and clarity.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            to="/activities"
            className="rounded-md bg-orange-500 px-6 py-3 text-sm font-semibold text-neutral-950 transition-colors hover:bg-orange-400"
          >
            View Activities
          </Link>
          <Link
            to="/management"
            className="rounded-md border border-neutral-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-neutral-500"
          >
            Access Management
          </Link>
        </div>
      </div>

      <div className="mt-8 grid gap-3 text-sm text-neutral-300 md:grid-cols-2">
        <p>
          <span className="font-semibold text-white">Phone:</span>{' '}
          {contactInfo.phone}
        </p>
        <p>
          <span className="font-semibold text-white">Email:</span>{' '}
          {contactInfo.email}
        </p>
        <p>
          <span className="font-semibold text-white">Address:</span>{' '}
          {contactInfo.address}
        </p>
        <p>
          <span className="font-semibold text-white">Hours:</span>{' '}
          {contactInfo.schedule}
        </p>
      </div>
    </section>
  )
}

export default FinalCtaSection
