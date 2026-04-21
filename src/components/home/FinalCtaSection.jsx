import { Link } from 'react-router-dom'

function FinalCtaSection({ contactInfo }) {
  return (
    <section
      id="cta"
      className="scroll-mt-24 rounded-3xl border border-orange-500/25 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black px-7 py-12 shadow-[0_24px_80px_rgba(0,0,0,0.28)] md:px-12 md:py-14"
    >
      <div className="space-y-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
          Empecemos juntos
        </p>
        <h2 className="max-w-3xl text-3xl font-extrabold leading-tight tracking-normal md:text-5xl">
          Elige un movimiento que cuide tu cuerpo y tu bienestar.
        </h2>
        <p className="max-w-2xl text-base leading-relaxed text-neutral-300 md:text-lg">
          Empieza por la opci&oacute;n que mejor se adapte a ti. Estamos aqu&iacute; para
          guiarte paso a paso, con respeto y claridad.
        </p>

        <div className="flex flex-wrap gap-4">
          <a
            href="#activities"
            className="rounded-[10px] bg-orange-500 px-6 py-3 text-sm font-semibold text-neutral-950 transition-colors hover:bg-orange-400"
          >
            Ver actividades
          </a>
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center rounded-[10px] border border-white/20 bg-white/[0.03] px-6 py-3 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/10"
          >
            Acceso gesti&oacute;n
          </Link>
        </div>
      </div>

      <div className="mt-10 grid gap-3 border-t border-white/10 pt-7 text-sm leading-relaxed text-neutral-300 md:grid-cols-2">
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
