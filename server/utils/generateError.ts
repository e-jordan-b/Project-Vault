class MyError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default function generateError(
  statusCode: number,
  message: string
): MyError {
  return new MyError(message, statusCode);
}
