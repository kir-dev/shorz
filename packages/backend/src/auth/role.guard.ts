import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { UserDocument } from '../schemas/users.schema';
import { JwtAuthGuard } from '../strategies/jwt.strategy';

export const RoleBasedAuthGuard = (): Type<CanActivate> => {
  class RoleGuardMixin extends JwtAuthGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);
      const request = context.switchToHttp().getRequest();
      const user = request.user as UserDocument;
      //TODO uncomment to enable admin superiority
      // if (user.isAdmin) return true;
      return user.links.map((oid) => oid.toString()).includes(request.params.id);
    }
  }

  return mixin(RoleGuardMixin);
};
