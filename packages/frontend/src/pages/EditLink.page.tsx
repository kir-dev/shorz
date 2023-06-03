import {
  Button,
  ButtonGroup,
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
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { NavButton } from '../components/NavButton';
import { UIPaths } from '../config/paths.config';
import { Page } from '../layout/Page';
import { useLink } from '../network/useLink.network';
import { usePatchLink } from '../network/usePatchLink.network';
import { PatchLinkDto } from '../types/dto.types';
import { l } from '../utils/language';
import { joinPath } from '../utils/path';
import { linkValidation } from '../utils/validation';
import { ErrorPage } from './Error.page';
import { LoadingPage } from './Loading.page';

export function EditLinkPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isLoading, mutate } = usePatchLink(id, () => navigate(joinPath(UIPaths.LINK, id ?? '')));
  const { isLoading: isLinkLoading, data, isError } = useLink(id);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PatchLinkDto>({ resolver: yupResolver(linkValidation) });
  useEffect(() => {
    reset(data);
  }, [data]);
  if (isLinkLoading) return <LoadingPage />;
  if (!data || isError) return <ErrorPage />;
  const onSubmit = (values: PatchLinkDto) => {
    mutate(values);
  };
  return (
    <Page title={l('title.editLink')}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardBody>
          <VStack>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel>{l('form.link.label.name')}</FormLabel>
              <Input {...register('name')} />
              {!!errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>}
            </FormControl>
            <FormControl isInvalid={!!errors.url}>
              <FormLabel>{l('form.link.label.url')}</FormLabel>
              <Input {...register('url')} />
              {!!errors.url && <FormErrorMessage>{errors.url.message}</FormErrorMessage>}
            </FormControl>
          </VStack>
        </CardBody>
        <CardFooter>
          <ButtonGroup>
            <Button isLoading={isLoading} type='submit'>
              {l('button.save')}
            </Button>
            <NavButton variant='ghost' to={-1}>
              {l('button.cancel')}
            </NavButton>
          </ButtonGroup>
        </CardFooter>
      </form>
    </Page>
  );
}
