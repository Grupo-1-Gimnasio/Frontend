function ProfessorPreviewCard({ name, specialty, experience, image }) {
  const initials = name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <article className="group">
      <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-orange-500/10">
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

      <div className="space-y-4 pt-5">
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
