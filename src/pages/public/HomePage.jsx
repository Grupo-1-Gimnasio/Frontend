import AboutSection from '../../components/home/AboutSection'
import FeaturedActivitiesSection from '../../components/home/FeaturedActivitiesSection'
import FinalCtaSection from '../../components/home/FinalCtaSection'
import HeroSection from '../../components/home/HeroSection'
import TeamPreviewSection from '../../components/home/TeamPreviewSection'
import TestimonialsSection from '../../components/home/TestimonialsSection'
import ValuesSection from '../../components/home/ValuesSection'
import Footer from '../../components/layout/Footer'
import {
  contactInfo,
  featuredActivities,
  featuredProfessors,
  footerLinks,
  testimonials,
  values,
} from '../../data/homeContent'

function HomePage() {
  return (
    <div className="space-y-16">
      <div className="relative left-1/2 right-1/2 -mt-10 ml-[-50vw] mr-[-50vw] w-screen">
        <HeroSection />
      </div>
      <AboutSection />
      <ValuesSection values={values} />
      <FeaturedActivitiesSection featuredActivities={featuredActivities} />
      <TeamPreviewSection featuredProfessors={featuredProfessors} />
      <TestimonialsSection testimonials={testimonials} />
      <FinalCtaSection contactInfo={contactInfo} />
      <Footer footerLinks={footerLinks} />
    </div>
  )
}

export default HomePage
