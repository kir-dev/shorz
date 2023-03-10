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
import { useCreateLink } from '../network/useCreateLink.network';
import { useForm } from 'react-hook-form';
import { CreateLinkDto } from '../types/dto.types';
import { useNavigate } from 'react-router-dom';
import { joinPath } from '../utils/path';
import { yupResolver } from '@hookform/resolvers/yup';
import { linkValidation } from '../utils/validation';

export function CreateLinkPage() {
  const navigate = useNavigate();
  const { isLoading, makeRequest } = useCreateLink();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateLinkDto>({ resolver: yupResolver(linkValidation) });
  const onSubmit = (values: CreateLinkDto) => {
    makeRequest(values, (responseData) => {
      navigate(joinPath(UIPaths.LINK, responseData._id));
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
