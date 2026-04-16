import ValueCard from './ValueCard'

function ValuesSection({ values }) {
  return (
    <section id="values" className="mt-24 scroll-mt-24 space-y-8">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6b2c]">
          Nuestros valores
        </p>
        <h2 className="max-w-[900px] text-3xl font-extrabold md:text-4xl lg:text-[3rem]">
          Centrados en el bienestar, el respeto y el progreso compartido.
        </h2>
        <p className="mt-4 max-w-[600px] text-white/70">
          Creemos que el movimiento saludable crece cuando las personas se
          sienten seguras, acompa&ntilde;adas y libres para avanzar a su propio
          ritmo.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {values.map((value) => (
          <ValueCard
            key={value.title}
            title={value.title}
            description={value.description}
          />
        ))}
      </div>
    </section>
  )
}

export default ValuesSection
