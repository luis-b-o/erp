import { Inject } from '@nestjs/common';
import { UserRepositoryPort } from '@/modules/user/database/user.repository-port';
import { UserEntity } from '@/modules/user/domain/user.entity';
import { USER_REPOSITORY } from '@/modules/user/user.di-tokens';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '@/modules/user/commands/create-user/create-user.command';
import { Err, Ok, Result } from 'oxide.ts';
import { AggregateID } from '@ddd';
import { UserAlreadyExistsError } from '@/modules/user/domain/user.errors';
import { ConflictException } from '@/libs/exceptions';

@CommandHandler(CreateUserCommand)
export class CreateUserService implements ICommandHandler {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepo: UserRepositoryPort,
  ) {}

  async execute(
    data: CreateUserCommand,
  ): Promise<Result<AggregateID, UserAlreadyExistsError>> {
    const userEntity = UserEntity.create(data);

    try {
      await this.userRepo.transaction(
        async () => await this.userRepo.save(userEntity),
      );
      return Ok(userEntity.id);
    } catch (error: any) {
      if (error instanceof ConflictException) {
        return Err(new UserAlreadyExistsError(error));
      }
      throw error;
    }
  }
}
