import { colors } from '@/styles/colors';
import styled from '@emotion/styled';
import Logo from '@/assets/vectors/logo.svg';

interface Props {
  title?: React.ReactNode;
  headerLeft?: React.ReactNode;
  headerRight?: React.ReactNode;
  hasBorder?: boolean;
}

function Header({ title = <Logo />, headerLeft, headerRight, hasBorder = true }: Props) {
  return (
    <Block border={hasBorder}>
      {headerLeft && <HeaderSide position="left">{headerLeft}</HeaderSide>}
      <Title>{title}</Title>
      {headerRight && <HeaderSide position="right">{headerRight}</HeaderSide>}
    </Block>
  );
}

const Block = styled.header<{ border: boolean }>`
  position: relative;
  height: 60px;
  border-bottom: 1px solid ${(props) => (props.border ? colors.gray0 : 'transparent')};
  padding-left: 16px;
  padding-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  color: ${colors.gray5};
  font-size: 18px;
  font-weight: 600;
  svg {
    width: 71px;
    height: 28px;
  }
`;

const HeaderSide = styled.div<{ position: 'left' | 'right' }>`
  position: absolute;
  ${(props) => props.position}: 16px;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
`;

export default Header;
