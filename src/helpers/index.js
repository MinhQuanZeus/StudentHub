/* global localStorage */
import { createBrowserHistory } from 'history';

import jwt from 'jwt-decode';

const ACCESS_TOKEN = 'ACCESS_TOKEN';

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN);
}

export function getAvatarUrl() {
  return localStorage.getItem('avatar');
}

export function setAvatarUrl(url) {
  return localStorage.setItem('avatar', url);
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

// Phone number format National to International
export function formatPhoneNumberIntl(phoneNumber) {
  if (!phoneNumber) {
    return;
  }
  phoneNumber = phoneNumber.replace(/[() -]/gi, '');
  if (!(phoneNumber.indexOf('+1') === 0)) {
    phoneNumber = '+1' + phoneNumber;
  }
  return phoneNumber;
}

// Phone number format International to National
export function formatPhoneNumberNtl(phoneNumber) {
  if (!phoneNumber) {
    return;
  }
  phoneNumber = phoneNumber.replace(/\+1/g, '');
  const input = phoneNumber.replace(/\D/g, '').substring(0, 10);
  const zip = input.substring(0, 3);
  const middle = input.substring(3, 6);
  const last = input.substring(6, 10);
  if (input.length > 6) {
    phoneNumber = `(${zip}) ${middle}-${last}`;
  } else if (input.length > 3) {
    phoneNumber = `(${zip}) ${middle}`;
  } else if (input.length > 0) {
    phoneNumber = `(${zip}`;
  } else {
    phoneNumber = '';
  }
  return phoneNumber;
}
