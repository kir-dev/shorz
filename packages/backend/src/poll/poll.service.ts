import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Poll } from '../schemas/poll.schema';
import { Submission } from '../schemas/submission.schema';
import { CreatePollDto, PatchPollDto } from '../types/poll.dto';

@Injectable()
export class PollService {
  constructor(
    @InjectModel(Poll.name) private readonly pollModel: Model<Poll>,
    @InjectModel(Submission.name) private readonly submissionModel: Model<Submission>
  ) {}

  async validateOwnership(userId: Types.ObjectId, id: Types.ObjectId) {
    const poll = await this.pollModel.find({ _id: id, user: userId });
    return !!poll;
  }

  async getPollsForUser(userId: Types.ObjectId) {
    return this.pollModel.find({ user: userId });
  }

  async getPollById(id: Types.ObjectId) {
    return (
      await this.pollModel
        .aggregate([
          { $match: { _id: id } },
          { $lookup: { from: 'submissions', localField: '_id', foreignField: 'poll', as: 'submissions' } },
        ])
        .exec()
    )?.[0];
  }

  async getPublicPollById(id: Types.ObjectId) {
    return this.pollModel.findById(id).select({ user: 0 });
  }

  async createPoll(userId: Types.ObjectId, dto: CreatePollDto) {
    return this.pollModel.create({ ...dto, user: userId });
  }

  async updatePoll(id: Types.ObjectId, dto: PatchPollDto) {
    return this.pollModel.updateOne({ _id: id }, { $set: dto });
  }

  async deletePoll(id: Types.ObjectId) {
    await this.submissionModel.deleteMany({ poll: id });
    return this.pollModel.findByIdAndDelete({ _id: id });
  }
}
