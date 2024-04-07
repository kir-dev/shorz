import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Poll } from '../schemas/poll.schema';
import { Submission } from '../schemas/submission.schema';
import {
  ConfidentialPollResult,
  CreatePollDto,
  PatchPollDto,
  PollWithSubmissions,
  SubmissionAnswerValue,
} from '../types/poll.dto';
import { Group } from 'src/schemas/group.schema';
import { User } from 'src/schemas/users.schema';

@Injectable()
export class PollService {
  constructor(
    @InjectModel(Poll.name) private readonly pollModel: Model<Poll>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Submission.name) private readonly submissionModel: Model<Submission>,
    @InjectModel(Group.name) private readonly groupModel: Model<Group>
  ) {}

  async validateOwnership(userId: Types.ObjectId, id: Types.ObjectId) {
    const poll = await this.pollModel.find({ _id: id, user: userId });
    return !!poll;
  }

  async getPollsForUser(userId: Types.ObjectId) {
    return this.pollModel.find({ user: userId });
  }

  async getPollById(id: Types.ObjectId) {
    const pollWithSubmissions: PollWithSubmissions = (
      await this.pollModel
        .aggregate([
          { $match: { _id: id } },
          { $lookup: { from: 'submissions', localField: '_id', foreignField: 'poll', as: 'submissions' } },
        ])
        .exec()
    )?.[0];
    if (!pollWithSubmissions) throw new NotFoundException('A szavazás nem található!');
    if (!pollWithSubmissions.confidential) return pollWithSubmissions;
    const { submissions, ...poll } = pollWithSubmissions;
    const voteInfo = {
      voted: [],
      notVoted: [],
    };
    if (poll.group) {
      const group = await this.groupModel.findById(poll.group);
      const users = await this.userModel.find({ authId: { $in: group.memberIds } });
      voteInfo.voted = group.memberIds
        .filter((id) => submissions.map((s) => s.name).includes(id))
        .map((id) => users.find((u) => u.authId === id).displayName);
      voteInfo.notVoted = group.memberIds
        .filter((id) => !submissions.map((s) => s.name).includes(id))
        .map((id) => users.find((u) => u.authId === id)?.displayName ?? id);
    }

    if (pollWithSubmissions.enabled) {
      return { ...poll, voteInfo: poll.group ? voteInfo : undefined };
    } else {
      const results: ConfidentialPollResult[] = poll.answerOptions.map((k) => ({
        key: k,
        [SubmissionAnswerValue.NO]: submissions.reduce(
          (count, s) => count + s.answers.filter((a) => a.key === k && a.value === SubmissionAnswerValue.NO).length,
          0
        ),
        [SubmissionAnswerValue.YES]: submissions.reduce(
          (count, s) => count + s.answers.filter((a) => a.key === k && a.value === SubmissionAnswerValue.YES).length,
          0
        ),
        [SubmissionAnswerValue.MAYBE]: submissions.reduce(
          (count, s) => count + s.answers.filter((a) => a.key === k && a.value === SubmissionAnswerValue.MAYBE).length,
          0
        ),
      }));
      return {
        ...poll,
        results,
        voteInfo: poll.group ? voteInfo : undefined,
      };
    }
  }

  async getPublicPollById(id: Types.ObjectId) {
    return this.pollModel.findById(id).select({ user: 0 });
  }

  async createPoll(userId: Types.ObjectId, dto: CreatePollDto) {
    return this.pollModel.create({ ...dto, user: userId });
  }

  async updatePoll(id: Types.ObjectId, dto: PatchPollDto) {
    const pollWithSubmissions: PollWithSubmissions = (
      await this.pollModel
        .aggregate([
          { $match: { _id: id } },
          { $lookup: { from: 'submissions', localField: '_id', foreignField: 'poll', as: 'submissions' } },
        ])
        .exec()
    )?.[0];

    if (
      dto.enabled &&
      !pollWithSubmissions.enabled &&
      pollWithSubmissions.confidential &&
      pollWithSubmissions.submissions.length > 0
    ) {
      throw new BadRequestException('Bizalmas szavazást nem lehet újra engedélyezni!');
    }

    return this.pollModel.updateOne({ _id: id }, { $set: dto });
  }

  async deletePoll(id: Types.ObjectId) {
    await this.submissionModel.deleteMany({ poll: id });
    return this.pollModel.findByIdAndDelete({ _id: id });
  }
}
