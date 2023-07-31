export const errorMap = {
  ALREADY_REGISTERED: 409,
  TOKEN_ERROR: 401,
  NOT_FOUND: 404,
};

export const mapError = (type: string): number => errorMap[type as keyof typeof errorMap] || 500;