import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import githubReducer from './github/reducer';
const rootReducer = combineReducers({github: githubReducer});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
