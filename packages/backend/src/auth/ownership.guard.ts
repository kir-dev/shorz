import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Model } from 'mongoose';
import { UserDocument } from '../schemas/users.schema';

export const OwnershipGuard = <T extends { user: string }>(model: Model<T>): Type<CanActivate> => {
  class OwnershipGuardMixin extends AuthGuard() {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);
      const request = context.switchToHttp().getRequest();
      const user = request.user as UserDocument;
      return !!model.findOne({ user: user._id });
    }
  }

  return mixin(OwnershipGuardMixin);
};
