import { Command, CommandProps } from '@ddd';

export class CreateUserCommand extends Command {
  readonly name: string;

  readonly email: string;

  readonly password: string;

  constructor(props: CommandProps<CreateUserCommand>) {
    super(props);
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
  }
}
