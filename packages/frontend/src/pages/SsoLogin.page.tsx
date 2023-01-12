import { Page } from '../layout/Page';
import { Button, CardBody, Text, VStack } from '@chakra-ui/react';
import { ApiPaths } from '../config/paths.config';
import { API_BASE_URL } from '../config/environment.config';
import { MainLayout } from '../layout/MainLayout';
import { l } from '../utils/language';

export function SsoLoginPage() {
  return (
    <MainLayout>
      <Page title={l('title.login')} maxW='md'>
        <CardBody>
          <VStack spacing={10}>
            <Text>{l('page.login.text')}</Text>
            <Button onClick={() => (location.href = API_BASE_URL + ApiPaths.LOGIN)}>{l('page.login.button')}</Button>
          </VStack>
        </CardBody>
      </Page>
    </MainLayout>
  );
}