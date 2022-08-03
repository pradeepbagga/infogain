import { configureStore, combineReducers } from '@reduxjs/toolkit';
import addTransactionReducer from './Slices/Transaction/transactionSlice';
import getAllTransactionReducer from './Slices/Transaction/getTransactionSlice';

const reducer = combineReducers({
    transaction: addTransactionReducer,
    getAllTransactions: getAllTransactionReducer
});

const store = configureStore({
    reducer
});

export default store;