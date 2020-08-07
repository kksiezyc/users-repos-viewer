import {AppDispatch, RootState} from '../store';
import {Action} from 'redux';
import {ThunkAction} from 'redux-thunk';
import axios, {AxiosResponse} from 'axios';
import {setRepos, setReposError, toggleReposLoading} from './action-creators';
import {RepoInterface} from '../../interfaces/repo.interface';

export const fetchRepos = (
    reposUrl: string
): ThunkAction<void, RootState, unknown, Action> => async (
    dispatch: AppDispatch
): Promise<void> => {
    try {
        dispatch(setReposError(''));
        dispatch(toggleReposLoading(true));

        const response: AxiosResponse<RepoInterface[]> = await axios.get(
            reposUrl
        );

        console.log('reponse', response);
        dispatch(setRepos(response.data));
        dispatch(toggleReposLoading(false));
    } catch (e) {
        dispatch(setReposError('Something went wrong, try again'));
        dispatch(toggleReposLoading(false));
    }
};
