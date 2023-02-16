import { colors } from '@/styles/colors';
import styled from '@emotion/styled';
import { FieldError } from 'react-hook-form';
import Input, { type Props as InputProps } from './Input';

interface Props extends InputProps {
  label: string;
}

function LabelInput({ label, register, ...rest }: Props) {
  return (
    <Block>
      <label>{label}</label>
      <Input register={register} {...rest} />
    </Block>
  );
}

const Block = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  label {
    font-size: 14px;
    line-height: 1.5;
    color: ${colors.gray4};
    font-weight: 700;
    margin-bottom: 4px;
  }
`;

const ErrorMessage = styled.p`
  margin-top: 8px;
  font-size: 14px;
  color: ${colors.distructive.primary};
`;

export default LabelInput;
