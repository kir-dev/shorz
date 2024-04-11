import {
  Button,
  ButtonGroup,
  CardBody,
  CardFooter,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Switch,
  VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { NavButton } from '../../components/button/NavButton';
import { AnswerOptionsField } from '../../components/poll/AnswerOptionsField';
import { UIPaths } from '../../config/paths.config';
import { Page } from '../../layout/Page';
import { useGroups } from '../../network/groups/useGroups.network';
import { useCreatePoll } from '../../network/poll/useCreatePoll.network';
import { CreatePollDto } from '../../types/dto.types';
import { l } from '../../utils/language';
import { PollTypeOptions } from '../../utils/mappings';
import { joinPath } from '../../utils/path';
import { pollValidation } from '../../utils/validation';

export function CreatePollPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const adminGroups = useGroups(true);
  const { isLoading, mutate } = useCreatePoll((responseData) => {
    navigate(joinPath(UIPaths.POLL, responseData._id));
  });
  const group = searchParams.get('groupId');
  const form = useForm<CreatePollDto>({
    resolver: yupResolver(pollValidation),
    defaultValues: {
      name: '',
      enabled: Boolean(group),
      confidential: Boolean(group),
      question: '',
      type: 0,
      answerOptions: [],
      group: group ?? '',
    },
  });
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  const onSubmit = (values: CreatePollDto) => {
    mutate({
      name: values.name,
      enabled: values.enabled,
      confidential: values.confidential,
      question: values.question,
      type: +values.type,
      answerOptions: values.answerOptions,
      group: values.group || undefined,
    });
  };
  return (
    <Page title={l('title.createPoll')}>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardBody>
            <VStack>
              <FormControl isInvalid={!!errors.name}>
                <FormLabel>{l('form.poll.label.name')}</FormLabel>
                <Input {...register('name')} />
                {!!errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>}
              </FormControl>
              <FormControl isInvalid={!!errors.question}>
                <FormLabel>{l('form.poll.label.question')}</FormLabel>
                <Input {...register('question')} />
                {!!errors.question && <FormErrorMessage>{errors.question.message}</FormErrorMessage>}
              </FormControl>
              <FormControl isInvalid={!!errors.type}>
                <FormLabel>{l('form.poll.label.type')}</FormLabel>
                <Select {...register('type')}>
                  {Object.values(PollTypeOptions).map((opt) => (
                    <option value={opt.value} key={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </Select>
                {!!errors.type && <FormErrorMessage>{errors.type.message}</FormErrorMessage>}
              </FormControl>
              <FormControl isInvalid={!!errors.answerOptions}>
                <FormLabel>{l('form.poll.label.answerOptions')}</FormLabel>
                <AnswerOptionsField />
              </FormControl>
              <FormControl isInvalid={!!errors.enabled}>
                <FormLabel>{l('form.poll.label.enabled')}</FormLabel>
                <Switch {...register('enabled')} />
              </FormControl>
              <FormControl isInvalid={!!errors.confidential}>
                <FormLabel>{l('form.poll.label.confidential')}</FormLabel>
                <Switch {...register('confidential')} />
              </FormControl>
              {watch('confidential') && adminGroups.data && adminGroups.data.length > 0 && (
                <FormControl isInvalid={!!errors.group}>
                  <FormLabel>{l('form.poll.label.group')}</FormLabel>
                  <Select {...register('group')}>
                    {adminGroups.data?.map((group) => (
                      <option value={group._id} key={group._id}>
                        {group.name}
                      </option>
                    ))}
                    <option value='' key=''>
                      {l('form.poll.placeholder.group')}
                    </option>
                  </Select>
                  {!!errors.group && <FormErrorMessage>{errors.group.message}</FormErrorMessage>}
                </FormControl>
              )}
            </VStack>
          </CardBody>
          <CardFooter>
            <ButtonGroup>
              <Button isLoading={isLoading} type='submit'>
                {l('button.save')}
              </Button>
              <NavButton variant='ghost' to={UIPaths.POLL}>
                {l('button.cancel')}
              </NavButton>
            </ButtonGroup>
          </CardFooter>
        </form>
      </FormProvider>
    </Page>
  );
}
