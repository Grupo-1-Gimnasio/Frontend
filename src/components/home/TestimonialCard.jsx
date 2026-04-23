function TestimonialCard({ image, alt }) {
  return (
    <article
      role="article"
      className="mx-auto aspect-[2/3] w-full max-w-[320px] overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/90 transition duration-200 hover:-translate-y-1 hover:border-orange-500 hover:bg-neutral-900 focus-within:ring-2 focus-within:ring-orange-500/60 focus-within:ring-offset-2 focus-within:ring-offset-[#111111]"
    >
      <img
        src={image}
        alt={alt}
        loading="lazy"
        className="block h-full w-full object-cover"
      />
    </article>
  )
}

export default TestimonialCard
