import { Controller, Get, Param, Res } from '@nestjs/common';
import { LinksService } from '../links/links.service';

@Controller('ly')
export class RedirectController {
  constructor(private readonly linksService: LinksService) {}

  @Get(':shortId')
  async redirect(@Param('shortId') shortId: string, @Res() res) {
    const link = await this.linksService.getLinkByShortId(shortId);
    res.redirect(link.url);
  }
}
