import { getMyAccount } from '@/lib/api/auth';
import { useQuery } from '@tanstack/react-query';
import { parseCookies } from 'nookies';

function useMyAccount() {
  const cookies = parseCookies();
  const myAccount = useQuery({
    queryKey: ['user'],
    queryFn: getMyAccount,
    retry: 3,
  });
  console.log(cookies);
  return myAccount;
}

export default useMyAccount;
