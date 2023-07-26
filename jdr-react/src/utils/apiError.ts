import { ERRORS_KEYS } from "@/constants/errorKeys";

export type ApiErrorType = {
  error?: string;
  key?: keyof typeof ERRORS_KEYS;
  errorCode?: string;
};

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
export class ApiError extends Error {
  error: ApiErrorType["error"];
  key: ApiErrorType["key"];
  errorCode: ApiErrorType["errorCode"];
  status?: number;

  constructor(value?: ApiErrorType, status?: number) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super();

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }

    this.name = "ApiError";
    // Custom debugging information
    this.error = value?.error;
    this.key = value?.key;
    this.errorCode = value?.errorCode;
    this.status = status;
  }
}
