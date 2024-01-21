import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, UpdateWriteOpResult } from 'mongoose';
import { User, UserDocument } from '../schemas/users.schema';
import { Auth0Profile, AuthSchProfile } from '../types/auth.types';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async createUser(authSchProfile: AuthSchProfile): Promise<UserDocument> {
    return this.userModel.create({
      authId: authSchProfile.internal_id,
      mail: authSchProfile.mail,
      displayName: authSchProfile.displayName,
      isAdmin: false,
      links: [],
    });
  }

  async createUserForAuth0User(auth0Profile: Auth0Profile): Promise<UserDocument> {
    return this.userModel.create({
      authId: auth0Profile.sub,
      mail: auth0Profile.email,
      displayName: auth0Profile.name,
      isAdmin: false,
      links: [],
    });
  }

  async addLink(userId: Types.ObjectId, linkId: Types.ObjectId) {
    const user = await this.userModel.findById(userId);
    user.links.push(linkId);
    await this.userModel.updateOne({ _id: user._id }, { $set: { links: user.links } });
  }

  async removeLink(userId: Types.ObjectId, linkId: Types.ObjectId) {
    const user = await this.userModel.findById(userId);
    user.links.filter((l) => l.toString() !== linkId.toString());
    await this.userModel.updateOne({ _id: user._id }, { $set: { links: user.links } });
  }

  async getUsers(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async getUserById(userId: string): Promise<UserDocument | undefined> {
    return this.userModel.findById(userId);
  }

  async getUserByAuthId(authId: string): Promise<UserDocument | undefined> {
    return this.userModel.findOne({ authId: authId });
  }

  async setUserAdminRole(userId: string, isAdmin: boolean): Promise<UpdateWriteOpResult | undefined> {
    return this.userModel.updateOne({ _id: userId }, { $set: { isAdmin } });
  }
}
