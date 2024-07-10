import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { UserService } from '@/services/user.service';
import { CreateUserDto } from '@/dtos/create-user.dto';
import { Response } from 'express';

@Controller()
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('user')
  async create(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ): Promise<any> {
    const userAlreadyExists = await this.userService.user({
      email: createUserDto.email,
    });

    if (userAlreadyExists) {
      return res
        .status(HttpStatus.CONFLICT)
        .json({ message: 'Email already taken' });
    }

    const user = await this.userService.createUser(createUserDto);

    return res.status(HttpStatus.OK).json(user);
  }
}
