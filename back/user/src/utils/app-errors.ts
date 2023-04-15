export class AppError {
  message: string;
  statusCode: number;
  constructor(statusCode: number, message: string) {
    this.statusCode = statusCode;
    this.message = message;
  }

  static badRequest(msg: string) {
    return new AppError(400, msg)
  }

  static unauthorised(msg: string) {
    return new AppError(403, msg)
  }

  static internal(msg: string) {
    return new AppError(500, msg)
  }
}