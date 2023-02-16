import Header from '@/components/MobileHeader';
import useMyAccount from '@/hooks/useMyAccount';

export default function Home() {
  const { data } = useMyAccount();

  return (
    <>
      <Header />
    </>
  );
}
