import styled from '@emotion/styled';
import Logo from '@/assets/vectors/logo.svg';
import { colors } from '@/styles/colors';

interface Props {
  mode: 'login' | 'register';
}

const textDescriptions = {
  login: '오늘도 오셨네요 환영해요!',
  register: '처음 뵙겠습니다 만나서 반가워요!',
};

function WelcomeText({ mode }: Props) {
  return (
    <Block>
      <Logo />
      <p>{textDescriptions[mode]}</p>
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  svg {
    width: 101px;
    margin-bottom: 8px;
    color: ${colors.main.primary};
  }
  p {
    font-size: 16px;
    font-weight: 500;
    color: ${colors.gray3};
  }
`;

export default WelcomeText;
