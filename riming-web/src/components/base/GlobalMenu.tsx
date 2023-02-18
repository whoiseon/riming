import useMyAccount from '@/hooks/useMyAccount';
import styled from '@emotion/styled';
import MenuItem from '../system/MenuItem';
import SearchInput from '../system/SearchInput';

function GlobalMenu() {
  const { data: myData } = useMyAccount();

  return (
    <StyledNav>
      <SearchInput placeholder="상점명 또는 태그를 검색해보세요!" />
      <ItemGroup>
        <MenuItem />
      </ItemGroup>
    </StyledNav>
  );
}

const StyledNav = styled.nav`
  flex: 1;
`;

const ItemGroup = styled.ul`
  padding-left: 16px;
  padding-right: 16px;
`;

export default GlobalMenu;
