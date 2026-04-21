import ValueCard from './ValueCard'

function ValuesSection({ values }) {
  return (
    <section
      id="values"
      className="relative left-1/2 right-1/2 mt-16 ml-[calc(-50vw+7.5px)] mr-[calc(-50vw+7.5px)] w-[calc(100vw-15px)] scroll-mt-24 py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl space-y-14 px-6">
        <div className="mx-auto max-w-4xl space-y-4 text-center">
          <h2 className="text-4xl font-extrabold tracking-normal text-white md:text-5xl">
            Nuestros Valores
          </h2>
          <p className="text-lg leading-relaxed text-white/65 md:text-xl">
            Principios que gu&iacute;an cada aspecto de nuestra comunidad
          </p>
        </div>

        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <ValueCard
              key={value.title}
              title={value.title}
              description={value.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ValuesSection
