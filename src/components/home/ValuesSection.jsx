import ValueCard from './ValueCard'

function ValuesSection({ values }) {
  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
          Our Values
        </p>
        <h2 className="text-3xl font-bold md:text-4xl">
          Centered on wellbeing, respect, and shared progress.
        </h2>
        <p className="max-w-3xl text-neutral-300">
          We believe healthy movement grows when people feel safe, accompanied,
          and free to advance at their own rhythm.
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
