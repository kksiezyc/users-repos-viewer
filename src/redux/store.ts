import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import usersReducer from './users/reducer';
import reposReducer from './repos/reducer';
const rootReducer = combineReducers({users: usersReducer, repos: reposReducer});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
