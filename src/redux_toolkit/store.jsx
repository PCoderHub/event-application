import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './userReducer';
import eventReducer from './eventReducer';

const rootReducer = combineReducers({
    user: userReducer,
    eventData: eventReducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;