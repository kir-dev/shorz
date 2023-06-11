import { Button, ButtonProps } from '@chakra-ui/react';
import { TbExternalLink } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

export interface NavButtonProps extends ButtonProps {
  to: string | number;
  external?: boolean;
}

export function NavButton({ to, onClick, external, ...props }: NavButtonProps) {
  const navigate = useNavigate();
  return (
    <Button
      onClick={(evt) => {
        if (onClick) onClick(evt);
        if (external && typeof to === 'string') {
          window.open(to);
          return;
        }
        // TS is silly a little bit
        if (typeof to === 'string') {
          navigate(to);
          return;
        }
        navigate(to);
      }}
      rightIcon={external ? <TbExternalLink /> : undefined}
      {...props}
    />
  );
}
