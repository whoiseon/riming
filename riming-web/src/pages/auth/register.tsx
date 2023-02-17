import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import HeaderButton from '@/components/base/HeaderButton';
import MobileHeader from '@/components/base/MobileHeader';
import useGoBack from '@/hooks/useGoBack';
import AuthForm from '@/components/auth/AuthForm';
import WelcomeText from '@/components/auth/WelcomeText';
import { useCallback, useEffect, useState } from 'react';
import { type RegisterFormValues } from '@/lib/type';
import { useMutation } from '@tanstack/react-query';
import { register } from '@/lib/api/auth';
import useMyAccount from '@/hooks/useMyAccount';
import { extractError } from '@/lib/error';

export default function Register() {
  const { data } = useMyAccount();

  const goBack = useGoBack();
  const router = useRouter();
  const [registerError, setRegisterError] = useState('');

  const { isLoading, mutate, error } = useMutation({
    mutationFn: register,
    onMutate: () => {
      setRegisterError('');
    },
    onSuccess: () => {
      router.push('/');
    },
    onError: (e: any) => {
      const error = extractError(e);
      setRegisterError(error.name);
    },
  });

  const onSubmit = useCallback(
    async ({ username, email, password }: RegisterFormValues) => {
      if (!username || !email || !password) return;
      mutate({
        username,
        email,
        password,
      });
    },
    [mutate],
  );

  useEffect(() => {
    if (data) {
      router.replace('/');
    }
  }, [data]);

  return (
    <Page>
      <MobileHeader
        title="회원가입"
        headerLeft={<HeaderButton icon="arrowBack" onClick={goBack} />}
        hasBorder={false}
      />
      <WelcomeText mode="register" />
      <AuthForm
        mode="register"
        onSubmit={onSubmit}
        isLoading={isLoading}
        serverError={registerError}
      />
    </Page>
  );
}

const Page = styled.div`
  display: flex;
  flex-direction: column;
`;
