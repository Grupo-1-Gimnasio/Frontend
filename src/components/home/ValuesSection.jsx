import ValueCard from './ValueCard'

function ValuesSection({ values }) {
  return (
    <section
      id="values"
      className="relative left-1/2 right-1/2 mt-28 ml-[calc(-50vw+7.5px)] mr-[calc(-50vw+7.5px)] w-[calc(100vw-15px)] scroll-mt-24 py-14 md:py-20"
    >
      <div className="mx-auto max-w-7xl space-y-16 px-6">
        <div className="mx-auto max-w-4xl space-y-4 text-center">
          <h2 className="text-5xl font-extrabold tracking-tight text-white md:text-6xl">
            Nuestros Valores
          </h2>
          <p className="text-xl text-white/65 md:text-2xl">
            Principios que gu&iacute;an cada aspecto de nuestra comunidad
          </p>
        </div>

        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
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
