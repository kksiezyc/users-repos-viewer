import {render} from '@testing-library/react';
import React from 'react';
import {UsersSearchProps} from '../../../components/users-search/users-search.interface';
import {UsersSearch} from '../../../components/users-search/users-search';
import {UsersList} from '../../../components/users-list/users-list';
import {UsersListProps} from '../../../components/users-list/user-list.interface';

const defaultProps: UsersListProps = {
    users: [],
    activeUserId: 0,
    setActiveUser: jest.fn,
    isUsersLoading: false,
    usersError: '',
};

describe('users-list', (): void => {
    it('should not render users list if users are loading or there is an error', (): void => {
        let component = render(
            <UsersList
                {...defaultProps}
                isUsersLoading={false}
                usersError={'error'}
            />
        );
        let usersList = component.queryByTestId('usersList');
        expect(usersList).not.toBeInTheDocument();
        component = render(
            <UsersList
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
            <UsersList
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
            <UsersList
                {...defaultProps}
                isUsersLoading={true}
                usersError={'error'}
            />
        );
        let usersList = component.queryByTestId('usersSearchError');
        expect(usersList).not.toBeInTheDocument();
        component = render(
            <UsersList
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
            <UsersList {...defaultProps} usersError={'error mock'} />
        );
        const resultsQueryText = queryByTestId('usersSearchError');
        expect(resultsQueryText).toBeInTheDocument();
        expect(resultsQueryText).toHaveTextContent('error mock');
    });
    it('should not render circular progress', (): void => {
        const {queryByTestId} = render(
            <UsersList {...defaultProps} isUsersLoading={false} />
        );
        const resultsQueryText = queryByTestId('usersSearchLoader');
        expect(resultsQueryText).not.toBeInTheDocument();
    });
    it('should render circular progress', (): void => {
        const {queryByTestId} = render(
            <UsersList {...defaultProps} isUsersLoading={true} />
        );
        const resultsQueryText = queryByTestId('usersSearchLoader');
        expect(resultsQueryText).toBeInTheDocument();
    });
});
