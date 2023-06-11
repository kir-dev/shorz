import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { RoleBasedAuthGuard } from '../auth/role.guard';
import { LinksService } from './links.service';
import { UserDocument } from '../schemas/users.schema';
import { Types } from 'mongoose';
import { CreateLinkDto, PatchLinkDto } from '../types/link.dto';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from '../strategies/jwt.strategy';

@Controller('admin/link')
export class LinksController {
  constructor(private readonly linksService: LinksService, private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getLinks(@Request() req) {
    const user = req.user as UserDocument;
    return await this.linksService.getMyLinks(user.links.map((id) => new Types.ObjectId(id)));
  }

  @UseGuards(RoleBasedAuthGuard())
  @Get(':id')
  async getLink(@Param('id') id: string) {
    return await this.linksService.getLink(new Types.ObjectId(id));
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createLink(@Body() createLinkDto: CreateLinkDto, @Request() req) {
    const user = req.user as UserDocument;
    if (!user.isAdmin && createLinkDto.shortId) return new BadRequestException();
    const link = await this.linksService.createLink(createLinkDto);
    await this.usersService.addLink(user._id, link._id);
    return link;
  }

  @UseGuards(RoleBasedAuthGuard())
  @Delete(':id')
  async deleteLink(@Param('id') id: string, @Request() req) {
    const user = req.user as UserDocument;
    const result = await this.linksService.deleteLink(new Types.ObjectId(id));
    await this.usersService.removeLink(user._id, new Types.ObjectId(id));
    return result;
  }

  @UseGuards(RoleBasedAuthGuard())
  @Patch(':id')
  async patchLink(@Param('id') id: string, @Body() patchLinkDto: PatchLinkDto) {
    return await this.linksService.patchLink(new Types.ObjectId(id), patchLinkDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('url/:url')
  async getLinkByUrl(@Param('url') url: string) {
    return await this.linksService.getLinkByUrl(url);
  }
}
