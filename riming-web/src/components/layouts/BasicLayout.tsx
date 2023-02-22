import React, { useCallback, useState } from 'react';
import FullHeightPage from '@/components/system/FullHeightPage';
import MobileHeader from '@/components/base/MobileHeader';
import { colors } from '@/styles/colors';
import Button from '@/components/system/Button';
import HeaderButton from '@/components/base/HeaderButton';
import useMyAccount from '@/hooks/useMyAccount';
import styled from '@emotion/styled';
import GlobalMenu from '../base/GlobalMenu';

interface Props {
  children: React.ReactNode;
  className?: string;
}

function BasicLayout({ children, className }: Props) {
  const { data: meData } = useMyAccount();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenuButton = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, [setMenuOpen]);

  return (
    <FullHeightPage>
      <MobileHeader
        headerLeft={
          menuOpen ? (
            <HeaderButton onClick={toggleMenuButton} icon="menuClose" />
          ) : (
            <HeaderButton onClick={toggleMenuButton} icon="menu" />
          )
        }
        headerRight={
          meData ? (
            <HeaderButton icon="market" />
          ) : (
            <Button
              style={{ marginRight: '-12px', color: colors.main.primary }}
              variant="text"
              size="small"
              href="/auth/login"
            >
              로그인
            </Button>
          )
        }
      />
      {menuOpen ? (
        <GlobalMenu closeMenu={toggleMenuButton} />
      ) : (
        <Content className={className}>{children}</Content>
      )}
    </FullHeightPage>
  );
}

const Content = styled.div`
  flex: 1;
`;

export default BasicLayout;
