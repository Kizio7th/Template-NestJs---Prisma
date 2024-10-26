import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../../databases/database.module';

@Module({
  imports: [AuthModule,DatabaseModule],
  providers: [RoleService],
  exports: [RoleService],
  controllers: [RoleController]
})
export class RoleModule { }
