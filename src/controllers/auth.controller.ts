import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { CreateUserDto } from '@/dtos/create-user.dto';
import { Response } from 'express';
import { AuthService } from '@/services/auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('api/register')
  async create(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ): Promise<any> {
    const user = await this.authService.register(createUserDto);

    return res.status(HttpStatus.OK).json(user);
  }
}
