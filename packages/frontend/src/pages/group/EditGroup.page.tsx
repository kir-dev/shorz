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

import { NavButton } from '../../components/button/NavButton';
import { UIPaths } from '../../config/paths.config';
import { Page } from '../../layout/Page';
import { useGroup } from '../../network/groups/useGroup.network';
import { useUpdateGroup } from '../../network/groups/useUpdateGroup.network';
import { PatchGroupDto } from '../../types/dto.types';
import { l } from '../../utils/language';
import { joinPath } from '../../utils/path';
import { groupValidation } from '../../utils/validation';
import { ErrorPage } from '../utility/Error.page';
import { LoadingPage } from '../utility/Loading.page';

export function EditGroupPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isLoading, mutate } = useUpdateGroup(id, () => navigate(joinPath(UIPaths.GROUP, id ?? '')));
  const { isLoading: isLinkLoading, data, isError } = useGroup(id ?? '');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PatchGroupDto>({ resolver: yupResolver(groupValidation) });
  useEffect(() => {
    reset(data);
  }, [data]);
  if (isLinkLoading) return <LoadingPage />;
  if (!data || isError) return <ErrorPage />;
  const onSubmit = (values: PatchGroupDto) => {
    mutate(values);
  };
  return (
    <Page title={l('title.editGroup')}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardBody>
          <VStack>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel>{l('form.group.label.name')}</FormLabel>
              <Input {...register('name')} />
              {!!errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>}
            </FormControl>
            s
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
