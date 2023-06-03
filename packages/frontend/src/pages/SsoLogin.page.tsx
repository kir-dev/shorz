import { Button, CardBody, Text, VStack } from '@chakra-ui/react';

import { NavButton } from '../components/NavButton';
import { API_BASE_URL } from '../config/environment.config';
import { ApiPaths, UIPaths } from '../config/paths.config';
import { Page } from '../layout/Page';
import { l } from '../utils/language';

export function SsoLoginPage() {
  return (
    <Page title={l('title.login')} maxW='md'>
      <CardBody>
        <VStack spacing={10}>
          <Text>{l('page.login.text')}</Text>
          <Button onClick={() => (location.href = API_BASE_URL + ApiPaths.LOGIN)}>{l('page.login.button')}</Button>
          <NavButton to={UIPaths.ROOT} variant='ghost'>
            {l('page.login.back')}
          </NavButton>
        </VStack>
      </CardBody>
    </Page>
  );
}
