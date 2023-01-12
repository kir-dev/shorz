import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AdminGuard } from '../auth/admin.guard';
import { sanitize } from '../utils/sanitize';
import { User } from '../schemas/users.schema';
import { JwtAuthGuard } from '../strategies/jwt.strategy';

@Controller('admin/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(AdminGuard)
  @Get()
  async getAllUsers() {
    return this.userService.getUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMyUser(@Request() req) {
    return sanitize<User>(req.user, ['displayName', 'mail', 'isAdmin']);
  }
}
