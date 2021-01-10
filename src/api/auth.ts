import http from './http';
import { AuthOptions, AuthToken } from '../model';

export function authenticate(authOpts: AuthOptions) {
  const url = `${authOpts.apiUrl}/auth`;
  let reqOpts: RequestInit = {
    method: 'GET'
  };
  if (authOpts.basicAuth) {
    const { username, password } = authOpts.basicAuth;
    reqOpts.headers = {
      Authorization: `Basic ${btoa(`${username}:${password}`)}`        
    };
  }
  return http<AuthToken>(url, reqOpts);
};
