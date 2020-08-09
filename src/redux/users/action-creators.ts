import {UserInterface} from '../../interfaces/user.interface';
import {
    SET_ACTIVE_USER,
    SET_RESULTS_QUERY,
    SET_USERS,
    SET_USERS_ERROR,
    TOGGLE_USERS_LOADING,
    UsersActionTypes,
} from './action-types';

export const setUsers = (users: UserInterface[]): UsersActionTypes => ({
    type: SET_USERS,
    users,
});

export const toggleUsersLoading = (
    isUsersLoading: boolean
): UsersActionTypes => ({
    type: TOGGLE_USERS_LOADING,
    isUsersLoading,
});

export const setUsersError = (usersError: string): UsersActionTypes => ({
    type: SET_USERS_ERROR,
    usersError,
});

export const setActiveUser = (activeUserId: number): UsersActionTypes => ({
    type: SET_ACTIVE_USER,
    activeUserId,
});

export const setResultsQuery = (resultsQuery: string): UsersActionTypes => ({
    type: SET_RESULTS_QUERY,
    resultsQuery,
});
