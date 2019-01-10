import React from 'react';
import { getUser, getAccessToken } from '../helpers';

const accessToken = getAccessToken();
const user = getUser();
if (accessToken && user) {
  user.x_access_token = accessToken;
}

export const AppContext = React.createContext({
  isLoading: false,
  user: user
});
