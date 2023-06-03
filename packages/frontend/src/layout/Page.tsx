import { Button, CardHeader, ContainerProps, Heading, HStack } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { Helmet } from 'react-helmet-async';
import { TbPencil } from 'react-icons/tb';

import { CustomCard } from '../components/CustomCard';
import { InlineLoadingSpinner } from '../components/LoadingSpinner';

interface PageProps extends ContainerProps {
  title: string;
  isLoading?: boolean;
  onHeaderEdit?: () => void;
}

export function Page({ title, isLoading, children, onHeaderEdit, ...props }: PageProps) {
  return (
    <CustomCard w='100%' overflow='auto' maxH='100%' h='fit-content' css={appearAnimation} {...props}>
      <Helmet title={title} />
      <CardHeader>
        <HStack>
          <Heading>{title}</Heading>
          {onHeaderEdit && (
            <Button variant='ghost' onClick={onHeaderEdit}>
              <TbPencil />
            </Button>
          )}
          {isLoading && <InlineLoadingSpinner />}
        </HStack>
      </CardHeader>
      {children}
    </CustomCard>
  );
}

const appearAnimation = css`
  animation: appear 0.4s;
  @keyframes appear {
    0% {
      transform: translateY(50px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;
