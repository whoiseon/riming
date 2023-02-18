import { useState } from 'react';
import FullHeightPage from '@/components/system/FullHeightPage';
import MobileHeader from '@/components/base/MobileHeader';
import HeaderButton from '@/components/base/HeaderButton';
import useMyAccount from '@/hooks/useMyAccount';
import styled from '@emotion/styled';
import GlobalMenu from '../base/GlobalMenu';
import useGoBack from '@/hooks/useGoBack';

interface Props {
  children: React.ReactNode;
  title?: string;
  hasBackButton?: boolean;
}

function SimpleLayout({ children, title, hasBackButton }: Props) {
  const goBack = useGoBack();

  return (
    <FullHeightPage>
      <MobileHeader
        title={title}
        headerLeft={hasBackButton ? <HeaderButton icon="arrowBack" onClick={goBack} /> : undefined}
        hasBorder={false}
      />
      <Content>{children}</Content>
    </FullHeightPage>
  );
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export default SimpleLayout;
