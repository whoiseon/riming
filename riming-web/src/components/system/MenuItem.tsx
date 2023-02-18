import { colors } from '@/styles/colors';
import styled from '@emotion/styled';
import Link from 'next/link';
import ArrowRight from '@/assets/vectors/arrow-right.svg';

interface Props {
  thumbnail?: boolean;
  hasArrowButton?: boolean;
  isMoreButton?: boolean;
  title: string;
  href: string;
  onClick: () => void;
}

function MenuItem({
  thumbnail = false,
  hasArrowButton = true,
  isMoreButton = false,
  title,
  onClick,
  href,
}: Props) {
  return (
    <Block>
      <MenuLink onClick={onClick} href={href}>
        <TitleGroup>
          {thumbnail && <div>썸네일</div>}
          <span>{title}</span>
        </TitleGroup>
        {hasArrowButton && <ArrowRight />}
      </MenuLink>
    </Block>
  );
}

const Block = styled.li``;

const MenuLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 12px;
  padding-bottom: 12px;
  width: 100%;
  text-decoration: none;

  svg {
    width: 16px;
    height: 16px;
    color: ${colors.gray1};
  }
`;

const TitleGroup = styled.div`
  display: flex;
  align-items: center;
  span {
    font-weight: 600;
    color: ${colors.gray3};
    margin-left: 8px;
  }
`;

export default MenuItem;
