import { createBrowserHistory } from 'history';
import moment from 'moment';

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

export function getFromNow(date) {
  const newDate = new Date(date);
  let fromNow = '';
  if (newDate instanceof Date) {
    const date = moment(newDate);
    const days = moment().diff(date, 'days');
    if (days === 0) {
      const hours = moment().diff(date, 'hours');
      const minutes = moment().diff(date, 'minutes');
      const seconds = moment().diff(date, 'seconds');
      if (hours) {
        fromNow = `${hours} ${hours <= 1 ? 'Hour' : 'Hours'} Ago`;
      } else if (minutes) {
        fromNow = `${minutes} ${minutes <= 1 ? 'Minute' : 'Minutes'} Ago`;
      } else if (seconds) {
        fromNow = `${seconds <= 10 ? 'Just Now' : `${seconds} Seconds Ago`}`;
      } else {
        fromNow = 'Today';
      }
    } else if (days === 1) {
      fromNow = 'Yesterday';
    } else if (days >= 1 && days <= 5) {
      fromNow = `${days} ${days <= 1 ? 'Day' : 'Day'} Ago`;
    } else if (days >= 6 && days <= 28) {
      const weeks = moment().diff(date, 'weeks');
      fromNow = `${weeks} ${weeks <= 1 ? 'Week' : 'Weeks'} Ago`;
    } else if (days >= 29 && days <= 365) {
      const months = moment().diff(date, 'months');
      fromNow = `${months} ${months <= 1 ? 'Month' : 'Months'} Ago`;
    } else if (days >= 366) {
      const years = moment().diff(date, 'years');
      fromNow = `${years} ${years <= 1 ? 'Year' : 'Years'} Ago`;
    } else {
      fromNow = date.calendar().split(' ')[0];
    }
  }

  return fromNow;
}

export function capitalizeFirstLetter(string = '') {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
