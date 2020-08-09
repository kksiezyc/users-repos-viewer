import {UserItem} from '../../../components/user-item/user-item';
import {render, RenderResult} from '@testing-library/react';

import React from 'react';
import {UserItemProps} from '../../../components/user-item/user-item.interface';
const defaultProps: UserItemProps = {
    user: {},
    isExpanded: false,
    fetchRepos: jest.fn(),
    onExpandHandler: jest.fn(),
};
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {Provider} from 'react-redux';

const renderWithPropsAndStore = (
    props: Partial<UserItemProps>
): RenderResult => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const store = mockStore({
        users: {},
        repos: {},
    });
    return render(
        <Provider store={store}>
            <UserItem {...defaultProps} {...props} />
        </Provider>
    );
};

describe('user-item', (): void => {
    it('should not render accordion details if isExpanded prop is false', (): void => {
        const {queryByTestId} = renderWithPropsAndStore({isExpanded: false});
        const accordionDetails = queryByTestId('userItemAccordionDetails');
        expect(accordionDetails).not.toBeInTheDocument();
    });
    it('should render accordion details if isExpanded prop is true', (): void => {
        const {queryByTestId} = renderWithPropsAndStore({isExpanded: true});
        const accordionDetails = queryByTestId('userItemAccordionDetails');
        expect(accordionDetails).toBeInTheDocument();
    });
});
