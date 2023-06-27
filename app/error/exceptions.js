import { StatusCodes } from 'http-status-codes';

export function MyConflictExpetion() {
  return {
    status: StatusCodes.CONFLICT,
    message: 'conflict_error',
  };
}

export function myInternalServerError() {
  return {
    status: StatusCodes.INTERNAL_SERVER_ERROR,
    message: 'internal_error',
  };
}

export function myNotFound() {
  return {
    status: StatusCodes.NOT_FOUND,
    message: 'notfound_error',
  };
}

export function myUnathorized() {
  return {
    status: StatusCodes.UNAUTHORIZED,
    message: 'unathorize_error',
  };
}

export function myForbidden() {
  return {
    status: StatusCodes.FORBIDDEN,
    message: 'forbidden_error',
  };
}
