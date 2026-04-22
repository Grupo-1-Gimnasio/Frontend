import TestimonialCard from './TestimonialCard'

function TestimonialsSection({ testimonials }) {
  return (
    <section id="testimonials" className="scroll-mt-24 py-12 md:py-16">
      <div className="mx-auto max-w-3xl space-y-4 text-center px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-white md:text-5xl">
          Voces de Nuestra Comunidad
        </h2>
        <p className="text-lg leading-8 text-neutral-300">
          Historias reales de personas que encontraron su espacio aqu&iacute;
        </p>
      </div>

      <div className="mt-12 grid gap-6 px-6 lg:px-8 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <TestimonialCard
            key={testimonial.name}
            name={testimonial.name}
            message={testimonial.message}
            memberType={testimonial.memberType}
          />
        ))}
      </div>
    </section>
  )
}

export default TestimonialsSection
