import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateSubmissionDto } from '../types/submission.dto';
import { SubmissionService } from './submission.service';

@Controller('submission')
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}

  @Post(':id')
  async createSubmission(@Param('id') id: string, @Body() dto: CreateSubmissionDto) {
    return this.submissionService.createSubmission(id, dto);
  }
}
