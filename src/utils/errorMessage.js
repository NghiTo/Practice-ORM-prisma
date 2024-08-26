export const UNAUTHORIZED = {
  errorCode: "UNAUTHORIZED",
  statusCode: 401,
};

export const BAD_REQUEST = {
  errorCode: "BAD_REQUEST",
  statusCode: 400,
};

export const NOT_FOUND = {
  statusCode: 404,
  errorCode: "NOT_FOUND",
};

export const FORBIDDEN = {
  statusCode: 403,
  errorCode: "ACCESS_DENIED",
};

export const INTERNAL_SERVER_ERROR = {
  statusCode: 500,
  errorCode: "INTERNAL_SERVER_ERROR",
};
