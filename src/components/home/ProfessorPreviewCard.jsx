function ProfessorPreviewCard({ name, specialty, experience }) {
  const initials = name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <article className="min-h-[310px] rounded-2xl border border-neutral-800 bg-neutral-900/80 p-7 transition duration-200 hover:-translate-y-1 hover:border-orange-500/40 hover:bg-neutral-900">
      <div className="mb-7 flex items-center gap-4">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-orange-500/20 bg-orange-500/10 text-2xl font-extrabold text-orange-400">
          {initials}
        </div>
        <span className="rounded-full border border-neutral-700 bg-neutral-950 px-3 py-1 text-xs font-semibold uppercase tracking-normal text-neutral-300">
          Equipo
        </span>
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
