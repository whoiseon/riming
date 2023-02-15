import AuthForm from '@/components/auth/AuthForm';
import WelcomeText from '@/components/auth/WelcomeText';
import HeaderBackButton from '@/components/base/HeaderBackButton';
import MobileHeader from '@/components/MobileHeader';
import useGoBack from '@/hooks/useGoBack';

export default function Login() {
  const goBack = useGoBack();
  return (
    <>
      <MobileHeader
        title="로그인"
        headerLeft={<HeaderBackButton onClick={goBack} />}
        hasBorder={false}
      />
      <WelcomeText mode="login" />
      <AuthForm mode="login" />
    </>
  );
}
