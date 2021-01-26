export interface BasicAuth {
  username: string;
  password: string;
}

export interface AuthOptions {
  apiUrl?: string;
  basicAuth?: BasicAuth;
}

export interface AuthData {
  expires: number;
  groups: number[];
  user: string;
}

export interface AuthState {
  authorized: boolean;
  error: string;
  expires: number;
  loading: false;
}
