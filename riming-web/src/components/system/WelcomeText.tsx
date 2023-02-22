import styled from '@emotion/styled';
import { colors } from '@/styles/colors';

interface Props {
  mode: 'login' | 'register' | 'open';
}

const textDescriptions = {
  login: '오늘도 오셨네요 환영해요!',
  register: '처음 뵙겠습니다 만나서 반가워요!',
  open: '나만의 마켓을 만들어보세요!'
};

function WelcomeText({ mode }: Props) {
  return (
    <Block>
      <h1>{textDescriptions[mode]}</h1>
    </Block>
  );
}

const Block = styled.div`
  text-align: center;
  padding: 16px 0;
  h1 {
    font-size: 18px;
    font-weight: 600;
    color: ${colors.gray3};
  }
`;

export default WelcomeText;
