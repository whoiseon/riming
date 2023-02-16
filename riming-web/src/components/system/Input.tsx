import { colors } from '@/styles/colors';
import styled from '@emotion/styled';
import { RegisterOptions, UseFormRegister } from 'react-hook-form';

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  register: any;
  option: RegisterOptions;
  errors?: any;
}

function Input({ register, name, option, errors, ...rest }: Props) {
  return (
    <>
      <StyledInput {...register(name, option)} {...rest} />
      {errors && <ErrorMessage>{errors.message}</ErrorMessage>}
    </>
  );
}

const StyledInput = styled.input`
  background-color: ${colors.gray0};
  border: none;
  height: 42px;
  border-radius: 6px;
  transition: all 0.16s ease-in-out;
  outline: none;
  font-size: 14px;
  padding-left: 16px;
  padding-right: 16px;
  color: ${colors.gray5};

  &:hover,
  :focus {
    background-color: #ffffff;
    border: 1px solid ${colors.main.hover};
    box-shadow: 0 0 0 4px ${colors.gray0};
  }

  &::placeholder {
    color: ${colors.gray2};
  }

  &:disabled {
    opacity: 0.5;
    &:hover,
    :focus {
      background-color: ${colors.gray0};
      border: none;
      box-shadow: none;
    }
  }
`;

const ErrorMessage = styled.p`
  margin-top: 8px;
  font-size: 14px;
  color: ${colors.distructive.primary};
`;

export default Input;
