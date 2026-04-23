import { getActivities } from './activitiesService'
import { getProfessors } from './professorsService'
import { getUsers } from './usersService'

function getLatestItems(items) {
  return [...items]
    .sort((a, b) => Number(b.id ?? 0) - Number(a.id ?? 0))
}

export async function getDashboardData() {
  const [users, activities, professors] = await Promise.all([
    getUsers(),
    getActivities(),
    getProfessors(),
  ])

  const activeUsers = users.filter((user) => user.isActive).length
  const activeProfessors = professors.filter((professor) => professor.isActive).length
  const annualFeePaidUsers = users.filter((user) => user.annualFeePaid).length

  const kpiCards = [
    { id: 1, label: 'Usuarios activos', value: String(activeUsers) },
    { id: 2, label: 'Actividades', value: String(activities.length) },
    { id: 3, label: 'Profesores activos', value: String(activeProfessors) },
    { id: 4, label: 'Cuotas al dia', value: String(annualFeePaidUsers) },
  ]

  const latestUsers = getLatestItems(users).slice(0, 2)
  const latestActivities = getLatestItems(activities).slice(0, 1)
  const latestProfessors = getLatestItems(professors).slice(0, 1)

  const recentActivity = [
    ...latestUsers.map((user) => ({
      id: `user-${user.id}`,
      name: `Usuario: ${[user.name, user.surname].filter(Boolean).join(' ') || 'Sin nombre'}`,
    })),
    ...latestActivities.map((activity) => ({
      id: `activity-${activity.id}`,
      name: `Actividad: ${activity.title || 'Sin titulo'}`,
    })),
    ...latestProfessors.map((professor) => ({
      id: `professor-${professor.id}`,
      name: `Profesor: ${professor.name || 'Sin nombre'}`,
    })),
  ]

  return {
    kpiCards,
    recentActivity:
      recentActivity.length > 0
        ? recentActivity
        : [{ id: 'no-data', name: 'Sin actividad reciente disponible' }],
  }
}
