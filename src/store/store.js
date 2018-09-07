import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import loginReducer from '../reducers/LoginReducer/loginReducer';

const store = createStore(loginReducer, {}, applyMiddleware(thunk, logger));
export default store;