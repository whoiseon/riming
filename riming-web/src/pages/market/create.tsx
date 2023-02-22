import SimpleLayout from '@/components/layouts/SimpleLayout';
import useMyAccount from '@/hooks/useMyAccount';
import { getMyAccountServer } from '@/lib/api/auth';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import WelcomeText from '@/components/system/WelcomeText';
import MarketForm from '@/components/markets/MarketForm';

function Create() {
  const { data: meData } = useMyAccount();

  return (
    <SimpleLayout title="마켓 오픈하기" hasBackButton>
      <MarketForm />
    </SimpleLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['me'], () => getMyAccountServer(req.cookies.access_token));

  if (!req.cookies.access_token) {
    return {
      redirect: {
        permanent: false,
        destination: '/auth/login',
      },
      props: {},
    };
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Create;
