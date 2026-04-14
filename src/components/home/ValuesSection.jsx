import ValueCard from './ValueCard'

function ValuesSection({ values }) {
  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
          Our Values
        </p>
        <h2 className="text-3xl font-bold md:text-4xl">
          Built around people, progress, and consistency.
        </h2>
        <p className="max-w-3xl text-neutral-300">
          We create an environment where everyone can train with clarity,
          confidence, and long-term support.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {values.map((value) => (
          <ValueCard
            key={value.title}
            title={value.title}
            description={value.description}
          />
        ))}
      </div>
    </section>
  )
}

export default ValuesSection
