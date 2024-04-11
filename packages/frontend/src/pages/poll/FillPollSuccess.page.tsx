import { Box, Button, Card, CardBody, CardFooter, Center, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { TbCircleCheckFilled } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

import { NavButton } from '../../components/button/NavButton';
import { UIPaths } from '../../config/paths.config';
import { useAuthContext } from '../../context/auth.context';
import { Page } from '../../layout/Page';
import { l } from '../../utils/language';

export function FillPollSuccessPage() {
  const { isAuthenticated } = useAuthContext();
  const green = useColorModeValue('green.500', 'green.300');
  const navigate = useNavigate();
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
            {isAuthenticated ? (
              <Button onClick={() => navigate(-2)}>{l('page.back')}</Button>
            ) : (
              <NavButton to={UIPaths.ROOT}>{l('page.login.back')}</NavButton>
            )}
          </Center>
        </CardFooter>
      </Card>
    </Page>
  );
}
