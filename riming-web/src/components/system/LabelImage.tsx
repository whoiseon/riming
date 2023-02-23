import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import Input, { Props as InputProps } from '@/components/system/Input';
import DefaultImage from '@/assets/vectors/default-market-image.svg';
import CheckBox from '@/components/system/CheckBox';

interface Props extends InputProps {
  label: string;
  preview?: string;
  checked?: boolean;
  toggleDefaultImage?: () => void;
}

function LabelImage({ label, preview, checked, toggleDefaultImage, ...rest }: Props) {
  return (
    <Block>
      <label>{label}</label>
      <InputGroup>
        <label htmlFor="market-image">
          {preview ? <img src={preview} alt="preview" /> : <DefaultImage />}
        </label>
        <Input type="file" {...rest} />
      </InputGroup>
      <CheckBox
        id="default-image-checkbox"
        checked={checked}
        onChange={toggleDefaultImage}
        label="우선 기본 이미지를 사용할게요!"
      />
    </Block>
  );
}

const Block = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  & > label {
    font-size: 14px;
    line-height: 1.5;
    color: ${colors.gray4};
    font-weight: 700;
    margin-bottom: 4px;
  }
`;

const InputGroup = styled.div`
  label {
    width: 100%;
    svg {
      width: 100%;
      border-radius: 6px;
    }
    img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: 6px;
    }
  }
`;

export default LabelImage;
