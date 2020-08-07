import {UserInterface} from '../../interfaces/user.interface';

export const SET_USERS = 'SET_USERS';
export const TOGGLE_USERS_LOADING = 'TOGGLE_USERS_LOADING';
export const SET_USERS_ERROR = 'SET_USERS_ERROR';

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

export type UsersActionTypes =
    | SetUsersAction
    | ToggleUsersLoadingAction
    | SetUsersErrorAction;
