import { Body, Controller, Param, Post, Request, UseGuards } from '@nestjs/common';
import { CreateSubmissionDto } from '../types/submission.dto';
import { SubmissionService } from './submission.service';
import { OptionalAuthGuard } from 'src/auth/auth.guard';

@Controller('submission')
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}

  @Post(':id')
  @UseGuards(OptionalAuthGuard)
  async createSubmission(@Param('id') id: string, @Body() dto: CreateSubmissionDto, @Request() req) {
    return this.submissionService.createSubmission(id, dto, req.user);
  }
}
