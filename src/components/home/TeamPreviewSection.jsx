import ProfessorPreviewCard from './ProfessorPreviewCard'

function TeamPreviewSection({ featuredProfessors }) {
  return (
    <section
      id="team"
      className="relative left-1/2 right-1/2 ml-[calc(-50vw+7.5px)] mr-[calc(-50vw+7.5px)] w-[calc(100vw-15px)] scroll-mt-24 py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl space-y-14 px-6">
        <div className="mx-auto max-w-4xl space-y-4 text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            Nuestro Equipo
          </h2>
          <p className="text-lg leading-relaxed text-white/65 md:text-xl">
            Profesionales que acompa&ntilde;an cada proceso con escucha,
            adaptaci&oacute;n y respeto
          </p>
        </div>

        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-4">
          {featuredProfessors.map((professor) => (
            <ProfessorPreviewCard
              key={professor.name}
              name={professor.name}
              specialty={professor.specialty}
              experience={professor.experience}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TeamPreviewSection
