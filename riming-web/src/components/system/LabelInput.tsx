import { colors } from '@/styles/colors';
import styled from '@emotion/styled';
import Input, { type Props as InputProps } from './Input';

interface Props extends InputProps {
  label: string;
}

function LabelInput({ label, ...rest }: Props) {
  return (
    <Block>
      <label>{label}</label>
      <Input {...rest} />
    </Block>
  );
}

const Block = styled.div`
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

export default LabelInput;
