import ActivityHighlightCard from './ActivityHighlightCard'

function FeaturedActivitiesSection({ featuredActivities }) {
  return (
    <section
      id="activities"
      className="relative left-1/2 right-1/2 ml-[calc(-50vw+7.5px)] mr-[calc(-50vw+7.5px)] w-[calc(100vw-15px)] scroll-mt-24 py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl space-y-14 px-6">
        <div className="mx-auto max-w-4xl space-y-4 text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            Actividades para Todos
          </h2>
          <p className="text-lg leading-relaxed text-white/65 md:text-xl">
            Encuentra el movimiento que resuena contigo, sin importar tu nivel o
            experiencia
          </p>
        </div>

        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {featuredActivities.map((activity) => (
            <ActivityHighlightCard
              key={activity.name}
              name={activity.name}
              description={activity.description}
              schedule={activity.schedule}
              image={activity.image}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedActivitiesSection
