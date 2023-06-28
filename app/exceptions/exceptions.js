import { StatusCodes } from 'http-status-codes';

export function ConflictException() {
  return {
    status: StatusCodes.CONFLICT,
    message: 'conflict_error',
  };
}

export function InternalServerException() {
  return {
    status: StatusCodes.INTERNAL_SERVER_ERROR,
    message: 'internal_error',
  };
}

export function NotFoundException() {
  return {
    status: StatusCodes.NOT_FOUND,
    message: 'notfound_error',
  };
}

export function UnathorizedException() {
  return {
    status: StatusCodes.UNAUTHORIZED,
    message: 'unathorize_error',
  };
}

export function ForbiddenException() {
  return {
    status: StatusCodes.FORBIDDEN,
    message: 'forbidden_error',
  };
}
