import { Box, Button, CardBody, CardFooter, Heading, Text, VStack } from '@chakra-ui/react';
import { TbQuestionMark } from 'react-icons/tb';

import { Page } from '../layout/Page';
import { l } from '../utils/language';

interface NotFoundPageProps {
  onAction: () => void;
  actionLabel: string;
}

export function NotFoundPage({ onAction, actionLabel }: NotFoundPageProps) {
  return (
    <Page title={l('title.notFound')}>
      <CardBody>
        <VStack>
          <Box borderRadius='full' color='gray.500' backgroundColor='#71809630' p={3}>
            <TbQuestionMark size='5rem' />
          </Box>
          <Heading>{l('page.notFound.heading')}</Heading>
          <Text>{l('page.notFound.text')}</Text>
        </VStack>
      </CardBody>
      <CardFooter justifyContent='center'>
        <Button onClick={onAction}>{actionLabel}</Button>
      </CardFooter>
    </Page>
  );
}
