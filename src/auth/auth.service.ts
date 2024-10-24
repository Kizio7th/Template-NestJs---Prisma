import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { InvalidCredentialsException, UserAlreadyExistsException } from './auth.exception';
import { UnexpectedErrorException } from '../filter/excception';
import { UserInfo } from '../user/dto/userInfo.dto';
import { LoginDto } from './dto/login.dto';
@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }
  async register(registerDto: RegisterDto) {
    try {
      const checkUser = await this.userService.findByUsername(registerDto.username);
      if (checkUser) throw new UserAlreadyExistsException();
      const user = await this.userService.createUser(registerDto)
      return {
        errorCode: 0,
        message: "Đăng ký thành công",
        data: new UserInfo(user)
      };
    } catch (error) {
      const exceptions = [UserAlreadyExistsException];
      if (!exceptions.some((exception) => error instanceof exception)) {
        error = new UnexpectedErrorException();
      }
      return {
        errorCode: error.errorCode ?? error.getStatus(),
        message: error.message
      };
    }
  }
  async login(loginDto: LoginDto) {
    try {
      const user = await this.userService.findByUsername(loginDto.username);
      if (!user || !(await bcrypt.compare(loginDto.password, user.password))) throw new InvalidCredentialsException();
      const roles = user.userRoles.map((user: { Role: { name: any; }; }) => user.Role.name);
      const payload = { id: user.id, username: user.username, roles };
      return {
        errorCode: 0,
        message: "Đăng nhập thành công",
        data: {
          ...new UserInfo(user),
          accessToken: this.jwtService.sign(payload)
        }
      };
    } catch (error) {
      const exceptions = [InvalidCredentialsException];
      if (!exceptions.some((exception) => error instanceof exception)) {
        error = new UnexpectedErrorException();
      }
      return {
        errorCode: error.errorCode ?? error.getStatus(),
        message: error.message
      };
    }
  }

}