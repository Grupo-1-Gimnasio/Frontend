import { activities } from '../data/dashboardData'

export function getActivities() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(activities)
    }, 300)
  })
}
