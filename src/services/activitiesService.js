import { activities } from '../data/dashboardData'
import httpClient from './httpClient'

function mapActivity(activity) {
  return {
    id: activity.id,
    title: activity.title,
    price: activity.price,
    weekDay: activity.weekDay ?? activity.week_day,
    startHour: activity.startHour ?? activity.start_hour,
    endHour: activity.endHour ?? activity.end_hour,
    image: activity.image,
  }
}

export async function getActivities() {
  try {
    const response = await httpClient.get('/activities')
    return response.data.map(mapActivity)
  } catch {
    return activities.map(mapActivity)
  }
}
