import {render, fireEvent} from '@testing-library/react';
import React from 'react';
import {UsersSearchProps} from '../../../components/users-search/users-search.interface';
import {UsersSearch} from '../../../components/users-search/users-search';

const defaultProps: UsersSearchProps = {
    users: [],
    activeUserId: 0,
    fetchUsers: jest.fn(),
    setActiveUser: jest.fn(),
    isUsersLoading: false,
    usersError: '',
    resultsQuery: '',
};

describe('users-search', () => {
    it('should not render results query string if resultsQuery string is empty', (): void => {
        const {queryByTestId} = render(<UsersSearch {...defaultProps} />);
        const resultsQueryText = queryByTestId('usersSearchResultsQuery');
        expect(resultsQueryText).not.toBeInTheDocument();
    });
    it('should render results query string if resultsQuery string is not empty', (): void => {
        const {queryByTestId} = render(
            <UsersSearch {...defaultProps} resultsQuery={'mock'} />
        );
        const resultsQueryText = queryByTestId('usersSearchResultsQuery');
        expect(resultsQueryText).toBeInTheDocument();
        expect(resultsQueryText).toHaveTextContent('Showing results for: mock');
    });
    it('should change input value', (): void => {
        const {queryByTestId} = render(<UsersSearch {...defaultProps} />);
        const input = queryByTestId('usersSearchInput');
        fireEvent.change(input, {target: {value: 'mock'}});
        expect(input.value).toEqual('mock');
    });
    it('should not fetch users on disabled button press', (): void => {
        const {queryByTestId} = render(
            <UsersSearch {...defaultProps} isUsersLoading={true} />
        );
        const button = queryByTestId('usersSearchButton');
        fireEvent.click(button);
        expect(defaultProps.fetchUsers).not.toHaveBeenCalled();
        const input = queryByTestId('usersSearchInput');
        fireEvent.change(input, {target: {value: 'mock'}});
        fireEvent.click(button);
        expect(defaultProps.fetchUsers).not.toHaveBeenCalled();
    });
    it('should call fetchUsers on button press', (): void => {
        const {queryByTestId} = render(
            <UsersSearch {...defaultProps} isUsersLoading={false} />
        );
        const button = queryByTestId('usersSearchButton');
        fireEvent.click(button);
        expect(defaultProps.fetchUsers).not.toHaveBeenCalled();
        const input = queryByTestId('usersSearchInput');
        fireEvent.change(input, {target: {value: 'mock'}});
        fireEvent.click(button);
        expect(defaultProps.fetchUsers).toHaveBeenCalled();
    });
});
