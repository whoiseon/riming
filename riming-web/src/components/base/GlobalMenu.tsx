import useMyAccount from '@/hooks/useMyAccount';
import { colors } from '@/styles/colors';
import styled from '@emotion/styled';
import MenuItem from '../system/MenuItem';
import SearchInput from '../system/SearchInput';
import NoMarketThumb from '@/assets/vectors/no-market-thumb.svg';

interface Props {
  closeMenu: () => void;
}

const accountMenus = [
  { title: '내 프로필', href: '/' },
  { title: '판매자 센터', href: '/' },
];

const commonMenus = [
  { title: '홈', href: '/' },
  { title: '인기', href: '/' },
  { title: '태그', href: '/' },
  { title: '최신', href: '/' },
];

function GlobalMenu({ closeMenu }: Props) {
  const { data: myData } = useMyAccount();

  return (
    <StyledNav>
      <SearchInput placeholder="상점명 또는 태그를 검색해보세요!" />
      {myData ? (
        <ItemGroup>
          {myData.market ? (
            <li>마켓있음</li>
          ) : (
            <>
              <MenuItem
                title="나만의 마켓을 오픈해보세요!"
                href="/market/create"
                thumbnail={<NoMarketThumb />}
                isMarket
                hasArrowButton={false}
              />
              {accountMenus.map((menu) => (
                <MenuItem key={menu.title} title={menu.title} href={menu.href} />
              ))}
            </>
          )}
        </ItemGroup>
      ) : undefined}
      <ItemGroup>
        {commonMenus.map((item) => (
          <MenuItem key={item.title} title={item.title} href={item.href} />
        ))}
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
  padding-top: 24px;
  padding-bottom: 24px;
  &:not(:first-of-type) {
    border-top: 1px solid ${colors.gray0};
  }
  &:first-of-type {
    padding-top: 0;
  }
`;

export default GlobalMenu;
