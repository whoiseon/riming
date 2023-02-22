import React from 'react';
import { colors } from '@/styles/colors';
import styled from '@emotion/styled';
import { RegisterOptions, UseFormRegister } from 'react-hook-form';

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  register?: any;
  option?: RegisterOptions;
  errors?: any;
}

function Input({ register, name, option, errors, ...rest }: Props) {
  if (rest.type === 'file') {
    return <StyledFileInput {...rest} />;
  }
  if (register) {
    return (
      <>
        <StyledInput {...register(name, option)} {...rest} />
        {errors && <ErrorMessage>{errors.message}</ErrorMessage>}
      </>
    );
  }
  return <StyledInput {...rest} />;
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

const StyledFileInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;

const ErrorMessage = styled.p`
  margin-top: 8px;
  font-size: 14px;
  color: ${colors.distructive.primary};
`;

export default Input;
