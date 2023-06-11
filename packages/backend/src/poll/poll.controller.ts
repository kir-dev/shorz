import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserDocument } from '../schemas/users.schema';
import { JwtAuthGuard } from '../strategies/jwt.strategy';
import { CreatePollDto, PatchPollDto } from '../types/poll.dto';
import { getObjectId } from '../utils/getObjectId';
import { PollService } from './poll.service';

@Controller('admin/poll')
export class PollController {
  constructor(private readonly pollService: PollService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getPolls(@Request() req) {
    const user = req.user as UserDocument;
    return await this.pollService.getPollsForUser(user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getPoll(@Param('id') id: string, @Request() req) {
    const user = req.user as UserDocument;
    if (!(await this.pollService.validateOwnership(user._id, getObjectId(id)))) return new ForbiddenException();
    return await this.pollService.getPollById(getObjectId(id));
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPoll(@Body() dto: CreatePollDto, @Request() req) {
    const user = req.user as UserDocument;
    return await this.pollService.createPoll(user._id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async patchPoll(@Param('id') id: string, @Body() dto: PatchPollDto, @Request() req) {
    const user = req.user as UserDocument;
    if (!(await this.pollService.validateOwnership(user._id, getObjectId(id)))) return new ForbiddenException();
    return this.pollService.updatePoll(getObjectId(id), dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deletePoll(@Param('id') id: string, @Request() req) {
    const user = req.user as UserDocument;
    if (!(await this.pollService.validateOwnership(user._id, getObjectId(id)))) return new ForbiddenException();
    return await this.pollService.deletePoll(getObjectId(id));
  }
}
