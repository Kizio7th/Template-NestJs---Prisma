import { Module } from '@nestjs/common';
import { PostgresPrismaService } from './postgres/postgres-prisma.service';
import { MongoPrismaService } from './mongo/mongo-prisma.service';


@Module({
  providers: [PostgresPrismaService, MongoPrismaService],
})

export class DatabaseModule {}
