import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Group } from 'src/schemas/group.schema';
import { Poll } from 'src/schemas/poll.schema';
import { UserDocument } from 'src/schemas/users.schema';
import { AddMembersDto, CreateGroupDto } from 'src/types/group.dto';

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel(Group.name) private readonly groupModel: Model<Group>,
    @InjectModel(Poll.name) private readonly pollModel: Model<Poll>
  ) {}

  create(dto: CreateGroupDto, userId: Types.ObjectId) {
    return this.groupModel.create({ ...dto, admin: userId });
  }

  async addMembers(dto: AddMembersDto, groupId: string, userId: Types.ObjectId) {
    const group = await this.groupModel.findOne({ admin: userId, _id: groupId });
    if (!group) {
      throw new ForbiddenException('Nincs jogod tagok hozzáadásához!');
    }
    const uniqueMembers = new Set([...group.memberIds, ...dto.members]);
    return await this.groupModel.updateOne(
      { _id: groupId },
      { $set: { memberIds: Array.from(uniqueMembers.values()) } }
    );
  }

  async removeMembers(dto: AddMembersDto, groupId: string, userId: Types.ObjectId) {
    const group = await this.groupModel.findOne({ admin: userId });
    if (!group) {
      throw new ForbiddenException('Nincs jogod tagok törléséhez!');
    }
    const uniqueMembers = group.memberIds.filter((m) => !dto.members.includes(m));
    return await this.groupModel.updateOne({ _id: groupId }, { $set: { memberIds: uniqueMembers } });
  }

  async findAll(user: UserDocument) {
    const groups = await this.groupModel.find({
      $or: [{ admin: user._id }, { memberIds: user.authId }],
    });
    return groups.map((group) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { admin, memberIds, ...g } = group.toJSON();
      return { ...g, isAdmin: admin.toString() === user._id.toString() };
    });
  }

  async findOne(id: string, user: UserDocument) {
    const group = await this.groupModel.findOne({
      _id: id,
      $or: [{ admin: user._id }, { members: user.authId }],
    });
    if (!group) {
      throw new NotFoundException('A csoport nem található!');
    }
    const polls = await this.pollModel.find({ group: id });
    return { ...group.toJSON(), polls };
  }

  async update(id: string, dto: CreateGroupDto, userId: Types.ObjectId) {
    const group = await this.groupModel.findOne({ admin: userId });
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
