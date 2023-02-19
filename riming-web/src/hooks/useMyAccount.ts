import { getMyAccount } from '@/lib/api/auth';
import { User } from '@/lib/type';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';

function useMyAccount(): UseQueryResult<User> {
  const [cookies] = useCookies();
  const myAccount = useQuery<User>({
    queryKey: ['me'],
    queryFn: getMyAccount,
    refetchOnWindowFocus: true,
    enabled: cookies?.access_token !== undefined,
  });

  return myAccount;
}

export default useMyAccount;
