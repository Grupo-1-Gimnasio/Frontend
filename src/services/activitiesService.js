import httpClient from './httpClient'

function normalizePrice(value) {
  const parsedValue = Number(value)

  if (Number.isNaN(parsedValue)) {
    return '0.00'
  }

  return parsedValue.toFixed(2)
}

function normalizeTrainerId(value) {
  if (value === null || typeof value === 'undefined' || value === '') {
    return null
  }

  const parsedValue = Number(value)
  return Number.isNaN(parsedValue) ? null : parsedValue
}

function mapActivityFromApi(activity) {
  return {
    id: activity.id,
    title: activity.title ?? '',
    price: normalizePrice(activity.price),
    weekDay: activity.weekDay ?? '',
    startHour: activity.startHour ?? '',
    endHour: activity.endHour ?? '',
    image: activity.image ?? '',
    trainerId: normalizeTrainerId(activity.trainerId ?? activity.trainer_id),
  }
}

function mapActivityToApi(activity) {
  return {
    title: activity.title?.trim() ?? '',
    price: normalizePrice(activity.price),
    weekDay: activity.weekDay ?? '',
    startHour: activity.startHour ?? '',
    endHour: activity.endHour ?? '',
    image: activity.image?.trim() ?? '',
    trainer_id: normalizeTrainerId(activity.trainerId ?? activity.trainer_id),
  }
}

export async function getActivities() {
  const response = await httpClient.get('/activities')
  return response.data.map(mapActivityFromApi)
}

export async function getActivityById(activityId) {
  const response = await httpClient.get(`/activities/${activityId}`)
  return mapActivityFromApi(response.data)
}

export async function createActivity(activityData) {
  const response = await httpClient.post('/activities', mapActivityToApi(activityData))
  return mapActivityFromApi(response.data)
}

export async function updateActivity(activityId, activityData) {
  const response = await httpClient.put(`/activities/${activityId}`, mapActivityToApi(activityData))
  return mapActivityFromApi(response.data)
}

export async function deleteActivity(activityId) {
  await httpClient.delete(`/activities/${activityId}`)
}
