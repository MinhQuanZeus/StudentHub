import { getAccessToken } from '../helpers';

export const ACCESS_TOKEN = 'ACCESS_TOKEN';

export const HTTP_GET = 'GET';

export const HTTP_POST = 'POST';

export const SHOW_LOADING = 'SHOW_LOADING';

export const HIDE_LOADING = 'HIDE_LOADING';

export const DEFAULT_FETCH_HEADERS = {
  'Content-Type': 'application/json',
  'X-Access-Token': getAccessToken() || ''
};
