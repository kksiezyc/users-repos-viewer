import usersReducer, {
    initialUsersState,
} from '../../../../src/redux/users/reducer';
import {
    SET_ACTIVE_USER,
    SET_RESULTS_QUERY,
    SET_USERS,
    SET_USERS_ERROR,
    TOGGLE_USERS_LOADING,
} from '../../../redux/users/action-types';
import {
    setActiveUser,
    setResultsQuery,
    setUsers,
    setUsersError,
    toggleUsersLoading,
} from '../../../redux/users/action-creators';
import {UserInterface} from '../../../interfaces/user.interface';

describe('users-reducer', (): void => {
    it('should return initial state', (): void => {
        expect(usersReducer(undefined, {})).toEqual(initialUsersState);
    });
    it(`should handle ${SET_USERS}`, (): void => {
        const usersMock = [
            {
                id: 1,
            },
        ];
        expect(
            usersReducer(undefined, setUsers(usersMock as UserInterface[]))
        ).toEqual({
            ...initialUsersState,
            users: usersMock,
        });
    });
    it(`should handle ${TOGGLE_USERS_LOADING}`, (): void => {
        expect(usersReducer(undefined, toggleUsersLoading(false))).toEqual({
            ...initialUsersState,
            isUsersLoading: false,
        });
        expect(usersReducer(undefined, toggleUsersLoading(true))).toEqual({
            ...initialUsersState,
            isUsersLoading: true,
        });
    });
    it(`should handle ${SET_USERS_ERROR}`, (): void => {
        expect(usersReducer(undefined, setUsersError('mock'))).toEqual({
            ...initialUsersState,
            usersError: 'mock',
        });
    });
    it(`should handle ${SET_ACTIVE_USER}`, (): void => {
        expect(usersReducer(undefined, setActiveUser(123))).toEqual({
            ...initialUsersState,
            activeUserId: 123,
        });
    });
    it(`should handle ${SET_RESULTS_QUERY}`, (): void => {
        expect(usersReducer(undefined, setResultsQuery('mock'))).toEqual({
            ...initialUsersState,
            resultsQuery: 'mock',
        });
    });
});
