import { Box, Card, CardBody, CardFooter, Center, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { TbX } from 'react-icons/tb';

import { NavButton } from '../../components/button/NavButton';
import { UIPaths } from '../../config/paths.config';
import { Page } from '../../layout/Page';
import { l } from '../../utils/language';

interface FillPollDisabledPageProps {
  title: string;
}

export function FillPollDisabledPage({ title }: FillPollDisabledPageProps) {
  const red = useColorModeValue('red.500', 'red.300');
  return (
    <Page title={title}>
      <Card>
        <CardBody>
          <VStack>
            <Box color={red}>
              <TbX size={100} />
            </Box>
            <Text>{l('page.pollSuccess.disabled')}</Text>
          </VStack>
        </CardBody>
        <CardFooter>
          <Center>
            <NavButton to={UIPaths.ROOT}>{l('page.login.back')}</NavButton>
          </Center>
        </CardFooter>
      </Card>
    </Page>
  );
}
