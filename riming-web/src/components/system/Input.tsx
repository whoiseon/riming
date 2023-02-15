import { colors } from '@/styles/colors';
import styled from '@emotion/styled';

export interface Props extends React.HTMLAttributes<HTMLInputElement> {}

function Input(props: Props) {
  return <StyledInput {...props} />;
}

const StyledInput = styled.input`
  background-color: ${colors.gray0};
  border: none;
  height: 40px;
  border-radius: 6px;
  transition: all 0.16s ease-in-out;
  outline: none;
  font-size: 14px;
  padding-left: 16px;
  padding-right: 16px;
  color: ${colors.gray5};

  &:hover,
  focus {
    background-color: #ffffff;
    border: 1px solid ${colors.main.hover};
    box-shadow: 0 0 0 4px ${colors.gray0};
  }
`;

export default Input;
