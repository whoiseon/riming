import { useRouter } from 'next/router';
import AuthForm from '@/components/auth/AuthForm';
import WelcomeText from '@/components/auth/WelcomeText';
import { useCallback, useEffect, useState } from 'react';
import { type RegisterFormValues } from '@/lib/type';
import { useMutation } from '@tanstack/react-query';
import { register } from '@/lib/api/auth';
import { extractError } from '@/lib/error';
import SimpleLayout from '@/components/layouts/SimpleLayout';
import { GetServerSideProps } from 'next';

export default function Register() {
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

  return (
    <SimpleLayout title="회원가입" hasBackButton>
      <WelcomeText mode="register" />
      <AuthForm
        mode="register"
        onSubmit={onSubmit}
        isLoading={isLoading}
        serverError={registerError}
      />
    </SimpleLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  if (req.cookies.access_token) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
      props: {},
    };
  }

  return {
    props: {},
  };
};
