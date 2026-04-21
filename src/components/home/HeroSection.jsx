import { Link } from 'react-router-dom'
import heroImage from '../../assets/lorzas-hero.jpg'

function HeroSection() {
  const scrollToSection = (sectionId) => {
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <section
      id="home"
      className="relative h-screen overflow-hidden border-b border-[#1a1a1a] bg-[#080808]"
    >
      <img
        src={heroImage}
        alt="Inclusive movement session at Lorza's Fitness"
        className="absolute inset-0 h-full w-full object-cover object-[center_12%] brightness-[0.82] saturate-[1.02] drop-shadow-[0_0_24px_rgba(0,0,0,0.18)]"
      />
      <div className="absolute inset-0 bg-black/32" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/60 to-transparent" />

      <div className="relative z-10 mx-auto flex h-screen w-full max-w-[1160px] items-start px-6 pt-12 md:pt-14 lg:pt-16">
        <div className="max-w-[720px]">
          <h1
            className="flex max-w-[720px] flex-col gap-2 text-[72px] tracking-[-0.04em] text-white md:gap-3 md:text-[96px]"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}
          >
            <span className="block leading-[0.88]">Tu cuerpo es</span>
            <span className="block leading-[0.88] text-[#ff6b2c]">v&aacute;lido.</span>
            <span className="block leading-[0.88]">Tu progreso</span>
            <span className="block leading-[0.88] text-[#ff6b2c]">tambi&eacute;n.</span>
          </h1>

          <p
            className="mt-8 max-w-md text-[18px] font-normal leading-[1.42] tracking-[-0.018em] text-white/82 md:text-[19px]"
            style={{ fontFamily: 'var(--font-body, "Plus Jakarta Sans", sans-serif)' }}
          >
            Un espacio seguro donde cada persona es bienvenida. Sin juicios,
            sin presiones, solo comunidad y bienestar aut&eacute;ntico.
          </p>

          <div className="mt-24 flex flex-wrap gap-4 md:mt-28 lg:mt-32">
            <Link
              to="/#activities"
              onClick={() => scrollToSection('activities')}
              className="rounded-[10px] bg-[#ff6b2c] px-9 py-5 text-[18px] font-semibold tracking-[-0.03em] text-black transition-colors duration-200 hover:bg-[#ff7a42]"
              style={{ fontFamily: 'var(--font-display, "Outfit", sans-serif)' }}
            >
              &Uacute;nete a la Comunidad &rarr;
            </Link>
            <Link
              to="/#about"
              onClick={() => scrollToSection('about')}
              className="rounded-[10px] border border-white/10 bg-[#212123]/92 px-9 py-5 text-[18px] font-semibold tracking-[-0.03em] text-white transition-colors duration-200 hover:border-white/20 hover:bg-[#2a2a2d]"
              style={{ fontFamily: 'var(--font-display, "Outfit", sans-serif)' }}
            >
              Conoce M&aacute;s
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
