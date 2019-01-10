import { ACCESS_TOKEN } from '../constants';
import jwt from 'jwt-decode';

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN);
}

export function getUser() {
  const accessToken = getAccessToken();
  const json = accessToken && jwt(accessToken);
  if (json.exp < new Date().getTime() / 1000) {
    localStorage.removeItem(ACCESS_TOKEN);
    return null;
  }
  return json;
}

export const DEFAULT_FETCH_HEADERS = {
  'Content-Type': 'application/json',
  'X-Access-Token': getAccessToken() || ''
};
