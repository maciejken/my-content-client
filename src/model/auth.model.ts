export interface BasicAuth {
  username: string;
  password: string;
}

export interface AuthOptions {
  apiUrl?: string;
  basicAuth?: BasicAuth;
}

export interface AuthToken {
  exp: number;
  groups: number[];
  iat: number;
  sub: string;
}
