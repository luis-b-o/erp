import { Email } from '@/modules/shared/domain/value-objects/email.value-object';

export interface UserProps {
  email: Email;
  name: string;
  group: string;
  active: boolean;
}

export interface CreateUserProps {
  email: string;
  password: string;
  name: string;
}
