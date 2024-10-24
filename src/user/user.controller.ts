import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RoleGuard } from '../role/role.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
}
