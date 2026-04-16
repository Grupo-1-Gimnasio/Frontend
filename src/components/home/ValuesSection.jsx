import ValueCard from './ValueCard'

function ValuesSection({ values }) {
  return (
    <section className="mt-24 space-y-8">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6b2c]">
          Our Values
        </p>
        <h2 className="max-w-[900px] text-3xl font-extrabold md:text-4xl lg:text-[3rem]">
          Centered on wellbeing, respect, and shared progress.
        </h2>
        <p className="mt-4 max-w-[600px] text-white/70">
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
