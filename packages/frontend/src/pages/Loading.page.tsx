import { l } from '../utils/language';
import { CardBody, Center, useDisclosure, useTimeout } from '@chakra-ui/react';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Page } from '../layout/Page';

export function LoadingPage() {
  const { onOpen, isOpen } = useDisclosure();
  useTimeout(onOpen, 1000);
  if (!isOpen) return null;
  return (
    <Page title={l('title.loading')} w='fit-content'>
      <CardBody>
        <Center>
          <LoadingSpinner />
        </Center>
      </CardBody>
    </Page>
  );
}
