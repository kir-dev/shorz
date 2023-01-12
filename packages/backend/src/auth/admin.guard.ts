import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtAuthGuard } from '../strategies/jwt.strategy';
import { UserDocument } from '../schemas/users.schema';

export class AdminGuard extends JwtAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    await super.canActivate(context);
    const request = context.switchToHttp().getRequest();
    const user = request.user as UserDocument;
    return user.isAdmin;
  }
}
