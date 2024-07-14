import { RequestContext } from 'nestjs-request-context';

/**
 * Setting some isolated context for each request.
 */
export class AppRequestContext extends RequestContext {
  requestId: string;
}

export class RequestContextService {
  static getContext(): AppRequestContext {
    return RequestContext.currentContext.req;
  }

  static setRequestId(id: string): void {
    const ctx = this.getContext();
    ctx.requestId = id;
  }

  static getRequestId(): string {
    return this.getContext().requestId;
  }
}
