import ProfessorPreviewCard from './ProfessorPreviewCard'

function TeamPreviewSection({ featuredProfessors }) {
  return (
    <section id="team" className="scroll-mt-24 space-y-8">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
          Nuestro equipo
        </p>
        <h2 className="text-3xl font-bold md:text-4xl">
          Conoce a las personas que te acompa&ntilde;an en tu proceso.
        </h2>
        <p className="max-w-3xl text-neutral-300">
          Nuestro equipo combina preparaci&oacute;n t&eacute;cnica y acompa&ntilde;amiento
          emp&aacute;tico para ayudarte a construir h&aacute;bitos realistas y sostenibles.
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
