import ProfessorPreviewCard from './ProfessorPreviewCard'

function TeamPreviewSection({ featuredProfessors }) {
  return (
    <section
      id="team"
      className="scroll-mt-24 py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1360px] space-y-16 px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-5 text-center">
          <h2 className="text-4xl font-extrabold text-white md:text-5xl">
            Nuestro Equipo
          </h2>
          <p className="text-lg leading-relaxed text-white/65 md:text-xl">
            Profesionales diversos comprometidos con tu bienestar
          </p>
        </div>

        <div className="grid gap-9 md:grid-cols-2 lg:grid-cols-4">
          {featuredProfessors.map((professor) => (
            <ProfessorPreviewCard
              key={professor.name}
              name={professor.name}
              specialty={professor.specialty}
              experience={professor.experience}
              image={professor.image}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TeamPreviewSection
