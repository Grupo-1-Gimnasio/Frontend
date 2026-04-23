import { useEffect, useState } from 'react'
import { getDashboardData } from '../../services/dashboardService'

function ManagementDashboardPage() {
  const [kpiCards, setKpiCards] = useState([])
  const [recentActivity, setRecentActivity] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    getDashboardData().then((data) => {
      if (!isMounted) {
        return
      }

      setKpiCards(data.kpiCards)
      setRecentActivity(data.recentActivity)
      setLoading(false)
    })

    return () => {
      isMounted = false
    }
  }, [])

  if (loading) {
    return (
      <section className="space-y-3">
        <p className="text-sm text-neutral-400">Cargando datos...</p>
      </section>
    )
  }

  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-orange-400">
          Panel de gesti&oacute;n
        </p>
        <h1 className="text-3xl font-bold">Panel de control</h1>
        <p className="text-neutral-300">
          Panel principal para la gesti&oacute;n de usuarios, actividades y
          profesores.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpiCards.map((card) => (
          <article
            key={card.label}
            className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5"
          >
            <p className="text-sm text-neutral-400">{card.label}</p>
            <p className="mt-3 text-3xl font-bold text-white">{card.value}</p>
          </article>
        ))}
      </div>

      <article className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5">
        <h2 className="text-xl font-semibold text-white">Actividad reciente</h2>
        <ul className="mt-5 grid gap-3 lg:grid-cols-2">
          {recentActivity.map((item) => (
            <li
              key={item.id}
              className="rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-neutral-300"
            >
              {item.name}
            </li>
          ))}
        </ul>
      </article>
    </section>
  )
}

export default ManagementDashboardPage
