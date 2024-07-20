import { Injectable, Logger } from '@nestjs/common';
import { UserEntity } from '@/modules/user/domain/user.entity';
import { PrismaRepositoryBase } from '@/libs/database/prisma/repository.base';
import { User } from '@prisma/client';
import { UserRepositoryPort } from '@/modules/user/database/user.repository-port';
import { UserPrismaMapper } from '@/modules/user/database/user.prisma.mapper';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PrismaService } from '@/services/prisma.service';

@Injectable()
export class UserPrismaRepository
  extends PrismaRepositoryBase<UserEntity, User>
  implements UserRepositoryPort
{
  constructor(
    prisma: PrismaService,
    mapper: UserPrismaMapper,
    eventEmitter: EventEmitter2,
  ) {
    super(
      prisma,
      prisma.user,
      mapper,
      eventEmitter,
      new Logger(UserPrismaRepository.name),
    );
  }
}
