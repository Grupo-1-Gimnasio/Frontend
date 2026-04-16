import { Link } from 'react-router-dom'

function FinalCtaSection({ contactInfo }) {
  return (
    <section className="rounded-3xl border border-orange-500/30 bg-gradient-to-br from-neutral-900 to-neutral-950 px-8 py-12 md:px-12">
      <div className="space-y-5">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
          Empecemos juntos
        </p>
        <h2 className="max-w-3xl text-3xl font-bold leading-tight md:text-5xl">
          Elige un movimiento que cuide tu cuerpo y tu bienestar.
        </h2>
        <p className="max-w-2xl text-neutral-300">
          Empieza por la opci&oacute;n que mejor se adapte a ti. Estamos aqu&iacute; para
          guiarte paso a paso, con respeto y claridad.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            to="/activities"
            className="rounded-md bg-orange-500 px-6 py-3 text-sm font-semibold text-neutral-950 transition-colors hover:bg-orange-400"
          >
            Ver actividades
          </Link>
          <Link
            to="/management"
            className="rounded-md border border-neutral-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-neutral-500"
          >
            Acceso gesti&oacute;n
          </Link>
        </div>
      </div>

      <div className="mt-8 grid gap-3 text-sm text-neutral-300 md:grid-cols-2">
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
