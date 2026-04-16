import ActivityHighlightCard from './ActivityHighlightCard'

function FeaturedActivitiesSection({ featuredActivities }) {
  return (
    <section id="activities" className="scroll-mt-24 space-y-8">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
          Actividades destacadas
        </p>
        <h2 className="text-3xl font-bold md:text-4xl">
          Explora sesiones dise&ntilde;adas para mejorar tu salud, movilidad y
          confianza.
        </h2>
        <p className="max-w-3xl text-neutral-300">
          Cada clase est&aacute; guiada por profesionales e incluye opciones para
          adaptar la intensidad, para que todas las personas puedan moverse con
          comodidad.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {featuredActivities.map((activity) => (
          <ActivityHighlightCard
            key={activity.name}
            name={activity.name}
            level={activity.level}
            duration={activity.duration}
            focus={activity.focus}
          />
        ))}
      </div>
    </section>
  )
}

export default FeaturedActivitiesSection
