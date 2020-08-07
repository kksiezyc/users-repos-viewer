import {ReposActionTypes, SET_REPOS, SET_REPOS_ERROR, TOGGLE_REPOS_LOADING} from './action-types';
import {RepoInterface} from '../../interfaces/repo.interface';

export const setRepos = (repos: RepoInterface[]): ReposActionTypes => ({
    type: SET_REPOS,
    repos
});

export const toggleReposLoading = (isReposLoading: boolean): ReposActionTypes => ({
    type: TOGGLE_REPOS_LOADING,
    isReposLoading
});

export const setReposError = (reposError: string): ReposActionTypes => ({
    type: SET_REPOS_ERROR,
    reposError
})
