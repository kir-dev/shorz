import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Poll } from '../schemas/poll.schema';
import { Submission } from '../schemas/submission.schema';
import { CreateSubmissionDto } from '../types/submission.dto';
import { User } from 'src/schemas/users.schema';

@Injectable()
export class SubmissionService {
  constructor(
    @InjectModel(Submission.name) private readonly submissionModel: Model<Submission>,
    @InjectModel(Poll.name) private readonly pollModel: Model<Poll>
  ) {}

  async createSubmission(pollId: string, dto: CreateSubmissionDto, user: User | undefined) {
    const poll = await this.pollModel.findById(pollId).populate('group');
    if (!poll) throw new NotFoundException('Űrlap nem található');
    if (!poll.enabled) return new ForbiddenException('A kitöltés nem engedélyezett!');
    if (!user && (poll.group || poll.confidential)) {
      throw new UnauthorizedException('A szavazáshoz be kell jelentkezned!');
    }
    if (poll.group && !poll.group.memberIds.includes(user.authId)) {
      throw new ForbiddenException('Te nem szavazhatsz ezen a szavazáson!');
    }
    if (poll.confidential) {
      const submissions = await this.submissionModel.find({ name: user.authId, poll: poll._id });
      if (submissions.length > 0) throw new ConflictException('Már szavaztál ezen a szavazáson!');
    }
    return this.submissionModel.create({ ...dto, poll: poll._id });
  }
}
