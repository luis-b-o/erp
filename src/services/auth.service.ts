import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '@/services/user.service';
import { CreateUserDto } from '@/dtos/create-user.dto';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    const userAlreadyExists = await this.userService.user({
      email: createUserDto.email,
    });

    if (userAlreadyExists) {
      throw new HttpException('Email already taken', HttpStatus.CONFLICT);
    }

    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

    return await this.userService.createUser(createUserDto);
  }
}
