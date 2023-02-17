import styled from '@emotion/styled';
import SearchInput from '../system/SearchInput';

function GlobalMenu() {
  return (
    <StyledNav>
      <SearchInput placeholder="상점명 또는 태그를 검색해보세요!" />
      <p>123</p>
    </StyledNav>
  );
}

const StyledNav = styled.nav`
  flex: 1;
`;

export default GlobalMenu;
