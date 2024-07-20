import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateUserRequestDto {
  @ApiProperty({
    example: 'john@gmail.com',
    description: 'User email address',
  })
  @MaxLength(320)
  @MinLength(5)
  @IsEmail({}, { message: 'incorrect email' })
  readonly email: string;

  @ApiProperty({ example: 'wUN3B%AM7oV9AO', description: 'Password' })
  @MinLength(4)
  readonly password: string;

  @ApiProperty({ example: 'John Doe', description: 'Name' })
  @Matches(/^[a-zA-Z ]*$/)
  readonly name: string;
}
