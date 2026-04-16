import { professors } from '../data/dashboardData'

export function getProfessors() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(professors)
    }, 300)
  })
}
