import { Logger, Module } from '@nestjs/common';
import { UserPrismaMapper } from '@/modules/user/database/user.prisma.mapper';
import { UserPrismaRepository } from '@/modules/user/database/user.prisma.repository';
import { USER_REPOSITORY } from '@/modules/user/user.di-tokens';
import { UserService } from '@/modules/user/domain/user.service';
import { CreateUserHttpController } from '@/modules/user/commands/create-user/create-user.http.controller';
import { PrismaService } from '@/services/prisma.service';

const httpControllers = [CreateUserHttpController];

const commandHandlers = [UserService];

const repositories = [
  { provide: USER_REPOSITORY, useClass: UserPrismaRepository },
];

const mappers = [UserPrismaMapper];

@Module({
  imports: [],
  controllers: [...httpControllers],
  providers: [
    PrismaService,
    Logger,
    ...mappers,
    ...repositories,
    ...commandHandlers,
  ],
})
export class UserModule {}
