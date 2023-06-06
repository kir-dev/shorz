import { Controller, Get, ParseIntPipe, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { QrcodeService } from './qrcode.service';

@Controller('qrcode')
export class QrcodeController {
  constructor(private readonly qrcodeService: QrcodeService) {}

  @Get()
  async getQrcode(@Query('data') data: string, @Query('scale', ParseIntPipe) scale: number, @Res() res: Response) {
    const qr = await this.qrcodeService.getQrcode(data, scale);
    res.type('png');
    res.send(qr);
  }
}
