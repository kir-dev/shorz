import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { UserDocument } from 'src/schemas/users.schema';
import { JwtAuthGuard } from 'src/strategies/jwt.strategy';
import { AddMemberDto, CreateGroupDto } from 'src/types/group.dto';
import { GroupsService } from './groups.service';

@UseGuards(JwtAuthGuard)
@Controller('admin/groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  create(@Req() req, @Body() createGroupDto: CreateGroupDto) {
    const user = req.user as UserDocument;
    return this.groupsService.create(createGroupDto, user._id);
  }

  @Post(':id/members/')
  addMember(@Req() req, @Param('id') id: string, @Body() dto: AddMemberDto) {
    const user = req.user as UserDocument;
    return this.groupsService.addMember(dto, id, user._id);
  }

  @Delete(':id/members/:memberId')
  removeMembers(@Req() req, @Param('id') id: string, @Param('memberId') memberId: string) {
    const user = req.user as UserDocument;
    return this.groupsService.removeMember(memberId, id, user._id);
  }

  @Get()
  findAll(@Req() req, @Query('with-admin') withAdmin: string) {
    const user = req.user as UserDocument;
    return this.groupsService.findAll(user, withAdmin === 'true');
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
