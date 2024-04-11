import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { OptionalAuthGuard } from '../auth/auth.guard';
import { getObjectId } from '../utils/getObjectId';
import { PollService } from './poll.service';

@Controller('poll')
export class PublicPollController {
  constructor(private readonly pollService: PollService) {}

  @UseGuards(OptionalAuthGuard)
  @Get(':id')
  async getPoll(@Param('id') id: string, @Req() req) {
    return await this.pollService.getPublicPollById(getObjectId(id), req.user);
  }
}
