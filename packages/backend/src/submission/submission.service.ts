import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Poll } from '../schemas/poll.schema';
import { Submission } from '../schemas/submission.schema';
import { CreateSubmissionDto } from '../types/submission.dto';

@Injectable()
export class SubmissionService {
  constructor(
    @InjectModel(Submission.name) private readonly submissionModel: Model<Submission>,
    @InjectModel(Poll.name) private readonly pollModel: Model<Poll>
  ) {}

  async createSubmission(pollId: string, dto: CreateSubmissionDto) {
    const poll = await this.pollModel.findById(pollId);
    if (!poll) throw new NotFoundException();
    return this.submissionModel.create({ ...dto, poll: poll._id });
  }

  async getSubmissionsForPoll(pollId: string) {
    return this.submissionModel.find({ poll: pollId });
  }
}
