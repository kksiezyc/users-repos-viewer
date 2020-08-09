import {
    SET_ACTIVE_USER,
    SET_RESULTS_QUERY,
    SET_USERS,
    SET_USERS_ERROR,
    TOGGLE_USERS_LOADING,
    UsersActionTypes,
} from './action-types';
import {UserInterface} from '../../interfaces/user.interface';

interface UsersStateInterface {
    users: UserInterface[];
    isUsersLoading: boolean;
    usersError: string;
    activeUserId: number;
    resultsQuery: string;
}

const initialState: UsersStateInterface = {
    users: [],
    isUsersLoading: false,
    usersError: '',
    activeUserId: 0,
    resultsQuery: '',
};
export default function usersReducer(
    state = initialState,
    action: UsersActionTypes
): UsersStateInterface {
    switch (action.type) {
        case SET_USERS: {
            return {
                ...state,
                users: action.users,
            };
        }
        case TOGGLE_USERS_LOADING: {
            return {
                ...state,
                isUsersLoading: action.isUsersLoading,
            };
        }
        case SET_USERS_ERROR: {
            return {
                ...state,
                usersError: action.usersError,
            };
        }
        case SET_ACTIVE_USER: {
            return {
                ...state,
                activeUserId: action.activeUserId,
            };
        }
        case SET_RESULTS_QUERY: {
            return {
                ...state,
                resultsQuery: action.resultsQuery,
            };
        }
        default:
            return state;
    }
}
