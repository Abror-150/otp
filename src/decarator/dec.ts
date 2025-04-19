import { SetMetadata } from '@nestjs/common';
import { Rolee } from 'src/enum/en';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: Rolee[]) => SetMetadata(ROLES_KEY, roles);
