import React from 'react';
import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import CheckBoxFalse from '@/assets/vectors/check-box-false.svg';
import CheckBoxTrue from '@/assets/vectors/check-box-true.svg';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

function CheckBox({ label, ...rest }: Props) {
  return (
    <Block>
      {rest.checked ? <CheckBoxTrue /> : <CheckBoxFalse />}
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
  svg {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }
`;

const StyledCheckBox = styled.input`
  display: none;
`;

export default CheckBox;
