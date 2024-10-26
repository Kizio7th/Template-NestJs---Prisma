import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RoleGuard } from './role.guard';
import { RoleService } from './role.service';
import { BaseResponse } from '../../utils/baseReponse';
import { Roles } from './role.decorator';

@Controller('role')
export class RoleController {
    constructor(private readonly roleService: RoleService) { }
    @Get('getAll')
    @Roles('ADMIN') 
    @UseGuards(RoleGuard)
    async getAllRoles() {
        const roles = await this.roleService.findAll();
        return new BaseResponse({ data: roles });
    }
}
