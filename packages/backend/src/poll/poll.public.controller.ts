import { Controller, Get, Param } from '@nestjs/common';
import { getObjectId } from '../utils/getObjectId';
import { PollService } from './poll.service';

@Controller('poll')
export class PublicPollController {
  constructor(private readonly pollService: PollService) {}

  @Get(':id')
  async getPoll(@Param('id') id: string) {
    return await this.pollService.getPublicPollById(getObjectId(id));
  }
}
