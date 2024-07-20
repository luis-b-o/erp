import { RequestContextService } from '@/libs/application/context/AppRequestContext';

export interface SerializedException {
  message: string;
  code: string;
  correlationId: string;
  stack?: string;
  cause?: string;
  metadata?: unknown;
  /**
   * ^ Consider adding optional `metadata` object to
   * exceptions (if language doesn't support anything
   * similar by default) and pass some useful technical
   * information about the exception when throwing.
   * This will make debugging easier.
   */
}

/**
 * Base class for custom exceptions.
 *
 * @abstract
 * @class ExceptionBase
 * @extends {Error}
 */
export abstract class ExceptionBase extends Error {
  abstract code: string;

  public readonly correlationId: string;

  /**
   * Constructs an instance of `ExceptionBase`, initializing it with a message, an optional cause, and optional metadata.
   * This constructor also captures the stack trace to aid in debugging and assigns a correlation ID from the current
   * request context to track the exception across different parts of the application or microservices.
   *
   * @param {string} message - The error message.
   * @param {Error} [cause] - The original error instance that caused this exception, if any.
   * @param {unknown} [metadata] - Additional data about the error that can be used for debugging.
   */
  constructor(
    readonly message: string,
    readonly cause?: Error,
    readonly metadata?: unknown,
  ) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    const ctx = RequestContextService.getContext();
    this.correlationId = ctx.requestId;
  }

  /**
   * By default in NodeJS Error objects are not
   * serialized properly when sending plain objects
   * to external processes. This method is a workaround.
   * Keep in mind not to return a stack trace to user when in production.
   * https://iaincollins.medium.com/error-handling-in-javascript-a6172ccdf9af
   */
  toJSON(): SerializedException {
    return {
      message: this.message,
      code: this.code,
      stack: this.stack,
      correlationId: this.correlationId,
      cause: JSON.stringify(this.cause),
      metadata: this.metadata,
    };
  }
}
