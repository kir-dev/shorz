import { object, SchemaOf, string } from 'yup';

import { CreateLinkDto } from '../types/dto.types';
import { l } from './language';

const urlRegex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;

export const linkValidation: SchemaOf<CreateLinkDto> = object({
  name: string().required(l('form.validation.required')),
  url: string().matches(urlRegex, l('form.validation.url')).required(l('form.validation.required')),
});
