import AuthForm from '@/components/auth/AuthForm';
import WelcomeText from '@/components/auth/WelcomeText';
import HeaderBackButton from '@/components/base/HeaderBackButton';
import MobileHeader from '@/components/MobileHeader';
import useGoBack from '@/hooks/useGoBack';
import { useCallback, useEffect, useState } from 'react';
import { type loginFormValues } from '@/lib/type';
import {
  dehydrate,
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { getMyAccount, login } from '@/lib/api/auth';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import useMyAccount from '@/hooks/useMyAccount';
import { extractError } from '@/lib/error';

export default function Login() {
  const queryClient = useQueryClient();
  const { data } = useMyAccount();

  const goBack = useGoBack();
  const router = useRouter();
  const [loginError, setLoginError] = useState('');

  const { isLoading, mutate, error } = useMutation({
    mutationFn: login,
    onMutate: (data) => {
      setLoginError('');
    },
    onSuccess: () => {
      queryClient.refetchQueries(['user']);
      router.push('/');
    },
    onError: (e: any) => {
      const error = extractError(e);
      setLoginError(error.name);
    },
  });

  const onSubmit = useCallback(
    async ({ email, password }: loginFormValues) => {
      if (!email || !password) return;
      mutate({
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
    <>
      <MobileHeader
        title="로그인"
        headerLeft={<HeaderBackButton onClick={goBack} />}
        hasBorder={false}
      />
      <WelcomeText mode="login" />
      <AuthForm mode="login" onSubmit={onSubmit} isLoading={isLoading} serverError={loginError} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['user'], getMyAccount);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
