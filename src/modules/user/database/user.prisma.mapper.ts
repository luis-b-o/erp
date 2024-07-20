import { UserEntity } from '@/modules/user/domain/user.entity';
import { MapperPort } from '@/libs/ports';
import { Email } from '@/modules/shared/domain/value-objects/email.value-object';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class UserPrismaMapper implements MapperPort<UserEntity, User> {
  toDomain(entity: User) {
    return new UserEntity({
      id: entity.id,
      createdAt: new Date(entity.createdAt),
      updatedAt: new Date(entity.updatedAt),
      props: {
        name: entity.name,
        password: entity.password,
        active: entity.active,
        email: new Email({ email: entity.email }),
      },
    });
  }

  toPersistence(entity: UserEntity): User {
    const { id, name, password, active, updatedAt, email, createdAt } =
      entity.getProps();

    return {
      id,
      name,
      email: email.email,
      password,
      active,
      createdAt,
      updatedAt,
    };
  }
}
