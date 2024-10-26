import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './components/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './components/user/user.module';
import { CacheModule } from '@nestjs/cache-manager';
import { DatabaseModule } from './databases/database.module';
import { RoleModule } from './components/role/role.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
      envFilePath: '.env',
    }),
    CacheModule.register({ isGlobal: true, ttl: 30000 }),
    AuthModule,
    UserModule,
    RoleModule,
    DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
