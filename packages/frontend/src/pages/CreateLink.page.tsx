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
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { NavButton } from '../components/NavButton';
import { UIPaths } from '../config/paths.config';
import { useAuthContext } from '../context/auth.context';
import { Page } from '../layout/Page';
import { useCreateLink } from '../network/useCreateLink.network';
import { CreateLinkDto } from '../types/dto.types';
import { l } from '../utils/language';
import { joinPath } from '../utils/path';
import { linkValidation } from '../utils/validation';

export function CreateLinkPage() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { isLoading, mutate } = useCreateLink((responseData) => {
    navigate(joinPath(UIPaths.LINK, responseData._id));
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateLinkDto>({ resolver: yupResolver(linkValidation) });
  const onSubmit = (values: CreateLinkDto) => {
    mutate({
      url: values.url,
      name: values.name,
      shortId: user?.isAdmin && values.shortId ? values.shortId : undefined,
    });
  };
  return (
    <Page title={l('title.createLink')}>
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
            {user?.isAdmin && (
              <FormControl isInvalid={!!errors.shortId}>
                <FormLabel>{l('form.link.label.shortId')}</FormLabel>
                <Input {...register('shortId')} />
                {!!errors.shortId && <FormErrorMessage>{errors.shortId.message}</FormErrorMessage>}
              </FormControl>
            )}
          </VStack>
        </CardBody>
        <CardFooter>
          <ButtonGroup>
            <Button isLoading={isLoading} type='submit'>
              {l('button.save')}
            </Button>
            <NavButton variant='ghost' to={UIPaths.LINK}>
              {l('button.cancel')}
            </NavButton>
          </ButtonGroup>
        </CardFooter>
      </form>
    </Page>
  );
}
