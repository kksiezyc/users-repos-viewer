import {render} from '@testing-library/react';
import React from 'react';
import {UsersSearchProps} from '../../../components/users-search/users-search.interface';
import {UsersSearch} from '../../../components/users-search/users-search';

const defaultProps: UsersSearchProps = {
    users: [],
    activeUserId: 0,
    fetchUsers: jest.fn,
    setActiveUser: jest.fn,
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
});
