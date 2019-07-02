/* global localStorage */
import { createBrowserHistory } from 'history';

import jwt from 'jwt-decode';

const ACCESS_TOKEN = 'ACCESS_TOKEN';

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN);
}

export function getUser() {
  const accessToken = getAccessToken();

  try {
    const json = accessToken && jwt(accessToken);
    if (json && json.exp < new Date().getTime() / 1000) {
      localStorage.removeItem(ACCESS_TOKEN);
      return null;
    }
    return json;
  } catch (e) {
    localStorage.removeItem(ACCESS_TOKEN);
    return null;
  }
}

export const history = createBrowserHistory();

export function navigate(u, o) {
  history.push(u, o);
}
