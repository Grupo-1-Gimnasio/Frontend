import httpClient from './httpClient'

function normalizeYear(value) {
  const parsedValue = Number(value)
  return Number.isNaN(parsedValue) ? null : parsedValue
}

function mapUserFromApi(user) {
  return {
    id: user.id,
    name: user.name ?? '',
    surname: user.surname ?? '',
    dni: user.dni ?? '',
    startYear: normalizeYear(user.startYear ?? user.start_year),
    isActive: Boolean(user.isActive),
    annualFeePaid: Boolean(user.annualFeePaid),
    image: user.image ?? '',
  }
}

function mapUserToApi(user) {
  return {
    name: user.name?.trim() ?? '',
    surname: user.surname?.trim() ?? '',
    dni: user.dni?.trim() ?? '',
    startYear: normalizeYear(user.startYear),
    isActive: Boolean(user.isActive),
    annualFeePaid: Boolean(user.annualFeePaid),
    image: user.image?.trim() ?? '',
  }
}

export async function getUsers() {
  const response = await httpClient.get('/users')
  return response.data.map(mapUserFromApi)
}

export async function getUserById(userId) {
  const response = await httpClient.get(`/users/${userId}`)
  return mapUserFromApi(response.data)
}

export async function createUser(userData) {
  const response = await httpClient.post('/users', mapUserToApi(userData))
  return mapUserFromApi(response.data)
}

export async function updateUser(userId, userData) {
  const response = await httpClient.put(`/users/${userId}`, mapUserToApi(userData))
  return mapUserFromApi(response.data)
}

export async function deleteUser(userId) {
  await httpClient.delete(`/users/${userId}`)
}
