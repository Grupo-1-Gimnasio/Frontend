function ProfessorPreviewCard({ name, specialty, experience, image }) {
  const initials = name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <article className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/85 transition duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:bg-neutral-900/95">
      <div className="aspect-[3/4] overflow-hidden rounded-t-2xl bg-orange-500/10">
        {image ? (
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-5xl font-extrabold text-orange-400">
            {initials}
          </div>
        )}
      </div>

      <div className="space-y-4 p-6">
        <div>
          <h3 className="text-2xl font-bold leading-tight text-white">
            {name}
          </h3>
          <p className="mt-2 text-lg font-semibold leading-snug text-orange-500">
            {specialty}
          </p>
        </div>

        <p className="text-base leading-relaxed text-neutral-300">
          {experience}
        </p>
      </div>
    </article>
  )
}

export default ProfessorPreviewCard
