import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { PrismaClient as MongoPrismaClient } from '@prisma/mongo/client';

@Injectable()
export class MongoPrismaService
  extends MongoPrismaClient
  implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(MongoPrismaService.name);



  async onModuleInit() {
    let retries = 5;

    while (retries > 0) {

      try {
        await this.$connect();

        this.logger.log('Successfully connected to mongo database');

        break;

      } catch (err) {
        this.logger.error(err);

        this.logger.error(
          `there was an error connecting to database, retrying .... (${retries})`,
        );

        retries -= 1;

        await new Promise((res) => setTimeout(res, 3_000)); // wait for three seconds
      }
    }
  }



  async onModuleDestroy() {
    await this.$disconnect();
  }
}
