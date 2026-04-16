import { kpiCards, recentActivity } from '../data/dashboardData'

export function getDashboardData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ kpiCards, recentActivity })
    }, 300)
  })
}
