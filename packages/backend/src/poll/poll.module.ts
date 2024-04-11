import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Poll, PollSchema } from '../schemas/poll.schema';
import { Submission, SubmissionSchema } from '../schemas/submission.schema';
import { SubmissionController } from '../submission/submission.controller';
import { SubmissionService } from '../submission/submission.service';
import { PollController } from './poll.controller';
import { PublicPollController } from './poll.public.controller';
import { PollService } from './poll.service';
import { Group, GroupSchema } from 'src/schemas/group.schema';
import { User, UserSchema } from 'src/schemas/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Poll.name, schema: PollSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]),
    MongooseModule.forFeature([{ name: Submission.name, schema: SubmissionSchema }]),
  ],
  providers: [PollService, SubmissionService],
  controllers: [PollController, PublicPollController, SubmissionController],
})
export class PollModule {}
