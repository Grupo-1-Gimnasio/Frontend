import { professors } from '../data/dashboardData'
import httpClient from './httpClient'

function mapProfessor(professor) {
  return {
    id: professor.id,
    name: professor.name ?? professor.firstName,
    dni: professor.dni,
    hiringYear: professor.hiringYear ?? professor.hiring_year,
    isActive: professor.isActive ?? professor.is_hired ?? true,
    image: professor.image,
  }
}

export async function getProfessors() {
  try {
    const response = await httpClient.get('/professors')
    return response.data.map(mapProfessor)
  } catch {
    return professors.map(mapProfessor)
  }
}
