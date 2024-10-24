import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PostgresPrismaService } from '../database/postgres/postgres-prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  controllers: [UserController],
  providers: [UserService, PostgresPrismaService],
  exports: [UserService]
})
export class UserModule { }
