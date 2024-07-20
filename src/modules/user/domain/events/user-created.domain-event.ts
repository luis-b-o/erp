import { DomainEvent, DomainEventProps } from '@ddd';

export class UserCreatedDomainEvent extends DomainEvent {
  readonly name: string;
  readonly email: string;

  constructor(props: DomainEventProps<UserCreatedDomainEvent>) {
    super(props);
    this.name = props.name;
    this.email = props.email;
  }
}
