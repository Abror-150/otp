import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from 'src/decarator/dec';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflektor: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflektor.getAllAndOverride(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const r = context.switchToHttp().getRequest();
    if (!roles.length) {
      return true;
    }
    if (roles.includes(r['user-role'])) {
      return true;
    }

    return true;
  }
}
