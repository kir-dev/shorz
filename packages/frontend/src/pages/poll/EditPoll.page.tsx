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
  VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { NavButton } from '../../components/button/NavButton';
import { AnswerOptionsField } from '../../components/poll/AnswerOptionsField';
import { UIPaths } from '../../config/paths.config';
import { Page } from '../../layout/Page';
import { usePatchPoll } from '../../network/poll/usePatchPoll.network';
import { usePoll } from '../../network/poll/usePoll.network';
import { PatchPollDto } from '../../types/dto.types';
import { l } from '../../utils/language';
import { PollTypeOptions } from '../../utils/mappings';
import { joinPath } from '../../utils/path';
import { pollValidation } from '../../utils/validation';
import { ErrorPage } from '../utility/Error.page';
import { LoadingPage } from '../utility/Loading.page';

export function EditPollPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { isLoading, mutate } = usePatchPoll(id, () => navigate(joinPath(UIPaths.POLL, id ?? '')));
  const { isLoading: isPollLoading, data, isError } = usePoll(id);

  const form = useForm<PatchPollDto>({ resolver: yupResolver(pollValidation) });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  useEffect(() => {
    reset(data);
  }, [data]);

  if (isPollLoading) return <LoadingPage />;
  if (!data || isError) return <ErrorPage />;

  const onSubmit = (values: PatchPollDto) => {
    mutate(values);
  };

  return (
    <Page title={l('title.editPoll')}>
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
            </VStack>
          </CardBody>
          <CardFooter>
            <ButtonGroup>
              <Button isLoading={isLoading} type='submit'>
                {l('button.save')}
              </Button>
              <NavButton variant='ghost' to={joinPath(UIPaths.POLL, id ?? '')}>
                {l('button.cancel')}
              </NavButton>
            </ButtonGroup>
          </CardFooter>
        </form>
      </FormProvider>
    </Page>
  );
}
