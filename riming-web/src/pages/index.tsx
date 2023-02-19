import useMyAccount from '@/hooks/useMyAccount';
import BasicLayout from '@/components/layouts/BasicLayout';
import { getMyAccountServer } from '@/lib/api/auth';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetServerSideProps } from 'next';

export default function Home() {
  const { data } = useMyAccount();
  return <BasicLayout>{data?.username}</BasicLayout>;
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
