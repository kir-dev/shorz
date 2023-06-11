import { Stat, StatHelpText, StatLabel, StatNumber, useColorModeValue, WrapItem } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { UIPaths } from '../../config/paths.config';
import { LinkDocument } from '../../types/types';
import { l } from '../../utils/language';
import { joinPath } from '../../utils/path';

interface DashboardTileProps {
  link: LinkDocument;
}

export function DashboardTile({ link }: DashboardTileProps) {
  const color = useColorModeValue('gray.100', 'gray.600');
  const navigate = useNavigate();
  const onClick = () => navigate(joinPath(UIPaths.LINK, link._id));
  return (
    <WrapItem maxW='100%'>
      <Stat
        p={3}
        w={40}
        maxW='100%'
        cursor='pointer'
        borderRadius='md'
        borderColor={color}
        borderWidth={1}
        _hover={{ background: color }}
        onClick={onClick}
      >
        <StatLabel isTruncated>{link.name}</StatLabel>
        <StatNumber>{link.timestamps.length}</StatNumber>
        <StatHelpText>{l('page.dashboard.tileHelpText')}</StatHelpText>
      </Stat>
    </WrapItem>
  );
}
