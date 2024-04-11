import {
  Button,
  Card,
  CardBody,
  CardFooter,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { AnswerField } from '../../components/poll/AnswerField';
import { UIPaths } from '../../config/paths.config';
import { useAuthContext } from '../../context/auth.context';
import { Page } from '../../layout/Page';
import { useCreateSubmission } from '../../network/poll/useCreateSubmission.network';
import { usePublicPoll } from '../../network/poll/usePublicPoll.network';
import { CreateSubmissionDto } from '../../types/dto.types';
import { SubmissionAnswer, SubmissionAnswerValue } from '../../types/types';
import { l } from '../../utils/language';
import { confidentialSubmissionValidation, submissionValidation } from '../../utils/validation';
import { ErrorPage } from '../utility/Error.page';
import { LoadingPage } from '../utility/Loading.page';
import { FillPollDisabledPage } from './FillPollDisabled.page';
import { FillPollSuccessPage } from './FillPollSuccess.page';

export function FillPollPage() {
  const { id } = useParams();
  const { data, isLoading, isError } = usePublicPoll(id);
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { isLoading: isSubmitLoading, mutate } = useCreateSubmission(id, () => navigate(UIPaths.FILL_SUCCESS));
  const form = useForm<CreateSubmissionDto>({
    resolver: yupResolver(data?.confidential || data?.group ? confidentialSubmissionValidation : submissionValidation),
    defaultValues: { name: '', answers: getDefaultAnswerArray(data?.answerOptions ?? []) },
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (data) {
      reset({ answers: getDefaultAnswerArray(data.answerOptions) });
    }
  }, [data]);

  if (isLoading) return <LoadingPage />;
  if (!data || isError) return <ErrorPage message={l('error.notFound')} />;
  const onSubmit = (values: CreateSubmissionDto) => {
    if (data.confidential || data.group) {
      mutate({ ...values, name: user?.authId ?? '' });
    } else {
      mutate(values);
    }
  };
  if (!data.enabled) {
    return <FillPollDisabledPage title={data.question} />;
  }
  if (data.submission) return <FillPollSuccessPage />;
  return (
    <Page title={data.question}>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <CardBody>
              <VStack spacing={5}>
                {!data.confidential && !data.group && (
                  <FormControl isInvalid={!!errors.name}>
                    <FormLabel>{l('form.poll.label.name')}</FormLabel>
                    <Input {...register('name')} />
                    {!!errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>}
                  </FormControl>
                )}
                <FormControl isInvalid={!!errors.answers}>
                  <FormLabel>{l('form.poll.label.answerOptions')}</FormLabel>
                  <AnswerField pollType={data.type} />
                  {!!errors.answers && <FormErrorMessage>{errors.answers.message}</FormErrorMessage>}
                </FormControl>
              </VStack>
            </CardBody>
            <CardFooter>
              <Button isLoading={isSubmitLoading} type='submit'>
                {l('button.save')}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </FormProvider>
    </Page>
  );
}

function getDefaultAnswerArray(answerOptions: string[]): SubmissionAnswer[] {
  return answerOptions.map((ao) => ({ key: ao, value: SubmissionAnswerValue.NO }));
}
