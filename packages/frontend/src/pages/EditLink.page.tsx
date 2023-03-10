import { Page } from '../layout/Page';
import { l } from '../utils/language';
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
import { NavButton } from '../components/NavButton';
import { UIPaths } from '../config/paths.config';
import { useForm } from 'react-hook-form';
import { PatchLinkDto } from '../types/dto.types';
import { useNavigate, useParams } from 'react-router-dom';
import { joinPath } from '../utils/path';
import { yupResolver } from '@hookform/resolvers/yup';
import { linkValidation } from '../utils/validation';
import { usePatchLink } from '../network/usePatchLink.network';
import { useLink } from '../network/useLink.network';
import { LoadingPage } from './Loading.page';
import { ErrorPage } from './Error.page';
import { useEffect } from 'react';

export function EditLinkPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isLoading, makeRequest } = usePatchLink(id || '');
  const { isLoading: isLinkLoading, data, isError } = useLink(id || '');
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
    makeRequest(values, () => {
      navigate(joinPath(UIPaths.LINK, id || ''));
    });
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
