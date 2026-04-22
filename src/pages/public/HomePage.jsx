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
    <div className="space-y-20 md:space-y-24">
      <HeroSection />
      <AboutSection />
      <ValuesSection values={values} />
      <FeaturedActivitiesSection featuredActivities={featuredActivities} />
      <TeamPreviewSection featuredProfessors={featuredProfessors} />
      <TestimonialsSection testimonials={testimonials} />
      <FinalCtaSection contactInfo={contactInfo} />
      <Footer footerLinks={footerLinks} contactInfo={contactInfo} />
    </div>
  )
}

export default HomePage
