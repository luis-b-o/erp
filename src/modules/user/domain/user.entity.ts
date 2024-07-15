import { AggregateID, AggregateRoot } from '@ddd';
import { CreateUserProps, UserProps } from '@/modules/user/domain/user.types';
import { randomUUID } from 'crypto';
import { Email } from '@/modules/shared/domain/value-objects/email.value-object';
import { UserCreatedDomainEvent } from '@/modules/user/domain/events/user-created.domain-event';

export class UserEntity extends AggregateRoot<UserProps> {
  protected readonly _id: AggregateID;

  private password: string;

  private constructor(
    id: AggregateID,
    props: UserProps & { password: string },
  ) {
    super({ id, props });
    this.password = props.password;
  }

  static create(create: CreateUserProps): UserEntity {
    const id = randomUUID();
    const email = new Email({ email: create.email });

    const props = {
      email,
      group: 'basic',
      active: true,
      name: create.name,
      password: create.password,
    };

    const user = new UserEntity(id, props);

    user.addEvent(
      new UserCreatedDomainEvent({
        aggregateId: id,
        name: props.name,
        group: props.group,
        ...props.email.unpack(),
      }),
    );

    return user;
  }

  validate(): void {
    // entity business rules validation to protect it's invariant before saving entity to a database
  }
}
