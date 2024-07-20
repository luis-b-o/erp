import { Controller, Post } from '@nestjs/common';
import { UserService } from '@/modules/user/domain/user.service';

@Controller('/v1/user')
export class CreateUserHttpController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(): Promise<void> {
    return await this.userService.createUser({
      email: Math.random().toString() + '@gmail.com',
      name: 'test',
      password: 'test',
    });
  }
}
