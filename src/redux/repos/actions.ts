import {AppDispatch, RootState} from '../store';
import {Action} from 'redux';
import {ThunkAction} from 'redux-thunk';
import axios, {AxiosResponse, CancelTokenSource} from 'axios';
import {setRepos, setReposError, toggleReposLoading} from './action-creators';
import {RepoInterface} from '../../interfaces/repo.interface';
import {Requests} from '../../enums/requests.enum';

let ajaxRequest!: CancelTokenSource | null;

export const fetchRepos = (
    reposUrl: string
): ThunkAction<void, RootState, unknown, Action> => async (
    dispatch: AppDispatch
): Promise<void> => {
    try {
        if (ajaxRequest) {
            ajaxRequest.cancel(Requests.REQUEST_CANCEL);
        }
        ajaxRequest = axios.CancelToken.source();

        dispatch(setReposError(''));
        dispatch(toggleReposLoading(true));

        const response: AxiosResponse<RepoInterface[]> = await axios.get(
            reposUrl,
            {
                cancelToken: ajaxRequest.token,
            }
        );

        const repos = response.data;

        if (repos?.length) {
            dispatch(setRepos(response.data));
            dispatch(toggleReposLoading(false));
        } else {
            dispatch(
                setReposError('Selected users does not have any repositories.')
            );
            dispatch(toggleReposLoading(false));
        }
        ajaxRequest = null;
    } catch (e) {
        ajaxRequest = null;
        if (e.message === Requests.REQUEST_CANCEL) {
            return;
        }
        dispatch(setReposError('Something went wrong, try again.'));
        dispatch(toggleReposLoading(false));
    }
};
