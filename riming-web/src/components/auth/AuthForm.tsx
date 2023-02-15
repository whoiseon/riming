import styled from '@emotion/styled';
import LabelInput from '@/components/system/LabelInput';
import Button from '../system/Button';
import QuestionLink from './QuestionLink';

interface Props {
  mode: 'login' | 'register';
}

const modeDescriptions = {
  login: {
    usernamePlaceholder: '',
    emailPlaceholder: '',
    passwordPlaceholder: '',
    buttonText: '로그인',
    question: '회원이 아니신가요?',
    actionName: '가입하기',
    actionLink: '/auth/register',
  },
  register: {
    usernamePlaceholder: '영문, 한글, 숫자 16자 이하로 입력해주세요',
    emailPlaceholder: '이메일 형식에 맞게 입력해주세요',
    passwordPlaceholder: '8자 이상 영문, 숫자, 특수문자 2가지 이상 입력해주세요',
    buttonText: '회원가입',
    question: '이미 회원이신가요?',
    actionName: '로그인',
    actionLink: '/auth/login',
  },
};

function AuthForm({ mode }: Props) {
  const isRegister = mode === 'register';
  const {
    usernamePlaceholder,
    emailPlaceholder,
    passwordPlaceholder,
    buttonText,
    question,
    actionName,
    actionLink,
  } = modeDescriptions[mode];

  return (
    <Block>
      <InputGroup>
        {isRegister && <LabelInput label="이름 또는 닉네임" placeholder={usernamePlaceholder} />}
        <LabelInput label="이메일" placeholder={emailPlaceholder} />
        <LabelInput label="비밀번호" placeholder={passwordPlaceholder} />
      </InputGroup>
      <ActionsBox>
        <Button layoutMode="fullWidth">{buttonText}</Button>
        <QuestionLink question={question} name={actionName} href={actionLink} />
      </ActionsBox>
    </Block>
  );
}

const Block = styled.form`
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 24px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ActionsBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

export default AuthForm;
