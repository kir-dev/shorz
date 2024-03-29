import { Box, Button, useToast } from '@chakra-ui/react';
import { TbCopy } from 'react-icons/tb';

import { l } from '../../utils/language';
import { NavButton } from '../button/NavButton';

interface UrlFieldProps {
  url: string;
}

export function UrlField({ url }: UrlFieldProps) {
  const toast = useToast();
  const copy = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => toast({ status: 'success', title: l('page.linkDetails.copySuccess') }))
      .catch(() => toast({ status: 'error', title: l('page.linkDetails.copyFail') }));
  };
  return (
    <Box display='inline-flex'>
      <Button mr={1} variant='ghost' onClick={copy}>
        <TbCopy />
      </Button>
      <NavButton colorScheme='black' to={url} external variant='link'>
        {url}
      </NavButton>
    </Box>
  );
}
