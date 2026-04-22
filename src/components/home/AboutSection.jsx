import Button from '../ui/Button'
import aboutImage from '../../assets/lorzas13.jpg'

function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-24 bg-[#12110f] py-12 md:py-16 lg:py-20"
    >
      <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-24">
          <div className="max-w-[640px]">
            <h2
              className="flex flex-col text-[2rem] font-extrabold leading-[0.96] tracking-[-0.04em] text-white sm:text-[2.5rem] md:text-[3rem] lg:text-[3.45rem]"
              style={{
                fontFamily: 'var(--font-display, "Outfit", sans-serif)',
              }}
            >
              <span className="sm:whitespace-nowrap">
                Fitness inclusivo para
              </span>
              <span className="text-[#ff6b2c]">todas las personas</span>
            </h2>

            <div
              className="mt-8 max-w-[640px] space-y-5 text-base leading-[1.8] tracking-[-0.01em] text-white/80 sm:text-[1.1rem]"
              style={{
                fontFamily:
                  'var(--font-body, "Plus Jakarta Sans", sans-serif)',
              }}
            >
              <p>
                En Lorza&apos;s Fitness creemos que el bienestar es un derecho,
                no un privilegio. Nuestro espacio est&aacute; dise&ntilde;ado para
                celebrar la diversidad de cuerpos, habilidades y experiencias.
              </p>
              <p>
                Nos comprometemos a crear un ambiente donde puedas moverte,
                crecer y conectar sin miedo al juicio. Aqu&iacute; encontrar&aacute;s
                una comunidad aut&eacute;ntica que te apoya en tu camino &uacute;nico
                hacia la salud.
              </p>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-sm leading-6 text-white/80">
                Sesiones adaptadas, comunidad segura y soporte profesional.
              </div>
              <Button
                href="#activities"
                variant="ghost"
                size="md"
                className="w-full sm:w-auto"
              >
                Ver actividades
              </Button>
            </div>
          </div>

          <div className="bg-[#12110f] lg:justify-self-end">
            <img
              src={aboutImage}
              alt="Comunidad de Lorza's Fitness compartiendo un entrenamiento inclusivo"
              className="h-auto w-full rounded-[24px] bg-[#12110f] object-cover object-[50%_20%]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
