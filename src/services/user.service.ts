import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma, users as User } from '@prisma/client';
import { CreateUserDto } from '@/dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {
  }

  async user(
    userWhereUniqueInput: Prisma.usersWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.users.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.usersWhereUniqueInput;
    where?: Prisma.usersWhereInput;
    orderBy?: Prisma.usersOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.users.findMany({
      skip, take, cursor, where, orderBy,
    });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.prisma.users.create({ data: createUserDto });
  }

  async updateUser(params: {
    where: Prisma.usersWhereUniqueInput;
    data: Prisma.usersUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.users.update({ data, where });
  }

  async deleteUser(where: Prisma.usersWhereUniqueInput): Promise<User> {
    return this.prisma.users.delete({ where });
  }
}
