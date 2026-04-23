import { useEffect, useState } from 'react'
import { getDashboardData } from '../../services/dashboardService'

function DashboardMetricCard({ label, value }) {
  return (
    <article className="rounded-[24px] border border-neutral-800 bg-neutral-900 p-5">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-orange-400">
          {label}
        </p>
        <p className="text-5xl font-bold leading-none tracking-[-0.05em] text-white">
          {value}
        </p>
      </div>
    </article>
  )
}

function DashboardRecentCard({ name }) {
  return (
    <article className="rounded-[24px] border border-neutral-800 bg-neutral-900 p-5">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-orange-400">
          Actividad reciente
        </p>
        <p className="text-[2rem] font-semibold leading-[1.05] tracking-[-0.04em] text-white">
          {name}
        </p>
      </div>
    </article>
  )
}

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

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpiCards.map((card) => (
          <DashboardMetricCard
            key={card.label}
            label={card.label}
            value={card.value}
          />
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Actividad reciente</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {recentActivity.map((item) => (
            <DashboardRecentCard
              key={item.id}
              name={item.name}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ManagementDashboardPage
