import { Injectable } from '@nestjs/common';
import { PostgresPrismaService } from '../../databases/postgres/postgres-prisma.service';

@Injectable()
export class RoleService {
    constructor(private postgres: PostgresPrismaService) { }

    async findAll() {
        return this.postgres.role.findMany();
    }

    async findById(id: number) {
        return this.postgres.role.findUnique({
            where: { id },
        });
    }

    async findByName(name: string) {
        return this.postgres.role.findUnique({
            where: { name },
        });
    }
}
