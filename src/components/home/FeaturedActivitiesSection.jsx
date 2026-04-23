import ActivityHighlightCard from './ActivityHighlightCard'

function FeaturedActivitiesSection({ featuredActivities }) {
  return (
    <section
      id="activities"
      className="scroll-mt-24 py-16 md:py-24"
    >
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
          {featuredActivities.map((activity) => {
            const day = activity.weekDay || activity.week_day || "Día no definido";
            const start = activity.startHour || activity.start_hour || "00:00";
            const end = activity.endHour || activity.end_hour || "00:00";
            const fullSchedule = `${activity.weekDay} ${activity.startHour} - ${activity.endHour}`;
            return (
              <ActivityHighlightCard
                key={activity.id }
                name={activity.name}
                description={activity.description}
                schedule={fullSchedule}
                image={activity.image}
              />
            );
          })}
        </div>
      </div>
    </section>
  )
}

export default FeaturedActivitiesSection
