import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { RoleGuard } from '../role/role.guard';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/updateUserInfo';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const updatedUser = await this.userService.update(id, updateUserDto);

    return updatedUser;
  }
}
