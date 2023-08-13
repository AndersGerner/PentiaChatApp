type ErrorWithCode = {
  code: string;
  message?: string; // Optional message property
};

/**
 * Type guard to check if the provided error object has a 'code' property of type string.
 * @param error - The error object to check.
 * @returns True if the error object matches the ErrorWithCode type, false otherwise.
 */
function isErrorWithCode(error: unknown): error is ErrorWithCode {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    typeof (error as Record<string, unknown>).code === 'string'
  );
}

/**
 * Converts any error object to an ErrorWithCode type.
 * If the error object already matches the ErrorWithCode type, it's returned as is.
 * Otherwise, it's converted to an object with a default error code and the error message.
 * @param maybeError - The error object to convert.
 * @returns An object that matches the ErrorWithCode type.
 */
function toErrorWithCode(maybeError: unknown): ErrorWithCode {
  if (isErrorWithCode(maybeError)) return maybeError;

  let errorMessage: string;
  try {
    errorMessage = JSON.stringify(maybeError);
  } catch {
    errorMessage = String(maybeError);
  }

  // Return an object that matches the ErrorWithCode type
  return {
    code: 'UNKNOWN_ERROR', // You can set a default error code here
    message: errorMessage,
  };
}

export function getErrorCode(error: unknown) {
  return toErrorWithCode(error).code;
}
