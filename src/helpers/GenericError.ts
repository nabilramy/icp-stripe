import log from "./logger"

export default class GenericError extends Error {
  statusCode: number

  constructor(message: string, status: number) {
    message !== 'Unauthenticated' ? log(message) : null
    super(message)
    this.name = 'GenericError'
    this.message = message
    this.statusCode = status
  }
}
