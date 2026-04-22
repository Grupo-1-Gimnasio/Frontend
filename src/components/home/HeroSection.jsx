import Button from '../ui/Button'
import heroImage from '../../assets/lorzas-hero.jpg'

function HeroSection() {
  return (
    <section
      id="home"
      className="relative h-screen overflow-hidden border-b border-[#1a1a1a] bg-[#080808]"
    >
      <img
        src={heroImage}
        alt="Inclusive movement session at Lorza's Fitness"
        className="absolute inset-0 h-full w-full object-cover object-[58%_center] brightness-[0.82] saturate-[1.02] drop-shadow-[0_0_24px_rgba(0,0,0,0.18)] md:object-[center_12%]"
      />
      <div className="absolute inset-0 bg-black/42 md:bg-black/32" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/20 to-black/5" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/60 to-transparent" />

      <div className="relative z-10 flex h-screen w-screen items-start px-6 pt-14 sm:pt-12 md:pt-14 lg:pt-16">
        <div className="max-w-[360px] sm:max-w-[720px]">
          <h1
            className="flex max-w-[720px] flex-col gap-1 text-[46px] tracking-normal text-white sm:gap-2 sm:text-[62px] md:gap-3 md:text-[76px]"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}
          >
            <span className="block leading-[0.92] md:leading-[0.88]">
              Tu cuerpo es
            </span>
            <span className="block leading-[0.92] text-[#ff6b2c] md:leading-[0.88]">
              v&aacute;lido.
            </span>
            <span className="block leading-[0.92] md:leading-[0.88]">
              Tu progreso
            </span>
            <span className="block leading-[0.92] text-[#ff6b2c] md:leading-[0.88]">
              tambi&eacute;n.
            </span>
          </h1>

          <p
            className="mt-7 max-w-md text-[17px] font-normal leading-[1.5] tracking-normal text-white/84 md:mt-8 md:text-[19px]"
            style={{ fontFamily: 'var(--font-body, "Plus Jakarta Sans", sans-serif)' }}
          >
            Un espacio seguro donde cada persona es bienvenida. Sin juicios,
            sin presiones, solo comunidad y bienestar aut&eacute;ntico.
          </p>

          <div className="mt-14 flex flex-col gap-4 sm:flex-row sm:flex-wrap md:mt-28 lg:mt-32">
            <Button
              href="#activities"
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
            >
              &Uacute;nete a la Comunidad &rarr;
            </Button>
            <Button
              href="#about"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              Conoce M&aacute;s
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
