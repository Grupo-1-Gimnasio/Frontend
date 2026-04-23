import Button from '../ui/Button'

function FinalCtaSection({ contactInfo }) {
  return (
    <section
      id="cta"
      className="scroll-mt-24 py-16 text-center md:py-24"
    >
      <div className="mx-auto max-w-5xl space-y-6">
        <h2 className="text-4xl font-extrabold leading-tight text-white md:text-6xl">
          &Uacute;nete a una comunidad que te{' '}
          <span className="block text-orange-500">celebra</span>
        </h2>
        <p className="mx-auto max-w-3xl text-lg leading-8 text-neutral-300 md:text-xl">
          Da el primer paso hacia un bienestar aut&eacute;ntico. Todos los cuerpos,
          todas las personas, todas bienvenidas.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 pt-3 sm:flex-row">
          <Button
            href={`mailto:${contactInfo.email}`}
            variant="primary"
            size="lg"
            className="w-full sm:w-auto"
          >
            Cont&aacute;ctanos
          </Button>
          <Button
            href="#activities"
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto"
          >
            Ver Horarios
          </Button>
        </div>
      </div>
    </section>
  )
}

export default FinalCtaSection
