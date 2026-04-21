const icons = ['♡', '🛡', '👥', '✦']

function ValueCard({ title, description, index }) {
  const icon = icons[index] || '✦'

  return (
    <article className="min-h-[270px] rounded-2xl border border-neutral-800 bg-neutral-900/80 p-7 transition duration-200 hover:border-orange-500/40 hover:bg-neutral-900 md:p-8">
      <div className="mb-6 flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-orange-500/10 text-[2.25rem] leading-none text-orange-400">
        {icon}
      </div>
      <h3 className="text-2xl font-bold leading-tight text-white">
        {title}
      </h3>
      <p className="mt-5 text-base leading-relaxed text-white/65">
        {description}
      </p>
    </article>
  )
}

export default ValueCard
