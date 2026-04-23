import httpClient from './httpClient'

function normalizeYear(value) {
  const parsedValue = Number(value)
  return Number.isNaN(parsedValue) ? null : parsedValue
}

function mapProfessorFromApi(professor) {
  return {
    id: professor.id,
    name: professor.name ?? '',
    dni: professor.dni ?? '',
    specialty: professor.speciality ?? professor.specialty ?? '',
    experience: professor.experience ?? '',
    hiringYear: normalizeYear(professor.hiringYear ?? professor.hiring_year),
    isActive: Boolean(professor.isHired ?? professor.is_hired ?? professor.isActive),
    image: professor.image ?? '',
  }
}

function mapProfessorToApi(professor) {
  return {
    name: professor.name?.trim() ?? '',
    dni: professor.dni?.trim() ?? '',
    speciality: professor.specialty?.trim() ?? '',
    experience: professor.experience?.trim() ?? '',
    hiringYear: normalizeYear(professor.hiringYear),
    isHired: Boolean(professor.isActive),
    image: professor.image?.trim() ?? '',
  }
}

export async function getProfessors() {
  const response = await httpClient.get('/trainers')
  return response.data.map(mapProfessorFromApi)
}

export async function getProfessorById(professorId) {
  const response = await httpClient.get(`/trainers/${professorId}`)
  return mapProfessorFromApi(response.data)
}

export async function createProfessor(professorData) {
  const response = await httpClient.post('/trainers', mapProfessorToApi(professorData))
  return mapProfessorFromApi(response.data)
}

export async function updateProfessor(professorId, professorData) {
  const response = await httpClient.put(`/trainers/${professorId}`, mapProfessorToApi(professorData))
  return mapProfessorFromApi(response.data)
}

export async function deleteProfessor(professorId) {
  await httpClient.delete(`/trainers/${professorId}`)
}
