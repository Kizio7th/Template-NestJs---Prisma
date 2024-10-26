import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ROLES_KEY } from './role.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) { }
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
    if (!roles) return true;
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) throw new ForbiddenException('Truy cập bị từ chối');
    const token = authHeader.split(' ')[1];

    let user: any;
    try {
      user = this.jwtService.verify(token);
    } catch (error) {
      throw new ForbiddenException(error);
    }

    const hasRole = () => user.roles.some((role: string) => roles.includes(role));
    if (!hasRole()) throw new ForbiddenException('Truy cập bị từ chối');

    return true;
  }
}
