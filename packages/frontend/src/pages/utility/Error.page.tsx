import { Box, Button, CardBody, CardFooter, Heading, Text, VStack } from '@chakra-ui/react';
import { TbAlertTriangle } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

import { Page } from '../../layout/Page';
import { l } from '../../utils/language';

interface ErrorPageProps {
  message?: string;
  onAction?: () => void;
}

export function ErrorPage({ message, onAction }: ErrorPageProps) {
  const navigate = useNavigate();
  if (!onAction) onAction = () => navigate(-1);
  return (
    <Page title={l('title.error')}>
      <CardBody>
        <VStack>
          <Box borderRadius='full' color='red.500' backgroundColor='#FF000030' p={3}>
            <TbAlertTriangle size='5rem' />
          </Box>
          <Heading>{l('page.error.heading')}</Heading>
          <Text color='gray.500' fontSize='2xl'>
            {message}
          </Text>
          <Text>{l('page.error.text')}</Text>
        </VStack>
      </CardBody>
      <CardFooter justifyContent='center'>
        <Button onClick={onAction}>{l('button.continue')}</Button>
      </CardFooter>
    </Page>
  );
}
