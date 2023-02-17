import React from 'react';
import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { CSSProperties, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { css } from '@emotion/react';

const MarketIcon = dynamic(() => import('@/assets/vectors/market.svg'), { ssr: false });
const MenuIcon = dynamic(() => import('@/assets/vectors/menu.svg'), { ssr: false });
const ArrowBackIcon = dynamic(() => import('@/assets/vectors/arrow-left.svg'), { ssr: false });
const MenuCloseIcon = dynamic(() => import('@/assets/vectors/menu-close.svg'), { ssr: false });

interface Props {
  icon: 'market' | 'menu' | 'arrowBack' | 'menuClose';
  onClick?: () => void;
  size?: 'small' | 'medium';
}

const iconMap = {
  market: MarketIcon,
  menu: MenuIcon,
  arrowBack: ArrowBackIcon,
  menuClose: MenuCloseIcon,
};

function HeaderMarketButton({ icon, onClick }: Props) {
  const iconEl = React.createElement(iconMap[icon]);

  return <IconButton onClick={onClick}>{iconEl}</IconButton>;
}

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  margin-left: -8px;
  background-color: none;
  border-radius: 4px;
  transition: background-color 0.16s ease-in-out;
  svg {
    width: 24px;
    height: 24px;
    color: ${colors.gray2};
  }
`;

export default HeaderMarketButton;
