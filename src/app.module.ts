import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserService } from '@/services/user.service';
import { PrismaService } from '@/services/prisma.service';
import { AuthController } from '@/controllers/auth.controller';
import { AuthService } from '@/services/auth.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AuthController],
  providers: [UserService, AuthService, PrismaService],
})
export class AppModule {}
