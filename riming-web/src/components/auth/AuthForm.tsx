import styled from '@emotion/styled';
import LabelInput from '@/components/system/LabelInput';
import Button from '../system/Button';
import QuestionLink from './QuestionLink';
import { useForm } from 'react-hook-form';
import { useCallback, useEffect, useState } from 'react';
import { registerFormErrors, loginFormErrors } from '@/lib/authFormErrors';
import { type RegisterFormValues } from '@/lib/type';

interface Props {
  mode: 'login' | 'register';
  onSubmit: (data: RegisterFormValues) => void;
  isLoading: boolean;
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

function AuthForm({ mode, onSubmit, isLoading }: Props) {
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

  return (
    <Block onSubmit={handleSubmit(onSubmit)}>
      <InputGroup>
        {isRegister && (
          <LabelInput
            type="text"
            name="username"
            label="이름 또는 닉네임"
            placeholder={usernamePlaceholder}
            errors={errors.username}
            register={register}
            option={usernameErrorOption}
            disabled={isLoading}
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
        <Button type="submit" layoutMode="fullWidth" disabled={isLoading}>
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
