import { AggregateID, AggregateRoot } from '@ddd';
import { CreateUserProps, UserProps } from '@/modules/user/domain/user.types';
import { randomUUID } from 'crypto';
import { Email } from '@/modules/shared/domain/value-objects/email.value-object';
import { UserCreatedDomainEvent } from '@/modules/user/domain/events/user-created.domain-event';

export class UserEntity extends AggregateRoot<UserProps> {
  protected readonly _id: AggregateID;

  static create(create: CreateUserProps): UserEntity {
    const id = randomUUID();
    const email = new Email({ email: create.email });

    const props = {
      email,
      active: true,
      name: create.name,
      password: create.password,
    };

    const user = new UserEntity({ id, props });

    user.addEvent(
      new UserCreatedDomainEvent({
        aggregateId: id,
        name: props.name,
        ...props.email.unpack(),
      }),
    );

    return user;
  }

  validate(): void {
    // entity business rules validation to protect it's invariant before saving entity to a database
  }
}
