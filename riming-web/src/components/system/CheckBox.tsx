import React from 'react';
import styled from '@emotion/styled';
import { colors } from '@/styles/colors';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

function CheckBox({ label, ...rest }: Props) {
  return (
    <Block>
      <StyledCheckBox type="checkbox" {...rest} />
      <label htmlFor={rest.id}>{label}</label>
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;
  margin-left: -3px;
  label {
    font-size: 14px;
    font-weight: 500;
    color: ${colors.gray3};
  }
`;

const StyledCheckBox = styled.input`
  margin-right: 4px;
`;

export default CheckBox;
