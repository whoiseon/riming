import useMyAccount from '@/hooks/useMyAccount';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export function useProtectedRoute() {
  const { data: user } = useMyAccount();
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
    }
  }, [user, router]);

  return !!user;
}
