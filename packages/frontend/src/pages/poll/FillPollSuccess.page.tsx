import { Box, Card, CardBody, CardFooter, Center, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { TbCircleCheckFilled } from 'react-icons/tb';

import { NavButton } from '../../components/button/NavButton';
import { UIPaths } from '../../config/paths.config';
import { Page } from '../../layout/Page';
import { l } from '../../utils/language';

export function FillPollSuccessPage() {
  const green = useColorModeValue('green.500', 'green.300');
  return (
    <Page title={l('page.pollSuccess.title')}>
      <Card>
        <CardBody>
          <VStack>
            <Box color={green}>
              <TbCircleCheckFilled size={100} />
            </Box>
            <Text>{l('page.pollSuccess.description')}</Text>
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
