import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Group } from 'src/schemas/group.schema';
import { Poll } from 'src/schemas/poll.schema';
import { User, UserDocument } from 'src/schemas/users.schema';
import { AddMemberDto, CreateGroupDto, GroupDto } from 'src/types/group.dto';

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel(Group.name) private readonly groupModel: Model<Group>,
    @InjectModel(Poll.name) private readonly pollModel: Model<Poll>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {}

  create(dto: CreateGroupDto, userId: Types.ObjectId) {
    return this.groupModel.create({ ...dto, admin: userId });
  }

  async addMember(dto: AddMemberDto, groupId: string, userId: Types.ObjectId) {
    const group = await this.groupModel.findOne({ admin: userId, _id: groupId });
    if (!group) {
      throw new ForbiddenException('Nincs jogod tagok hozzáadásához!');
    }
    const member = await this.userModel.findOne({ mail: dto.memberMail });
    if (!member) {
      throw new NotFoundException('A felhasználó nem található!');
    }
    const uniqueMembers = new Set([...group.memberIds, member._id.toString()]);
    return await this.groupModel.updateOne(
      { _id: groupId },
      { $set: { memberIds: Array.from(uniqueMembers.values()) } }
    );
  }

  async removeMember(memberId: string, groupId: string, userId: Types.ObjectId) {
    const group = await this.groupModel.findOne({ _id: groupId, admin: userId });
    if (!group) {
      throw new ForbiddenException('Nincs jogod tagok törléséhez!');
    }
    const uniqueMembers = group.memberIds.filter((m) => m.toString() !== memberId);
    return await this.groupModel.updateOne({ _id: groupId }, { $set: { memberIds: uniqueMembers } });
  }

  async findAll(user: UserDocument, withAdmin: boolean) {
    const groups = await this.groupModel.find({
      $or: [
        { admin: user._id },
        {
          memberIds: {
            $elemMatch: { $eq: user._id.toString() },
          },
        },
      ],
    });
    return groups
      .map((group) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { admin, memberIds, ...g } = group.toJSON();
        return { ...g, isAdmin: admin.toString() === user._id.toString() };
      })
      .filter((g) => !withAdmin || g.isAdmin);
  }

  async findOne(id: string, user: UserDocument): Promise<GroupDto> {
    const group = await this.groupModel.findOne({
      _id: id,
      $or: [
        { admin: user._id },
        {
          memberIds: {
            $elemMatch: { $eq: user._id.toString() },
          },
        },
      ],
    });
    if (!group) {
      throw new NotFoundException('A csoport nem található!');
    }
    const polls = await this.pollModel
      .aggregate([
        { $match: { group: id } },
        {
          $lookup: { from: 'submissions', localField: '_id', foreignField: 'poll', as: 'submissions' },
        },
      ])
      .exec();
    const filteredPolls = polls.map((p) => {
      const { submissions, ...poll } = p;
      return { ...poll, submissions: submissions.filter((s) => s.name === user.authId) };
    });
    const members = await this.userModel.find({ _id: { $in: group.memberIds } });
    return { polls: filteredPolls, members, name: group.name, isAdmin: group.admin.toString() === user._id.toString() };
  }

  async update(id: string, dto: CreateGroupDto, userId: Types.ObjectId) {
    const group = await this.groupModel.findOne({ _id: id, admin: userId });
    if (!group) {
      throw new ForbiddenException('Nincs jogod a csoport szerkesztéséhez!');
    }

    return this.groupModel.updateOne({ _id: id }, { $set: dto });
  }

  async remove(id: string, userId: Types.ObjectId) {
    const group = await this.groupModel.findOne({ _id: id, admin: userId });
    if (!group) {
      throw new ForbiddenException('Nincs jogod a csoport törléséhez!');
    }

    return this.groupModel.deleteOne({ _id: id });
  }
}
