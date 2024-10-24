import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { PostgresPrismaService } from '../database/postgres/postgres-prisma.service';

@Module({
  providers: [RoleService, PostgresPrismaService],
  exports: [RoleService],
})
export class RolesModule { }
