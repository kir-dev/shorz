import { Body, Controller, Get, NotFoundException, Param, Patch, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AdminGuard } from '../auth/admin.guard';
import { sanitize } from '../utils/sanitize';
import { User } from '../schemas/users.schema';
import { JwtAuthGuard } from '../strategies/jwt.strategy';
import { SetAdminDto } from '../types/dto.types';

@Controller('admin/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(AdminGuard)
  @Get()
  async getAllUsers() {
    return this.userService.getUsers();
  }

  @UseGuards(AdminGuard)
  @Patch('role/:id')
  async setAdmin(@Param('id') id: string, @Body() dto: SetAdminDto) {
    const result = await this.userService.setUserAdminRole(id, dto.isAdmin);
    if (result.upsertedCount === 0) return new NotFoundException();
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMyUser(@Request() req) {
    return sanitize<User>(req.user, ['displayName', 'mail', 'isAdmin']);
  }
}
