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

import { NavButton } from '../../components/button/NavButton';
import { UIPaths } from '../../config/paths.config';
import { Page } from '../../layout/Page';
import { useCreateGroup } from '../../network/groups/useCreateGroup.network';
import { CreateGroupDto } from '../../types/dto.types';
import { l } from '../../utils/language';
import { joinPath } from '../../utils/path';
import { groupValidation } from '../../utils/validation';

export function CreateGroupPage() {
  const navigate = useNavigate();
  const { isLoading, mutate } = useCreateGroup((responseData) => {
    navigate(joinPath(UIPaths.GROUP, responseData._id));
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateGroupDto>({ resolver: yupResolver(groupValidation) });
  const onSubmit = (values: CreateGroupDto) => {
    mutate({
      name: values.name,
    });
  };

  return (
    <Page title={l('title.createGroup')}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardBody>
          <VStack>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel>{l('form.group.label.name')}</FormLabel>
              <Input {...register('name')} />
              {!!errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>}
            </FormControl>
          </VStack>
        </CardBody>
        <CardFooter>
          <ButtonGroup>
            <Button isLoading={isLoading} type='submit'>
              {l('button.save')}
            </Button>
            <NavButton variant='ghost' to={UIPaths.GROUP}>
              {l('button.cancel')}
            </NavButton>
          </ButtonGroup>
        </CardFooter>
      </form>
    </Page>
  );
}
