import { ACCESS_TOKEN } from '../constants';
import jwt from 'jwt-decode';
export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN);
}

export function getUser() {
  const accessToken = getAccessToken();
  return accessToken && jwt(accessToken);
}
