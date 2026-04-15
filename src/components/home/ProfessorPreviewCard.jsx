function ProfessorPreviewCard({ name, specialty, experience }) {
  return (
    <article className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
      <div className="mb-4 h-24 rounded-xl bg-neutral-800" />
      <h3 className="text-xl font-semibold text-white">{name}</h3>
      <p className="mt-1 text-sm text-orange-300">{specialty}</p>
      <p className="mt-3 text-sm text-neutral-400">{experience}</p>
    </article>
  )
}

export default ProfessorPreviewCard
