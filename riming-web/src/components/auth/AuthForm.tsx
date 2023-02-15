import styled from '@emotion/styled';
import LabelInput from '@/components/system/LabelInput';

interface Props {
  mode: 'login' | 'register';
}

function AuthForm({ mode }: Props) {
  return (
    <Block>
      <InputGroup>
        <LabelInput label="이름 또는 닉네임" />
        <LabelInput label="이메일" />
        <LabelInput label="비밀번호" />
      </InputGroup>
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default AuthForm;
