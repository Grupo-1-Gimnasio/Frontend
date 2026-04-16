import { users } from '../data/dashboardData'

export function getUsers() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(users)
    }, 300)
  })
}
