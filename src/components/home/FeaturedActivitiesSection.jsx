import ActivityHighlightCard from './ActivityHighlightCard'

function FeaturedActivitiesSection({ featuredActivities }) {
  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
          Featured Activities
        </p>
        <h2 className="text-3xl font-bold md:text-4xl">
          Discover classes that match your training style.
        </h2>
        <p className="max-w-3xl text-neutral-300">
          From strength sessions to mobility-focused classes, each activity is
          guided by professionals and adapted to your level.
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
