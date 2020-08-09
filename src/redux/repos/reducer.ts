import {
    SET_REPOS,
    SET_REPOS_ERROR,
    TOGGLE_REPOS_LOADING,
    ReposActionTypes,
} from './action-types';
import {RepoInterface} from '../../interfaces/repo.interface';

interface ReposStateInterface {
    repos: RepoInterface[];
    isReposLoading: boolean;
    reposError: string;
}

export const initialReposState: ReposStateInterface = {
    repos: [],
    isReposLoading: false,
    reposError: '',
};
export default function usersReducer(
    state = initialReposState,
    action: ReposActionTypes
): ReposStateInterface {
    switch (action.type) {
        case SET_REPOS: {
            return {
                ...state,
                repos: action.repos,
            };
        }
        case TOGGLE_REPOS_LOADING: {
            return {
                ...state,
                isReposLoading: action.isReposLoading,
            };
        }
        case SET_REPOS_ERROR: {
            return {
                ...state,
                reposError: action.reposError,
            };
        }
        default:
            return state;
    }
}
