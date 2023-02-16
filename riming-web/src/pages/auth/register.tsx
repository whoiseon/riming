import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import HeaderBackButton from '@/components/base/HeaderBackButton';
import MobileHeader from '@/components/MobileHeader';
import useGoBack from '@/hooks/useGoBack';
import AuthForm from '@/components/auth/AuthForm';
import WelcomeText from '@/components/auth/WelcomeText';
import { useCallback, useEffect, useState } from 'react';
import { type RegisterFormValues } from '@/lib/type';
import { useMutation } from '@tanstack/react-query';
import { register } from '@/lib/api/auth';
import useMyAccount from '@/hooks/useMyAccount';

export default function Register() {
  const { data } = useMyAccount();

  const goBack = useGoBack();
  const router = useRouter();
  const [registerError, setRegisterError] = useState('');

  const { isLoading, mutate, error } = useMutation({
    mutationFn: register,
    onMutate: (data) => {},
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error: any) => {},
  });

  const onSubmit = useCallback(
    async (data: RegisterFormValues) => {
      mutate(data);
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
        headerLeft={<HeaderBackButton onClick={goBack} />}
        hasBorder={false}
      />
      <WelcomeText mode="register" />
      <AuthForm mode="register" onSubmit={onSubmit} isLoading={isLoading} />
    </Page>
  );
}

const Page = styled.div`
  display: flex;
  flex-direction: column;
`;
