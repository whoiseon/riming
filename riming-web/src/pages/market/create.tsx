import SimpleLayout from '@/components/layouts/SimpleLayout';
import useMyAccount from '@/hooks/useMyAccount';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import { getMyAccount, getMyAccountServer } from '@/lib/api/auth';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';

function Create() {
  const { data: myData } = useMyAccount();
  const hasPermission = useProtectedRoute();

  if (!hasPermission) {
    return null;
  }

  return (
    <SimpleLayout title="나만의 마켓 만들기" hasBackButton>
      123
    </SimpleLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['me'], () => getMyAccountServer(req.cookies.access_token));
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Create;
