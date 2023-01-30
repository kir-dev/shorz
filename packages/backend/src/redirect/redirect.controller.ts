import { Controller, Get, Param, Res } from '@nestjs/common';
import { LinksService } from '../links/links.service';
import { ConfigService } from '@nestjs/config';
import { ConfigKeys } from '../utils/configuration';

@Controller('ly')
export class RedirectController {
  constructor(private readonly linksService: LinksService, private readonly configService: ConfigService) {}

  @Get(':shortId')
  async redirect(@Param('shortId') shortId: string, @Res() res) {
    const link = await this.linksService.getLinkByShortId(shortId);
    if (link) res.redirect(link.url);
    else res.redirect(this.configService.get(ConfigKeys.ADMIN_SITE) + '/404');
  }
}
