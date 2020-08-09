import {AppDispatch, RootState} from '../store';
import {Action} from 'redux';
import {ThunkAction} from 'redux-thunk';
import axios, {AxiosResponse, CancelTokenSource} from 'axios';
import {setRepos, setReposError, toggleReposLoading} from './action-creators';
import {RepoInterface} from '../../interfaces/repo.interface';
import {Requests} from '../../enums/requests.enum';
import {Errors} from '../../enums/errors.enum';

let ajaxRequest: CancelTokenSource[] = [];

export const fetchRepos = (
    reposUrl: string
): ThunkAction<void, RootState, unknown, Action> => async (
    dispatch: AppDispatch
): Promise<void> => {
    try {
        if (ajaxRequest.length) {
            ajaxRequest.forEach((requestToken: CancelTokenSource): void => {
                requestToken.cancel(Requests.REQUEST_CANCEL);
            })
            ajaxRequest = [];
        }
        const currentCancelToken = axios.CancelToken.source();
        ajaxRequest.push(currentCancelToken);

        dispatch(setReposError(''));
        dispatch(toggleReposLoading(true));

        const response: AxiosResponse<RepoInterface[]> = await axios.get(
            reposUrl,
            {
                cancelToken: currentCancelToken.token,
            }
        );

        const repos = response.data;

        if (repos?.length) {
            dispatch(setRepos(response.data));
            dispatch(toggleReposLoading(false));
        } else {
            dispatch(
                setReposError(Errors.NO_REPOS)
            );
            dispatch(toggleReposLoading(false));
        }
    } catch (e) {
        if (e.message === Requests.REQUEST_CANCEL) {
            return;
        }
        dispatch(setReposError(Errors.SOMETHING_WENT_WRONG));
        dispatch(toggleReposLoading(false));
    }
};
