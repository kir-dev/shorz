import { Box, CardBody, Grid, Text, VStack } from '@chakra-ui/react';
import { Illustration } from '../components/Illustration';
import { NavButton } from '../components/NavButton';
import { UIPaths } from '../config/paths.config';
import { l } from '../utils/language';
import { Page } from '../layout/Page';

export function LandingPage() {
  return (
    <Grid templateColumns={['100%', null, 'repeat(2, 1fr)']} alignItems='center' gap={5}>
      <Page title={l('page.landing.title')}>
        <CardBody>
          <VStack>
            <Text>{l('page.landing.paragraph.1')}</Text>
            <Text>{l('page.landing.paragraph.2')}</Text>
            <Text>{l('page.landing.paragraph.3')}</Text>
            <NavButton to={UIPaths.LOGIN}>{l('page.landing.button')}</NavButton>
          </VStack>
        </CardBody>
      </Page>
      <Box>
        <Illustration />
      </Box>
    </Grid>
  );
}
