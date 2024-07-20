import {
  EventEmitterPort,
  LoggerPort,
  MapperPort,
  RepositoryPort,
} from '@/libs/ports';
import { AggregateRoot } from '@ddd';
import { ObjectLiteral } from '@/libs/types/object-literal';
import { RequestContextService } from '@/libs/application/context/AppRequestContext';
import { type PrismaClient } from '@prisma/client/extension';
import { PrismaService } from '@/services/prisma.service';
import { ConflictException } from '@/libs/exceptions';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export class PrismaRepositoryBase<
  Aggregate extends AggregateRoot<any>,
  DbModel extends ObjectLiteral,
> implements RepositoryPort<Aggregate>
{
  constructor(
    protected modelService: PrismaService,
    protected modelClient: PrismaClient,
    protected readonly mapper: MapperPort<Aggregate, DbModel>,
    protected readonly eventEmitter: EventEmitterPort,
    protected readonly logger: LoggerPort,
  ) {}

  async save(entity: Aggregate): Promise<void> {
    const model = this.mapper.toPersistence(entity);

    this.logger.debug(
      `[${RequestContextService.getRequestId()}] saving ${this.modelClient.name}: ${entity.id}`,
    );

    try {
      await this.modelClient.create({
        data: model,
      });

      return await entity.publishEvents(this.logger, this.eventEmitter);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        this.logger.debug(
          `[${RequestContextService.getRequestId()}] ${error.message}`,
        );

        if (error.code === 'P2002') {
          throw new ConflictException('Record already exists', error);
        }
      }

      throw error;
    }
  }

  async transaction<T>(handler: () => Promise<T>): Promise<T> {
    return this.modelService.$transaction(async (tx) => {
      this.logger.debug(
        `[${RequestContextService.getRequestId()}] transaction started`,
      );
      if (!RequestContextService.getTransactionConnection()) {
        RequestContextService.setTransactionConnection(
          tx[this.modelClient.$name],
        );
      }

      this.modelClient = RequestContextService.getTransactionConnection();

      try {
        const result = await handler();
        this.logger.debug(
          `[${RequestContextService.getRequestId()}] transaction committed`,
        );
        return result;
      } catch (e) {
        this.logger.debug(
          `[${RequestContextService.getRequestId()}] transaction aborted`,
        );
        throw e;
      } finally {
        RequestContextService.cleanTransactionConnection();
      }
    });
  }
}
