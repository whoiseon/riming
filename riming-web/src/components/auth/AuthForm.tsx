import styled from '@emotion/styled';
import LabelInput from '@/components/system/LabelInput';
import Button from '../system/Button';
import QuestionLink from './QuestionLink';
import { useForm } from 'react-hook-form';
import { useMemo } from 'react';
import { registerFormErrors, loginFormErrors } from '@/lib/authFormErrors';
import { type RegisterFormValues } from '@/lib/type';
import { ErrorName } from '@/lib/error';
import { colors } from '@/styles/colors';

interface Props {
  mode: 'login' | 'register';
  onSubmit: (data: RegisterFormValues) => void;
  isLoading: boolean;
  serverError?: string | ErrorName;
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
    errorOptions: {
      username: {},
      email: loginFormErrors.email,
      password: loginFormErrors.password,
    },
  },
  register: {
    usernamePlaceholder: '영문, 한글, 숫자 16자 이하로 입력해주세요',
    emailPlaceholder: '이메일 형식에 맞게 입력해주세요',
    passwordPlaceholder: '8자 이상 영문, 숫자, 특수문자 포함하여 입력해주세요',
    buttonText: '회원가입',
    question: '이미 회원이신가요?',
    actionName: '로그인',
    actionLink: '/auth/login',
    errorOptions: {
      username: registerFormErrors.username,
      email: registerFormErrors.email,
      password: registerFormErrors.password,
    },
  },
};

function AuthForm({ mode, onSubmit, isLoading, serverError }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm<RegisterFormValues>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });
  const isRegister = mode === 'register';
  const {
    usernamePlaceholder,
    emailPlaceholder,
    passwordPlaceholder,
    buttonText,
    question,
    actionName,
    actionLink,
    errorOptions: {
      username: usernameErrorOption,
      email: emailErrorOption,
      password: passwordErrorOption,
    },
  } = modeDescriptions[mode];

  const handleToTranslateError = useMemo(() => {
    switch (serverError) {
      case 'UsernameExistsError':
        return '이미 사용중인 이름 또는 닉네임 입니다!';
      case 'EmailExistsError':
        return '이미 사용중인 이메일 입니다!';
      case 'AuthenticationError':
        return '이메일 또는 비밀번호를 다시 확인해주세요!';
      case 'UnauthorizedError':
        return '인증되지 않은 사용자입니다!';
      case 'UnknownError':
        return '알 수 없는 오류가 발생하였습니다!';
      default:
        return undefined;
    }
  }, [serverError]);

  return (
    <Block onSubmit={handleSubmit(onSubmit)}>
      <InputGroup>
        {isRegister && (
          <LabelInput
            type="text"
            name="username"
            label="이름 또는 닉네임"
            disabled={isLoading}
            placeholder={usernamePlaceholder}
            errors={errors.username}
            register={register}
            option={usernameErrorOption}
          />
        )}
        <LabelInput
          type="text"
          name="email"
          label="이메일"
          placeholder={emailPlaceholder}
          errors={errors.email}
          register={register}
          option={emailErrorOption}
          disabled={isLoading}
        />
        <LabelInput
          type="password"
          name="password"
          label="비밀번호"
          placeholder={passwordPlaceholder}
          errors={errors.password}
          register={register}
          option={passwordErrorOption}
          disabled={isLoading}
        />
      </InputGroup>
      <ActionsBox>
        {serverError && <ErrorMessage>{handleToTranslateError}</ErrorMessage>}
        <Button type="submit" layoutmode="fullWidth" disabled={isLoading}>
          {isLoading ? `${buttonText}중 입니다...` : buttonText}
        </Button>
        <QuestionLink question={question} name={actionName} href={actionLink} />
      </ActionsBox>
    </Block>
  );
}

const Block = styled.form`
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 32px;
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
  font-size: 14px;
  gap: 24px;
`;

const ErrorMessage = styled.p`
  font-size: 14px;
  color: ${colors.distructive.primary};
`;

export default AuthForm;
