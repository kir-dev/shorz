import { array, number, object, SchemaOf, string } from 'yup';

import { CreateLinkDto, CreatePollDto, CreateSubmissionDto } from '../types/dto.types';
import { l } from './language';

const urlRegex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;

export const linkValidation: SchemaOf<CreateLinkDto> = object({
  name: string().required(l('form.validation.required')),
  url: string().matches(urlRegex, l('form.validation.url')).required(l('form.validation.required')),
  shortId: string().matches(/^[A-Za-z]*$/, l('form.validation.shortId')),
});

export const pollValidation: SchemaOf<CreatePollDto> = object({
  name: string().required(l('form.validation.required')),
  question: string().required(l('form.validation.required')),
  type: number().required(l('form.validation.required')),
  answerOptions: array().min(1, l('form.validation.min')),
});

export const submissionValidation: SchemaOf<CreateSubmissionDto> = object({
  name: string().required(l('form.validation.required')),
  answers: array(),
});
