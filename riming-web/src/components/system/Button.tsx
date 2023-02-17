import { colors } from '@/styles/colors';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Link from 'next/link';

interface ButtonProps {
  layoutmode?: 'inline' | 'fullWidth';
  size?: 'small' | 'medium';
  variant?: 'primary' | 'secondary' | 'text';
}

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonProps {
  to?: string;
  href?: string;
}

function Button({
  layoutmode = 'inline',
  size = 'medium',
  variant = 'primary',
  href,
  ...rest
}: Props) {
  if (href) {
    return (
      <StyledLink
        layoutmode={layoutmode}
        variant={variant}
        size={size}
        href={href}
        style={rest.style}
      >
        {rest.children}
      </StyledLink>
    );
  }
  return <StyledButton layoutmode={layoutmode} variant={variant} size={size} {...rest} />;
}

const variantStyles = {
  primary: css`
    background: ${colors.main.primary};
    color: white;
    &:hover {
      opacity: 0.875;
    }
  `,
  secondary: css`
    background: ${colors.distructive.primary};
    color: white;
    &:hover {
      opacity: 0.875;
    }
  `,
  text: css`
    background: transparent;
    color: ${colors.gray4};
    text-decoration: none;
    &:hover {
      background: ${colors.gray0};
      color: ${colors.main.primary};
    }
  `,
};

const sizeStyles = {
  small: css`
    height: 36px;
    font-size: 14px;
    padding-left: 12px;
    padding-right: 12px;
  `,
  medium: css`
    height: 42px;
    font-size: 14px;
    padding-left: 16px;
    padding-right: 16px;
  `,
};

const sharedStyles = (props: ButtonProps) => css`
  display: flex;
  ${sizeStyles[props.size!]};
  ${variantStyles[props.variant!]!};
  font-weight: 600;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: all 0.16s ease-in-out;

  &:disabled {
    filter: grayscale(0.6);
  }

  ${props.layoutmode === 'fullWidth' &&
  css`
    width: 100%;
  `}
`;

const StyledButton = styled.button<ButtonProps>`
  ${(props) => sharedStyles(props)}
`;

const StyledLink = styled(Link)<ButtonProps>`
  ${(props) => sharedStyles(props)}
`;

export default Button;
