import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { JwtAuthGuard } from 'src/strategies/jwt.strategy';
import { AddMembersDto, CreateGroupDto } from 'src/types/group.dto';
import { UserDocument } from 'src/schemas/users.schema';

@UseGuards(JwtAuthGuard)
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  create(@Req() req, @Body() createGroupDto: CreateGroupDto) {
    const user = req.user as UserDocument;
    return this.groupsService.create(createGroupDto, user._id);
  }

  @Post(':id/members/')
  addMembers(@Req() req, @Param('id') id: string, @Body() dto: AddMembersDto) {
    const user = req.user as UserDocument;
    return this.groupsService.addMembers(dto, id, user._id);
  }

  @Delete(':id/members/')
  removeMembers(@Req() req, @Param('id') id: string, @Body() dto: AddMembersDto) {
    const user = req.user as UserDocument;
    return this.groupsService.removeMembers(dto, id, user._id);
  }

  @Get()
  findAll(@Req() req) {
    const user = req.user as UserDocument;
    return this.groupsService.findAll(user);
  }

  @Get(':id')
  findOne(@Req() req, @Param('id') id: string) {
    const user = req.user as UserDocument;
    return this.groupsService.findOne(id, user);
  }

  @Patch(':id')
  update(@Req() req, @Param('id') id: string, @Body() updateGroupDto: CreateGroupDto) {
    const user = req.user as UserDocument;
    return this.groupsService.update(id, updateGroupDto, user._id);
  }

  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    const user = req.user as UserDocument;
    return this.groupsService.remove(id, user._id);
  }
}
