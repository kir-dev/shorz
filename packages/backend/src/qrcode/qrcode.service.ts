import { Injectable } from '@nestjs/common';
import { toBuffer } from 'qrcode';

@Injectable()
export class QrcodeService {
  async getQrcode(text: string, scale = 10) {
    return await toBuffer(text, { scale });
  }
}
