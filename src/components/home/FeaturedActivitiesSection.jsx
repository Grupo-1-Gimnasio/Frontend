import ActivityHighlightCard from './ActivityHighlightCard'

function FeaturedActivitiesSection({ featuredActivities = [] }) {
  return (
    <section id="activities" className="scroll-mt-24 py-16 md:py-24">
      <div className="mx-auto max-w-7xl space-y-14 px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-4 text-center">
          <h2 className="text-4xl font-extrabold tracking-normal text-white md:text-5xl">
            Actividades para Todos
          </h2>
          <p className="text-lg leading-relaxed text-white/65 md:text-xl">
            Encuentra el movimiento que resuena contigo, sin importar tu nivel o
            experiencia
          </p>
        </div>

        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {featuredActivities.length === 0 ? (
            <div className="col-span-full rounded-2xl border border-dashed border-white/15 bg-white/5 p-8 text-center text-white/70">
              No hay actividades destacadas para mostrar ahora mismo.
            </div>
          ) : (
            featuredActivities.map((activity) => {
              const day = activity.weekDay ?? activity.week_day ?? 'Día'
              const start = (activity.startHour ?? activity.start_hour ?? '00:00:00').substring(0, 5)
              const end = (activity.endHour ?? activity.end_hour ?? '00:00:00').substring(0, 5)
              const fullSchedule = `${day} ${start} - ${end}`

              return (
                <ActivityHighlightCard
                  key={activity.id}
                  title={activity.title}
                  description={
                    activity.description ||
                    'Actividad guiada por profesionales, adaptada a distintos niveles.'
                  }
                  schedule={fullSchedule}
                  image={activity.image}
                />
              )
            })
          )}
        </div>
      </div>
    </section>
  )
}

export default FeaturedActivitiesSection
