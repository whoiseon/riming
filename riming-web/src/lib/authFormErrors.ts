export const registerFormErrors = {
  username: {
    maxLength: {
      value: 16,
      message: '이름은 16자 이하로 입력해주세요!',
    },
    minLength: {
      value: 2,
      message: '이름은 2글자 이상으로 입력해주세요!',
    },
    pattern: {
      value: /^[a-zA-Z가-힣0-9]+$/,
      message: '영문, 한글, 숫자만 입력 가능합니다!',
    },
  },
  email: {
    pattern: {
      value: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      message: '이메일 형식에 맞게 입력해주세요!',
    },
  },
  password: {
    minLength: {
      value: 8,
      message: '비밀번호는 8자 이상으로 입력해주세요!',
    },
    pattern: {
      value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#])[\da-zA-Z!@#]+$/,
      message: '영문, 숫자, 특수문자 포함하여 입력해주세요!',
    },
  },
};

export const loginFormErrors = {
  email: {
    required: {
      value: true,
      message: '이메일을 입력해주세요!',
    },
    pattern: {
      value: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      message: '이메일 형식에 맞게 입력해주세요!',
    },
  },
  password: {
    required: {
      value: true,
      message: '비밀번호를 입력해주세요!',
    },
  },
};
