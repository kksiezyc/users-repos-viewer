import {AppDispatch, RootState} from '../store';
import {Action} from 'redux';
import {ThunkAction} from 'redux-thunk';
import axios, {AxiosResponse} from 'axios';
import {
    setResultsQuery,
    setUsers,
    setUsersError,
    toggleUsersLoading,
} from './action-creators';
import {UserInterface} from '../../interfaces/user.interface';
import {apiConfig} from '../../config/api';
import {ApiEndpointsEnum} from '../../enums/api-endpoints.enum';
import {Errors} from '../../enums/errors.enum';

export const fetchUsers = (
    searchValue: string
): ThunkAction<void, RootState, unknown, Action> => async (
    dispatch: AppDispatch
): Promise<void> => {
    try {
        dispatch(setUsersError(''));
        dispatch(toggleUsersLoading(true));
        dispatch(setResultsQuery(''));

        const response: AxiosResponse<{
            total_count: number;
            incomplete_results: boolean;
            items: UserInterface[];
        }> = await axios.get(
            `${apiConfig.API_URL}/${ApiEndpointsEnum.SEARCH_USERS}?q=${searchValue}`
        );

        const users = response.data.items;
        if (users?.length) {
            dispatch(setUsers(response.data.items));
            dispatch(toggleUsersLoading(false));
            dispatch(setResultsQuery(searchValue));
        } else {
            dispatch(
                setUsersError(Errors.NO_RESULTS)
            );
            dispatch(toggleUsersLoading(false));
        }
    } catch (e) {
        dispatch(setUsersError(Errors.SOMETHING_WENT_WRONG));
        dispatch(toggleUsersLoading(false));
    }
};
