function TestimonialCard({ name, message, memberType }) {
  return (
    <article className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
      <p className="text-neutral-300">&quot;{message}&quot;</p>
      <div className="mt-5">
        <p className="font-semibold text-white">{name}</p>
        <p className="text-sm text-neutral-400">{memberType}</p>
      </div>
    </article>
  )
}

export default TestimonialCard
