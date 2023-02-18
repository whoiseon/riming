import { useRouter } from 'next/router';
import AuthForm from '@/components/auth/AuthForm';
import WelcomeText from '@/components/auth/WelcomeText';
import { useCallback, useEffect, useState } from 'react';
import { type RegisterFormValues } from '@/lib/type';
import { useMutation } from '@tanstack/react-query';
import { register } from '@/lib/api/auth';
import useMyAccount from '@/hooks/useMyAccount';
import { extractError } from '@/lib/error';
import SimpleLayout from '@/components/layouts/SimpleLayout';

export default function Register() {
  const { data } = useMyAccount();

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
