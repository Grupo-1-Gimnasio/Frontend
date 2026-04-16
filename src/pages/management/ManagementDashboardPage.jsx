const kpiCards = [
  { label: 'Usuarios activos', value: '248' },
  { label: 'Actividades', value: '12' },
  { label: 'Profesores', value: '8' },
  { label: 'Crecimiento', value: '+15%' },
]

const recentActivity = [
  'Nuevo usuario registrado',
  'Clase de yoga completada',
  'Profesor a\u00f1adido al sistema',
  'Actividad funcional actualizada',
]

function ManagementDashboardPage() {
  return (
    <section className="space-y-8">
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

      <article className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
        <h2 className="text-xl font-semibold text-white">Actividad reciente</h2>
        <ul className="mt-5 space-y-3">
          {recentActivity.map((item) => (
            <li
              key={item}
              className="rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-neutral-300"
            >
              {item}
            </li>
          ))}
        </ul>
      </article>
    </section>
  )
}

export default ManagementDashboardPage
