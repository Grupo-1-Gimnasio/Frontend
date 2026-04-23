import { useEffect, useState } from 'react'
import { ManagementCard } from '../../components/management/ManagementCards'
import { getDashboardData } from '../../services/dashboardService'

function DashboardVisual({ label, toneClassName }) {
  const initials = label
    .split(' ')
    .slice(0, 2)
    .map((chunk) => chunk.slice(0, 1).toUpperCase())
    .join('')

  return (
    <div
      className={`flex aspect-[4/3] items-end bg-[linear-gradient(180deg,#161616_0%,#101010_100%)] p-5 ${toneClassName}`}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-black/20 text-xl font-semibold tracking-[0.08em] text-white">
        {initials}
      </div>
    </div>
  )
}

function getKpiDescription(label) {
  if (label === 'Usuarios activos') {
    return 'Seguimiento actualizado del numero de personas activas dentro del centro.'
  }

  if (label === 'Actividades') {
    return 'Vista rapida del volumen de actividades disponibles en la gestion.'
  }

  if (label === 'Profesores') {
    return 'Control del equipo docente actualmente registrado en la plataforma.'
  }

  return 'Indicador general para revisar la evolucion del panel de gestion.'
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
          <ManagementCard
            key={card.label}
            media={
              <DashboardVisual
                label={card.label}
                toneClassName="text-orange-300"
              />
            }
            title={card.value}
            description={getKpiDescription(card.label)}
            accent={card.label}
            titleClassName="text-[2.4rem]"
          />
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Actividad reciente</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {recentActivity.map((item) => (
            <ManagementCard
              key={item.id}
              media={
                <DashboardVisual
                  label={item.name}
                  toneClassName="text-sky-300"
                />
              }
              title={item.name}
              description="Movimiento reciente registrado dentro del panel de gestion."
              accent="Actividad reciente"
              titleClassName="text-[1.8rem]"
              descriptionClassName="leading-7"
              className="list-none"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ManagementDashboardPage
