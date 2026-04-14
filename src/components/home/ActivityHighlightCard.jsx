function ActivityHighlightCard({ name, level, duration, focus }) {
  return (
    <article className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5">
      <p className="mb-3 inline-flex rounded-full border border-orange-500/40 bg-orange-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-orange-300">
        {level}
      </p>
      <h3 className="text-xl font-semibold text-white">{name}</h3>
      <p className="mt-2 text-neutral-300">{focus}</p>
      <p className="mt-4 text-sm text-neutral-400">{duration}</p>
    </article>
  )
}

export default ActivityHighlightCard
