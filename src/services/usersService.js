import { users } from '../data/dashboardData'
import httpClient from './httpClient'

function mapUser(user) {
  return {
    id: user.id,
    name: user.name || user.firstName,
    surname: user.surname || user.lastName,
    dni: user.dni,
    isActive: user.isActive ?? true,
    image: user.image,
  }
}

export async function getUsers() {
  try {
    const response = await httpClient.get('/users')
    return response.data.map(mapUser)
  } catch {
    return users.map(mapUser)
  }
}
