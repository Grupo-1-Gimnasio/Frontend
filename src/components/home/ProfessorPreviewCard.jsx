function ProfessorPreviewCard({ name, specialty, experience }) {
  const initials = name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <article className="min-h-[300px] rounded-2xl border border-neutral-800 bg-neutral-900/80 p-7 transition duration-200 hover:border-orange-500/40 hover:bg-neutral-900">
      <div className="mb-7 flex h-24 w-24 items-center justify-center rounded-2xl border border-orange-500/20 bg-orange-500/10 text-3xl font-extrabold text-orange-400">
        {initials}
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-2xl font-bold leading-tight text-white">
            {name}
          </h3>
          <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-orange-300">
            {specialty}
          </p>
        </div>

        <p className="text-base leading-relaxed text-white/65">
          {experience}
        </p>
      </div>
    </article>
  )
}

export default ProfessorPreviewCard
