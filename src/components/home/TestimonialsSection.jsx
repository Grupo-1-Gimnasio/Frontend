import TestimonialCard from './TestimonialCard'

function TestimonialsSection({ testimonials }) {
  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
          Testimonials
        </p>
        <h2 className="text-3xl font-bold md:text-4xl">
          Voices from people who found a healthier relationship with movement.
        </h2>
        <p className="max-w-3xl text-neutral-300">
          These stories reflect what matters to us: feeling supported, moving
          safely, and enjoying progress without pressure.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
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
