import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AdminKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{
      headers: { 'x-admin-key'?: string };
    }>();
    const configured = process.env.ADMIN_API_KEY?.trim();

    if (!configured) {
      throw new UnauthorizedException('Admin API key is not configured.');
    }

    if (request.headers['x-admin-key'] !== configured) {
      throw new UnauthorizedException('Invalid admin API key.');
    }

    return true;
  }
}
