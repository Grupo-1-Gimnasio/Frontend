import ProfessorPreviewCard from './ProfessorPreviewCard'

function TeamPreviewSection({ featuredProfessors }) {
  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
          Team Preview
        </p>
        <h2 className="text-3xl font-bold md:text-4xl">
          Meet the people who accompany your process.
        </h2>
        <p className="max-w-3xl text-neutral-300">
          Our team combines technical preparation and empathetic coaching, so
          you can build habits that feel realistic and sustainable.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {featuredProfessors.map((professor) => (
          <ProfessorPreviewCard
            key={professor.name}
            name={professor.name}
            specialty={professor.specialty}
            experience={professor.experience}
          />
        ))}
      </div>
    </section>
  )
}

export default TeamPreviewSection
