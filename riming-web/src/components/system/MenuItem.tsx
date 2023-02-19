import { colors } from '@/styles/colors';
import styled from '@emotion/styled';
import Link from 'next/link';
import ArrowRight from '@/assets/vectors/arrow-right.svg';
import { css } from '@emotion/react';

interface Props {
  thumbnail?: string | React.ReactNode;
  hasArrowButton?: boolean;
  isMoreButton?: boolean;
  isMarket?: boolean;
  title: string;
  href: string;
}

function MenuItem({
  thumbnail = undefined,
  hasArrowButton = true,
  isMoreButton = false,
  isMarket = false,
  title,
  href,
}: Props) {
  return (
    <Block>
      <MenuLink href={href}>
        <TitleGroup isMarket={isMarket}>
          {thumbnail}
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

  & > svg {
    width: 16px;
    height: 16px;
    color: ${colors.gray1};
  }
`;

const TitleGroup = styled.div<{ isMarket?: boolean }>`
  display: flex;
  align-items: center;
  span {
    font-weight: 600;
    color: ${colors.gray3};
    margin-left: 8px;
  }
  svg {
    width: 24px;
    height: 24px;
    ${(props) =>
      props.isMarket &&
      css`
        width: 32px;
        height: 32px;
      `}
  }
`;

export default MenuItem;
