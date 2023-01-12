import { Module } from '@nestjs/common';
import { RedirectController } from './redirect.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Link, LinkSchema } from '../schemas/link.schema';
import { LinksService } from '../links/links.service';
import { User, UserSchema } from '../schemas/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Link.name, schema: LinkSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [RedirectController],
  providers: [LinksService],
})
export class RedirectModule {}
