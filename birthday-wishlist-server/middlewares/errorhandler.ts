class HttpError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}


// 400 - Bad Request
export class BadRequestError extends HttpError {
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}

// 401 - Unauthorized (e.g., missing/invalid credentials)
export class UnauthorizedError extends HttpError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

// 403 - Forbidden (e.g., user has no permission)
export class ForbiddenError extends HttpError {
  constructor(message = "Forbidden") {
    super(message, 403);
  }
}

// 404 - Not Found
export class NotFoundError extends HttpError {
  constructor(message = "Not Found") {
    super(message, 404);
  }
}

// 409 - Conflict (e.g., duplicate data)
export class ConflictError extends HttpError {
  constructor(message = "Conflict") {
    super(message, 409);
  }
}

// 422 - Validation Error (unprocessable input)
export class ValidationError extends HttpError {
  constructor(message = "Validation Error") {
    super(message, 422);
  }
}

// 500 - Internal Server Error
export class InternalServerError extends HttpError {
  constructor(message = "Internal Server Error") {
    super(message, 500);
  }
}
