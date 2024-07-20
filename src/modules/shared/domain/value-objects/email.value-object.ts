import { ValueObject } from '@ddd';
import { Guard } from '@/libs/Guard';
import { ArgumentNotProvidedException } from '@/libs/exceptions';

export interface EmailProps {
  email: string;
}

export class Email extends ValueObject<EmailProps> {
  get domain(): string {
    return this.props.email.split('@')[1];
  }

  get email(): string {
    return this.props.email;
  }

  protected validate(props: EmailProps): void {
    if (Guard.isEmpty(props.email)) {
      throw new ArgumentNotProvidedException('email is required');
    }
  }
}
