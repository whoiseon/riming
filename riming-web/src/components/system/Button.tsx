import { colors } from '@/styles/colors';
import styled from '@emotion/styled';

interface ButtonProps {
  layoutMode?: 'inline' | 'fullWidth';
}

interface Props extends React.HTMLAttributes<HTMLButtonElement>, ButtonProps {}

function Button({ layoutMode = 'inline', ...rest }: Props) {
  return <StyledButton layoutMode={layoutMode} {...rest} />;
}

const StyledButton = styled.button<ButtonProps>`
  display: flex;
  background: ${colors.main.primary};
  color: white;
  height: 42px;
  font-size: 14px;
  font-weight: 600;
  align-items: center;
  justify-content: center;
  padding-left: 16px;
  padding-right: 16px;
  border-radius: 6px;
  transition: background-color 0.16s ease-in-out;
  ${(props) =>
    props.layoutMode === 'fullWidth' &&
    `
    width: 100%;
  `}

  &:hover {
    background-color: ${colors.main.hover};
  }
  &:active {
    background-color: ${colors.main.active};
  }
  &:disabled {
    opacity: 0.5;
  }
`;

export default Button;
