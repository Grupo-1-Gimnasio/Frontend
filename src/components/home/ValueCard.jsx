function ValueCard({ title, description }) {
  return (
    <article className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
      <h3 className="mb-3 text-xl font-semibold text-white">{title}</h3>
      <p className="text-neutral-300">{description}</p>
    </article>
  )
}

export default ValueCard
