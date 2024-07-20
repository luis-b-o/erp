import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserService } from '@/services/user.service';
import { PrismaService } from '@/services/prisma.service';
import { AuthController } from '@/controllers/auth.controller';
import { AuthService } from '@/services/auth.service';
import { RequestContextModule } from 'nestjs-request-context';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UserModule } from '@/modules/user/user.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ContextInterceptor } from '@/libs/application/interceptors/context.interceptor';
import { ExceptionInterceptor } from '@/libs/application/interceptors/exception.interceptor';

const interceptors = [
  {
    provide: APP_INTERCEPTOR,
    useClass: ContextInterceptor,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: ExceptionInterceptor,
  },
];

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot(),
    RequestContextModule,

    UserModule,
  ],
  controllers: [AuthController],
  providers: [UserService, AuthService, PrismaService, ...interceptors],
})
export class AppModule {}
