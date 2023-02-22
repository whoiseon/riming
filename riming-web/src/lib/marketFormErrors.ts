export const marketFormErrors = {
  marketName: {
    maxLength: {
      value: 16,
      message: '마켓 이름은 16자 이하로 입력해주세요!',
    },
    minLength: {
      value: 2,
      message: '마켓 이름은 2글자 이상으로 입력해주세요!',
    },
    pattern: {
      value: /^[a-zA-Z가-힣0-9]+$/,
      message: '영문, 한글, 숫자만 입력 가능합니다!',
    },
  },
};
