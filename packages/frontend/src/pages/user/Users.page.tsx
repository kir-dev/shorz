import { CardBody, VStack } from '@chakra-ui/react';

import { UserListItem } from '../../components/user/UserListItem';
import { Page } from '../../layout/Page';
import { useUsersNetwork } from '../../network/user/useUsers.network';
import { l } from '../../utils/language';

export function UsersPage() {
  const { data, isLoading } = useUsersNetwork();
  return (
    <Page title={l('title.users')} isLoading={isLoading}>
      <CardBody>
        <VStack w='100%'>
          {data?.map((usr) => (
            <UserListItem key={usr._id} user={usr} />
          ))}
        </VStack>
      </CardBody>
    </Page>
  );
}
