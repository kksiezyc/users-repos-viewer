import '@testing-library/jest-dom';
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
    it('should not render users list if users are loading or there is an error', (): void => {
        let component = render(
            <UsersSearch
                {...defaultProps}
                isUsersLoading={false}
                usersError={'error'}
            />
        );
        let usersList = component.queryByTestId('usersList');
        expect(usersList).not.toBeInTheDocument();
        component = render(
            <UsersSearch
                {...defaultProps}
                isUsersLoading={true}
                usersError={''}
            />
        );
        usersList = component.queryByTestId('usersList');
        expect(usersList).not.toBeInTheDocument();
    });
    it('should render users list', (): void => {
        const {queryByTestId} = render(
            <UsersSearch
                {...defaultProps}
                isUsersLoading={false}
                usersError={''}
            />
        );
        const usersList = queryByTestId('usersList');
        expect(usersList).toBeInTheDocument();
    });
    it('should not render error', (): void => {
        let component = render(
            <UsersSearch
                {...defaultProps}
                isUsersLoading={true}
                usersError={'error'}
            />
        );
        let usersList = component.queryByTestId('usersSearchError');
        expect(usersList).not.toBeInTheDocument();
        component = render(
            <UsersSearch
                {...defaultProps}
                isUsersLoading={false}
                usersError={''}
            />
        );
        usersList = component.queryByTestId('usersSearchError');
        expect(usersList).not.toBeInTheDocument();
    });
    it('should render error text', (): void => {
        const {queryByTestId} = render(
            <UsersSearch {...defaultProps} usersError={'error mock'} />
        );
        const resultsQueryText = queryByTestId('usersSearchError');
        expect(resultsQueryText).toBeInTheDocument();
        expect(resultsQueryText).toHaveTextContent('error mock');
    });
    it('should not render circular progress', (): void => {
        const {queryByTestId} = render(
            <UsersSearch {...defaultProps} isUsersLoading={false} />
        );
        const resultsQueryText = queryByTestId('usersSearchLoader');
        expect(resultsQueryText).not.toBeInTheDocument();
    });
    it('should render circular progress', (): void => {
        const {queryByTestId} = render(
            <UsersSearch {...defaultProps} isUsersLoading={true} />
        );
        const resultsQueryText = queryByTestId('usersSearchLoader');
        expect(resultsQueryText).toBeInTheDocument();
    });
});
