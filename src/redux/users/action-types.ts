import {UserInterface} from '../../interfaces/user.interface';

export const SET_USERS = 'SET_USERS';
export const TOGGLE_USERS_LOADING = 'TOGGLE_USERS_LOADING';
export const SET_USERS_ERROR = 'SET_USERS_ERROR';
export const SET_ACTIVE_USER = 'SET_ACTIVE_USER';
export const SET_RESULTS_QUERY = 'SET_RESULTS_QUERY';

export interface SetUsersAction {
    type: typeof SET_USERS;
    users: UserInterface[];
}

export interface ToggleUsersLoadingAction {
    type: typeof TOGGLE_USERS_LOADING;
    isUsersLoading: boolean;
}

export interface SetUsersErrorAction {
    type: typeof SET_USERS_ERROR;
    usersError: string;
}

export interface SetActiveUserAction {
    type: typeof SET_ACTIVE_USER;
    activeUserId: number;
}

export interface SetResultsQueryAction {
    type: typeof SET_RESULTS_QUERY;
    resultsQuery: string;
}

export type UsersActionTypes =
    | SetUsersAction
    | SetActiveUserAction
    | ToggleUsersLoadingAction
    | SetUsersErrorAction
    | SetResultsQueryAction;
