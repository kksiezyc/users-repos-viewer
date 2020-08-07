import {RepoInterface} from '../../interfaces/repo.interface';

export const SET_REPOS = 'SET_REPOS';
export const TOGGLE_REPOS_LOADING = 'TOGGLE_REPOS_LOADING';
export const SET_REPOS_ERROR = 'SET_REPOS_ERROR';

export interface SetReposAction {
    type: typeof SET_REPOS;
    repos: RepoInterface[];
}

export interface ToggleReposLoadingAction {
    type: typeof TOGGLE_REPOS_LOADING;
    isReposLoading: boolean;
}

export interface SetReposErrorAction {
    type: typeof SET_REPOS_ERROR;
    reposError: string;
}

export type ReposActionTypes =
    | SetReposAction
    | ToggleReposLoadingAction
    | SetReposErrorAction;
