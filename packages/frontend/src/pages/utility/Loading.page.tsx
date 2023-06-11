import { CardBody, Center, useDisclosure, useTimeout } from '@chakra-ui/react';

import { LoadingSpinner } from '../../components/feedback/LoadingSpinner';
import { Page } from '../../layout/Page';
import { l } from '../../utils/language';

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
