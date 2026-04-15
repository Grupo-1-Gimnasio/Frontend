import { Link } from 'react-router-dom'

function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900 px-8 py-14 md:px-12 md:py-20">
      <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-orange-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-52 w-52 rounded-full bg-orange-400/10 blur-3xl" />

      <div className="relative z-10 max-w-3xl space-y-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
          Lorza&apos;s Fitness
        </p>
        <h1 className="text-4xl font-bold leading-tight md:text-6xl">
          Move at your own pace in a welcoming and accessible space.
        </h1>
        <p className="max-w-2xl text-base text-neutral-300 md:text-lg">
          We support your wellbeing with guided movement, respectful coaching,
          and routines adapted to different bodies, moments, and goals.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            to="/activities"
            className="rounded-md bg-orange-500 px-6 py-3 text-sm font-semibold text-neutral-950 transition-colors hover:bg-orange-400"
          >
            Discover Activities
          </Link>
          <Link
            to="/professors"
            className="rounded-md border border-neutral-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-neutral-500"
          >
            Meet Our Team
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
