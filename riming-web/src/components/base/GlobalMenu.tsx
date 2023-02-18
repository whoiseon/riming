import useMyAccount from '@/hooks/useMyAccount';
import { colors } from '@/styles/colors';
import styled from '@emotion/styled';
import MenuItem from '../system/MenuItem';
import SearchInput from '../system/SearchInput';

interface Props {
  closeMenu: () => void;
}

function GlobalMenu({ closeMenu }: Props) {
  const { data: myData } = useMyAccount();

  return (
    <StyledNav>
      <SearchInput placeholder="상점명 또는 태그를 검색해보세요!" />
      <ItemGroup>
        <MenuItem onClick={closeMenu} title="홈" href="/" />
        <MenuItem onClick={closeMenu} title="인기" href="/" />
        <MenuItem onClick={closeMenu} title="태그" href="/" />
        <MenuItem onClick={closeMenu} title="최신" href="/" />
      </ItemGroup>
      <ItemGroup>
        <MenuItem onClick={closeMenu} title="홈" href="/" />
        <MenuItem onClick={closeMenu} title="인기" href="/" />
        <MenuItem onClick={closeMenu} title="태그" href="/" />
        <MenuItem onClick={closeMenu} title="최신" href="/" />
      </ItemGroup>
    </StyledNav>
  );
}

const StyledNav = styled.nav`
  flex: 1;
  padding-left: 16px;
  padding-right: 16px;
`;

const ItemGroup = styled.ul`
  padding-top: 12px;
  padding-bottom: 12px;
  &:not(:first-of-type) {
    border-top: 1px solid ${colors.gray0};
  }
  &:first-of-type {
    padding-top: 0;
  }
`;

export default GlobalMenu;
