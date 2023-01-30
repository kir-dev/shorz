import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/users.schema';
import { Model, Types } from 'mongoose';
import { Link, LinkDocument } from '../schemas/link.schema';
import { CreateLinkDto, PatchLinkDto } from '../types/dto.types';
import generateRandomString from '../utils/randomString';

@Injectable()
export class LinksService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Link.name) private readonly linkModel: Model<Link>
  ) {}

  async getMyLinks(ids: Types.ObjectId[]): Promise<LinkDocument[] | undefined> {
    return this.linkModel.find({
      _id: {
        $in: ids,
      },
    });
  }

  async getLink(linkId: Types.ObjectId): Promise<LinkDocument | undefined> {
    return this.linkModel.findById(linkId);
  }

  async getLinkByShortId(shortId: string, saveTime = true): Promise<LinkDocument | undefined> {
    const link = await this.linkModel.findOne({ shortId });
    if (!link) return null;
    if (saveTime) {
      this.linkModel
        .updateOne({ _id: link._id }, { $set: { timestamps: [...link.timestamps, Date.now()] } })
        .exec()
        .catch(console.error);
    }
    return link;
  }

  async deleteLink(linkId: Types.ObjectId) {
    return this.linkModel.deleteOne({ _id: linkId });
  }

  async createLink(createLinkDto: CreateLinkDto) {
    return await this.linkModel.create({ ...createLinkDto, timestamps: [], shortId: generateRandomString() });
  }

  async patchLink(linkId: Types.ObjectId, { name, url }: PatchLinkDto) {
    const link = await this.linkModel.findById(linkId);
    if (typeof name !== 'undefined') {
      link.name = name;
    }
    if (typeof url !== 'undefined') {
      link.url = url;
    }
    return this.linkModel.updateOne({ _id: linkId }, { $set: { name: link.name, url: link.url } });
  }
}
