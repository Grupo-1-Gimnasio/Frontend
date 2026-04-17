import { users } from '../data/dashboardData'
import httpClient from './httpClient'

export async function getUsers() {
  try {
    const response = await httpClient.get('/users')
    return response.data
  } catch {
    return users
  }
}
