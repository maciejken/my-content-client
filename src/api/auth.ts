import http from './http'
import { AuthOptions, AuthData } from '../model'

export function authenticate (authOpts: AuthOptions) {
  const url = `${authOpts.apiUrl}/auth`
  // eslint-disable-next-line no-undef
  const reqOpts: RequestInit = {
    method: 'GET'
  }
  if (authOpts.basicAuth) {
    const { username, password } = authOpts.basicAuth
    reqOpts.headers = {
      Authorization: `Basic ${btoa(`${username}:${password}`)}`
    }
  }
  return http<AuthData>(url, reqOpts)
};
