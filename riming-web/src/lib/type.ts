export interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
}

export interface loginFormValues {
  email: string;
  password: string;
}

export interface AuthResult {
  tokens: Tokens;
  user: User;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: number;
  email: string;
  username: string;
  market: any | null;
  subscribe: any;
}
