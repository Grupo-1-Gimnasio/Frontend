import TestimonialCard from './TestimonialCard'

function TestimonialsSection({ testimonials }) {
  return (
    <section id="testimonials" className="scroll-mt-24 bg-gradient-to-b from-transparent via-[#ff6b2c]/5 to-transparent py-12 md:py-16">
      <div className="mx-auto max-w-3xl space-y-4 text-center px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-white md:text-5xl">
          Voces de Nuestra Comunidad
        </h2>
        <p className="text-lg leading-8 text-neutral-300">
          Historias reales de personas que encontraron su espacio aqu&iacute;
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-[1240px] justify-items-center gap-6 px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {testimonials.map((testimonial) => (
          <TestimonialCard
            key={testimonial.image}
            image={testimonial.image}
            alt={testimonial.alt}
          />
        ))}
      </div>
    </section>
  )
}

export default TestimonialsSection
