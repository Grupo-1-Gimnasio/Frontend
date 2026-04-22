function TestimonialCard({ name, message, memberType }) {
  return (
    <article role="article" className="flex min-h-[280px] flex-col justify-between rounded-2xl border border-neutral-800 bg-neutral-900/90 p-7 transition duration-200 hover:-translate-y-1 hover:border-orange-500/40 hover:bg-neutral-900 focus-within:ring-2 focus-within:ring-orange-500/60 focus-within:ring-offset-2 focus-within:ring-offset-[#111111] md:p-8">
      <div>
        <span
          aria-hidden="true"
          className="block text-5xl font-bold leading-none text-orange-500"
        >
          &quot;
        </span>
        <p className="mt-6 text-lg leading-8 text-neutral-100">{message}</p>
      </div>

      <div className="mt-8 border-t border-neutral-800 pt-6">
        <p className="text-base font-semibold text-white">{name}</p>
        <p className="mt-1 text-sm leading-6 text-neutral-400">{memberType}</p>
      </div>
    </article>
  )
}

export default TestimonialCard
