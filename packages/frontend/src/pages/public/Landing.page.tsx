import { Box, CardBody, Grid, Text, VStack } from '@chakra-ui/react';

import { Illustration } from '../../components/assets/Illustration';
import { NavButton } from '../../components/button/NavButton';
import { UIPaths } from '../../config/paths.config';
import { Page } from '../../layout/Page';
import { l } from '../../utils/language';

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
