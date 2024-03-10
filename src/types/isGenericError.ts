type GenericError = {
  name: 'GenericError'
  message: string
}

export default function isGenericError(error: any): error is GenericError {
  return error.name === 'GenericError'
}
