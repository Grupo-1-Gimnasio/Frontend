import { useEffect, useState } from 'react'
import AboutSection from '../../components/home/AboutSection'
import FeaturedActivitiesSection from '../../components/home/FeaturedActivitiesSection'
import FinalCtaSection from '../../components/home/FinalCtaSection'
import HeroSection from '../../components/home/HeroSection'
import TeamPreviewSection from '../../components/home/TeamPreviewSection'
import TestimonialsSection from '../../components/home/TestimonialsSection'
import ValuesSection from '../../components/home/ValuesSection'
import Footer from '../../components/layout/Footer'
import { getActivities } from '../../services/activitiesService'
import { getProfessors } from '../../services/professorsService'
import {
  contactInfo,
  footerLinks,
  testimonials,
  values,
} from '../../data/homeContent'

function HomePage() {
  const [featuredActivities, setFeaturedActivities] = useState([])
  const [featuredProfessors, setFeaturedProfessors] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let isMounted = true

    Promise.allSettled([getActivities(), getProfessors()])
      .then(([activitiesResult, professorsResult]) => {
        if (!isMounted) {
          return
        }

        if (activitiesResult.status === 'fulfilled') {
          setFeaturedActivities(
            Array.isArray(activitiesResult.value) ? activitiesResult.value : []
          )
        } else {
          setFeaturedActivities([])
        }

        if (professorsResult.status === 'fulfilled') {
          setFeaturedProfessors(
            Array.isArray(professorsResult.value) ? professorsResult.value : []
          )
        } else {
          setFeaturedProfessors([])
        }

        if (
          activitiesResult.status === 'rejected' ||
          professorsResult.status === 'rejected'
        ) {
          setErrorMessage('No se pudieron cargar todos los datos de inicio.')
          return
        }

        setErrorMessage('')
      })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="space-y-20 md:space-y-24">
      <HeroSection />
      <AboutSection />
      <ValuesSection values={values} />
      {errorMessage ? (
        <p className="mx-auto max-w-7xl rounded-xl border border-red-400/30 bg-red-500/10 px-6 py-3 text-sm text-red-200">
          {errorMessage}
        </p>
      ) : null}
      <FeaturedActivitiesSection featuredActivities={featuredActivities} />
      <TeamPreviewSection featuredProfessors={featuredProfessors} />
      <TestimonialsSection testimonials={testimonials} />
      <FinalCtaSection contactInfo={contactInfo} />
      <Footer footerLinks={footerLinks} contactInfo={contactInfo} />
    </div>
  )
}

export default HomePage
