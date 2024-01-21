import { Controller, Get, Request, Res, UseGuards } from '@nestjs/common';
import { OauthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { ConfigKeys } from '../utils/configuration';

@Controller('admin/auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly configService: ConfigService) {}

  @UseGuards(OauthGuard)
  @Get('login')
  async loginSso() {
    // guard redirects
  }

  @UseGuards(OauthGuard)
  @Get('callback')
  async callback(@Request() req, @Res() res) {
    const { access_token } = await this.authService.login(req.user);
    const redirectUrl = new URL(this.configService.get(ConfigKeys.ADMIN_SITE) + '/login');
    redirectUrl.searchParams.append('access_token', access_token);
    res.redirect(301, redirectUrl.toString());
  }
}
