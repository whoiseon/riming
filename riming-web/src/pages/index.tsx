import useMyAccount from '@/hooks/useMyAccount';
import BasicLayout from '@/components/templates/BasicLayout';

export default function Home() {
  return <BasicLayout>main</BasicLayout>;
}

// export const getServerSideProps = async () => {
//   const queryClient = new QueryClient();
//   await queryClient.prefetchQuery(['user'], getMyAccount);

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// };
