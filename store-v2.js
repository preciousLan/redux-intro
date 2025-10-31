import { applyMiddleware, combineReducers, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';

import accountreducer from './features/accounts/accountSlice';
import customerReducer from './features/customers/customerSlice';

const rootReducer = combineReducers({
	account: accountreducer,
	customer: customerReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
