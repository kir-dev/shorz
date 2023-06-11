import { BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

export function getObjectId(id: string) {
  if (!Types.ObjectId.isValid(id)) throw new BadRequestException();
  return new Types.ObjectId(id);
}
