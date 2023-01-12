import { Skeleton, SkeletonProps } from '@chakra-ui/react';
import { PropsWithChildren, ReactNode } from 'react';

interface SkeletonWrapperProps extends SkeletonProps, PropsWithChildren {
  wrappedItem: ReactNode;
}

export function SkeletonWrapper({ wrappedItem, children, ...props }: SkeletonWrapperProps) {
  return (
    <Skeleton fadeDuration={2} w='100%' {...props}>
      {props.isLoaded ? children : wrappedItem}
    </Skeleton>
  );
}
