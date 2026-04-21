function FinalCtaSection({ contactInfo }) {
  return (
    <section
      id="cta"
      className="scroll-mt-24 py-16 text-center md:py-20"
    >
      <div className="mx-auto max-w-5xl space-y-7">
        <h2 className="text-4xl font-extrabold leading-tight text-white md:text-6xl">
          &Uacute;nete a una comunidad que te{' '}
          <span className="text-orange-500">celebra</span>
        </h2>
        <p className="mx-auto max-w-3xl text-lg leading-8 text-neutral-300 md:text-xl">
          Da el primer paso hacia un bienestar aut&eacute;ntico. Todos los cuerpos,
          todas las personas, todas bienvenidas.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 pt-2 sm:flex-row">
          <a
            href={`mailto:${contactInfo.email}`}
            className="inline-flex min-h-14 w-full items-center justify-center rounded-xl bg-orange-500 px-8 py-4 text-base font-semibold text-neutral-950 transition-colors hover:bg-orange-400 sm:w-auto"
          >
            Cont&aacute;ctanos
          </a>
          <a
            href="/#activities"
            className="inline-flex min-h-14 w-full items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] px-8 py-4 text-base font-semibold text-white transition hover:border-white/25 hover:bg-white/10 sm:w-auto"
          >
            Ver Horarios
          </a>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-4xl flex-col items-center justify-center gap-5 border-t border-white/10 pt-8 text-sm leading-relaxed text-neutral-300 md:flex-row md:flex-wrap">
        <p>
          <span className="font-semibold text-white">Tel&eacute;fono:</span>{' '}
          {contactInfo.phone}
        </p>
        <p>
          <span className="font-semibold text-white">Correo:</span>{' '}
          {contactInfo.email}
        </p>
        <p>
          <span className="font-semibold text-white">Direcci&oacute;n:</span>{' '}
          {contactInfo.address}
        </p>
        <p>
          <span className="font-semibold text-white">Horario:</span>{' '}
          {contactInfo.schedule}
        </p>
      </div>
    </section>
  )
}

export default FinalCtaSection
