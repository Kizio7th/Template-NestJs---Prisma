import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { permissions } from '../auth/config/permissions';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) { }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user; 

    const { originalUrl, method } = request; 
    const role = user.role;
    const allowedMethods = permissions[role]?.[originalUrl];

    if (!allowedMethods || !allowedMethods.includes(method)) {
      throw new ForbiddenException('Access denied');
    }

    return true;
  }
}
