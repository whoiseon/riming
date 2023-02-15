import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import HeaderBackButton from '@/components/base/HeaderBackButton';
import MobileHeader from '@/components/MobileHeader';
import useGoBack from '@/hooks/useGoBack';
import FullHeightPage from '@/components/system/FullHeightPage';
import AuthForm from '@/components/auth/AuthForm';
import WelcomeText from '@/components/auth/WelcomeText';

export default function Register() {
  const goBack = useGoBack();
  return (
    <Page>
      <MobileHeader
        title="회원가입"
        headerLeft={<HeaderBackButton onClick={goBack} />}
        hasBorder={false}
      />
      <WelcomeText mode="register" />
      <AuthForm mode="register" />
    </Page>
  );
}

const Page = styled.div`
  display: flex;
  flex-direction: column;
`;
