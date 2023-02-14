import { colors } from '@/styles/colors';
import styled from 'styled-components';
import Logo from '../assets/vectors/logo.svg';

function Header() {
  return (
    <Block>
      <Logo />
    </Block>
  );
}

const Block = styled.header`
  height: 60px;
  border-bottom: 1px solid ${colors.gray0};
  padding-left: 16px;
  padding-right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 71px;
    height: 28px;
  }
`;

export default Header;
