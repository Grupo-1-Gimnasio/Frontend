function ActivityHighlightCard({ name, description, schedule, image }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 transition duration-200 hover:-translate-y-1 hover:border-orange-500/40 hover:bg-neutral-900/90">
      <div className="relative h-56 overflow-hidden bg-neutral-800 md:h-60">
        {image ? (
          <img
            src={image}
            alt={`Imagen de ${name}`}
            className="h-full w-full object-cover transition duration-300 hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-neutral-800 text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Actividad
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/22 to-black/72" />
      </div>

      <div className="space-y-5 p-7 md:p-8">
        <div className="space-y-3">
          <h3 className="text-3xl font-bold leading-tight text-white">
            {name}
          </h3>
          <p className="text-base leading-7 text-white/75">
            {description}
          </p>
        </div>

        <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-orange-400">
          <span className="h-2 w-2 rounded-full bg-orange-400" />
          {schedule}
        </p>
      </div>
    </article>
  )
}

export default ActivityHighlightCard
