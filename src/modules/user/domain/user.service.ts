import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryPort } from '@/modules/user/database/user.repository-port';
import { UserEntity } from '@/modules/user/domain/user.entity';
import { USER_REPOSITORY } from '@/modules/user/user.di-tokens';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepo: UserRepositoryPort,
  ) {}

  async createUser(data: {
    name: string;
    email: string;
    password: string;
  }): Promise<void> {
    const userEntity = UserEntity.create(data);

    try {
      await this.userRepo.transaction(async () =>
        this.userRepo.save(userEntity),
      );
    } catch (error: any) {
      throw error;
    }
  }
}
