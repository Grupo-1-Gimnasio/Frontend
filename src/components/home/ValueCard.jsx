const icons = ['♡', '🛡', '👥', '✦']

function ValueCard({ title, description, index }) {
  const icon = icons[index] || '✦'

  return (
    <article role="article" className="min-h-[260px] rounded-2xl border border-neutral-800 bg-neutral-900/80 p-7 transition duration-200 hover:-translate-y-1 hover:border-orange-500/40 hover:bg-neutral-900 focus-within:ring-2 focus-within:ring-orange-500/60 focus-within:ring-offset-2 focus-within:ring-offset-[#111111] md:p-8">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-orange-500/15 bg-orange-500/10 text-[2.2rem] leading-none text-orange-400">
        {icon}
      </div>
      <h3 className="text-2xl font-bold leading-tight text-white">
        {title}
      </h3>
      <p className="mt-5 text-base leading-7 text-white/75">
        {description}
      </p>
    </article>
  )
}

export default ValueCard
