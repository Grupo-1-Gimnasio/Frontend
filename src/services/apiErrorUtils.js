function toLowerCaseText(value) {
  return String(value ?? '').toLowerCase()
}

function getApiErrorText(error) {
  const responseData = error?.response?.data

  if (typeof responseData === 'string') {
    return toLowerCaseText(responseData)
  }

  if (responseData && typeof responseData === 'object') {
    const message = responseData.message ?? responseData.error ?? responseData.details
    return toLowerCaseText(message)
  }

  return toLowerCaseText(error?.message)
}

export function isForeignKeyError(error) {
  const errorText = getApiErrorText(error)
  const status = error?.response?.status

  if (status === 409) {
    return true
  }

  return (
    errorText.includes('foreign key') ||
    errorText.includes('constraint') ||
    errorText.includes('integrity') ||
    errorText.includes('cannot delete or update a parent row') ||
    errorText.includes('violates')
  )
}

export function isTrainerRelationError(error) {
  const errorText = getApiErrorText(error)

  return (
    errorText.includes('trainer_id') ||
    errorText.includes('trainer id') ||
    errorText.includes('activities') ||
    isForeignKeyError(error)
  )
}
