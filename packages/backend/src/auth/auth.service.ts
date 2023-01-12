import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '../schemas/users.schema';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}
  async login(user: UserDocument) {
    const payload = { username: user.displayName, uid: user._id.toString() };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
