function AboutSection() {
  return (
    <section className="grid gap-6 rounded-3xl border border-neutral-800 bg-neutral-900/60 p-8 md:grid-cols-2 md:p-10">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
          About Us
        </p>
        <h2 className="text-3xl font-bold md:text-4xl">
          A gym community built around care, diversity, and real life.
        </h2>
        <p className="text-neutral-300">
          At Lorza&apos;s Fitness, movement is for everyone. We welcome people
          with different stories, bodies, and levels of experience, without
          judgment.
        </p>
        <p className="text-neutral-300">
          Our approach combines professional guidance, adapted sessions, and a
          supportive environment where progress is sustainable and personal.
        </p>
      </div>

      <div className="flex min-h-72 items-center justify-center rounded-2xl border border-dashed border-neutral-700 bg-neutral-900">
        <p className="text-sm font-medium uppercase tracking-wider text-neutral-500">
          Community Image Placeholder
        </p>
      </div>
    </section>
  )
}

export default AboutSection
