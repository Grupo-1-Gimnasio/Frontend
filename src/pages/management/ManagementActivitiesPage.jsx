import { useEffect, useState } from 'react'
import { getActivities } from '../../services/activitiesService'

function ManagementActivitiesPage() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    getActivities().then((data) => {
      if (!isMounted) {
        return
      }

      setActivities(data)
      setLoading(false)
    })

    return () => {
      isMounted = false
    }
  }, [])

  const totalActivities = activities.length

  if (loading) {
    return (
      <section className="space-y-3">
        <p className="text-sm text-neutral-400">Cargando datos...</p>
      </section>
    )
  }

  return (
    <section
      className="space-y-3"
      aria-label={`Actividades (${totalActivities})`}
    >
      <p className="text-sm font-semibold uppercase tracking-wide text-orange-400">
        Panel de gesti&oacute;n
      </p>
      <h1 className="text-3xl font-bold">Actividades</h1>
      <p className="text-neutral-300">
        P&aacute;gina base lista para la gesti&oacute;n de actividades.
      </p>
      <span className="sr-only">
        Total de actividades mock: {totalActivities}
      </span>
    </section>
  )
}

export default ManagementActivitiesPage
