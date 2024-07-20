export interface EventEmitterPort {
  emitAsync(eventName: string, eventData: any): Promise<any>;
}
