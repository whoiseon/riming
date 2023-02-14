import { createGlobalStyle } from 'styled-components';

const GlobalFont = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard';
    font-weight: 600;
    src: url('../../public/fonts/Pretendard-Bold.woff') format('woff');
  }
  @font-face {
    font-family: 'Pretendard';
    font-weight: 500;
    src: url('../../public/fonts/Pretendard-SemiBold.woff') format('woff');
  }
  @font-face {
    font-family: 'Pretendard';
    font-weight: normal;
    src: url('../../public/fonts/Pretendard-Medium.woff') format('woff');
  }

  html {
    font-family: 'Pretendard', sans-serif;
    font-weight: normal;
  }
`;

export default GlobalFont;
