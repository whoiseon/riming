import { getMyAccount } from '@/lib/api/auth';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';

function useMyAccount(): UseQueryResult {
  const [cookies] = useCookies();
  const myAccount = useQuery({
    queryKey: ['me'],
    queryFn: getMyAccount,
    refetchOnWindowFocus: true,
    enabled: cookies?.access_token !== undefined,
  });

  return myAccount;
}

export default useMyAccount;
