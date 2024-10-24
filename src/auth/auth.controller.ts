import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { RoleGuard } from '../role/role.guard';
import { RegisterDto } from '../auth/dto/register.dto';
import { LoginDto } from '../auth/dto/login.dto';
import { AuthService } from './auth.service';
import { BaseResponse } from '../utils/baseReponse';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @Post('register')
    @ApiOperation({ summary: 'Đăng ký tài khoản' })
    @ApiBody({
        description: 'Thông tin người dùng để đăng ký',
        schema: {
            type: 'object',
            properties: {
                username: {
                    type: 'string',
                },
                password: {
                    type: 'string',
                },
                fullname: {
                    type: 'string',
                },
                email: {
                    type: 'string',
                },
                avatar: {
                    type: 'string',
                },
            },
            required: ['username', 'password'],
        },
        examples: {
            'application/json': {
                value: {
                    "username": "johnnnnn",
                    "password": "securePassword123",
                    "fullname": "John Doe",
                    "email": "john.doe@example.com",
                    "avatar": "http://example.com/path/to/avatar.jpg"
                }
            },
        },
    })
    async register(@Body() registerDto: RegisterDto) {
        const register = await this.authService.register(registerDto);
        return new BaseResponse(register);
    }
    @Post('login')
    @ApiOperation({ summary: 'Đăng nhập' })
    @ApiBody({
        description: 'Thông tin đăng nhập',
        schema: {
            type: 'object',
            properties: {
                username: {
                    type: 'string',
                },
                password: {
                    type: 'string',
                },
            },
            required: ['username', 'password'],
        },
        examples: {
            'application/json': {
                value: {
                    "username": "johnnnnn",
                    "password": "securePassword123",
                }
            },
        },
    })
    async login(@Body() loginDto: LoginDto) {
        const login = await this.authService.login(loginDto);
        return new BaseResponse(login);
    }
}
