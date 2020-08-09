import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import React, {PropsWithChildren, ReactElement} from 'react';

export const RenderWithStore = ({children}: PropsWithChildren<any>): ReactElement => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const store = mockStore({
        users: {
            users: []
        },
        repos: {
            repos: []
        },
    });
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}
