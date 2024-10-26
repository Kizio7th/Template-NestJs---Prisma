import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserException } from './user.exception';
import { RegisterDto } from '../auth/dto/register.dto';
import { PostgresPrismaService } from '../../databases/postgres/postgres-prisma.service';
import { UpdateUserDto } from './dto/updateUserInfo';
@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);
  constructor(private postgres: PostgresPrismaService) { }
  async createUser(registerDto: RegisterDto) {
    try {
      const hashedPassword = await bcrypt.hash(registerDto.password, 10);
      const user = await this.postgres.user.create({
        data: {
          ...registerDto,
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
          userRoles: {
            create: [
              { Role: { connect: { name: 'ADMIN' } } },
              { Role: { connect: { name: 'USER' } } },
            ],
          },
        },
      });
      return user;
    } catch (error) {
      throw new UserException(error);
    }
  }
  async findAllUser() {
    try {
      return this.postgres.user.findMany({
        include: { userRoles: { include: { Role: true } } },
      });
    } catch (error) {
      throw new UserException(error)
    }
  }
  async findById(id: number) {
    try {
      return this.postgres.user.findUnique({
        where: { id },
        include: { userRoles: { include: { Role: true } } },
      });
    } catch (error) {
      throw new UserException(error)
    }
  }
  async findByUsername(username: string) {
    try {
      return this.postgres.user.findUnique({
        where: { username },
        include: { userRoles: { include: { Role: true } } },
      });
    } catch (error) {
      throw new UserException(error)
    }
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
  }
}
