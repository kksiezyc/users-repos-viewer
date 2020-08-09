import {
    SET_USERS,
    SET_RESULTS_QUERY,
    SET_USERS_ERROR,
    TOGGLE_USERS_LOADING,
} from '../../../redux/users/action-types';
import axios from 'axios';
import {UserInterface} from '../../../interfaces/user.interface';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {fetchUsers} from '../../../redux/users/actions';

describe('users-actions', (): void => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const store = mockStore({});

    beforeEach(() => {
        store.clearActions();
        jest.clearAllMocks();
    });

    it('should fetch repos and dispatch proper methods for not empty content', async (): Promise<
        void
    > => {
        const usersMock = [
            {
                id: 1,
            },
        ];
        const searchValue = 'mock';
        const expectedActions = [
            {type: SET_USERS_ERROR, usersError: ''},
            {type: TOGGLE_USERS_LOADING, isUsersLoading: true},
            {type: SET_RESULTS_QUERY, resultsQuery: ''},
            {type: SET_USERS, users: usersMock},
            {type: TOGGLE_USERS_LOADING, isUsersLoading: false},
            {type: SET_RESULTS_QUERY, resultsQuery: searchValue},
        ];
        axios.get = jest
            .fn()
            .mockImplementation(
                async (): Promise<{data: {items: UserInterface[]}}> =>
                    new Promise((res) =>
                        res({data: {items: usersMock as UserInterface[]}})
                    )
            );
        await store.dispatch(fetchUsers(searchValue));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should fetch repos and dispatch proper methods for empty content', async (): Promise<
        void
    > => {
        const usersMock = [];
        const expectedActions = [
            {type: SET_USERS_ERROR, usersError: ''},
            {type: TOGGLE_USERS_LOADING, isUsersLoading: true},
            {type: SET_RESULTS_QUERY, resultsQuery: ''},
            {
                type: SET_USERS_ERROR,
                usersError: 'No results. Please narrow your parameters.',
            },
            {type: TOGGLE_USERS_LOADING, isUsersLoading: false},
        ];
        axios.get = jest
            .fn()
            .mockImplementation(
                async (): Promise<{data: {items: UserInterface[]}}> =>
                    new Promise((res) =>
                        res({data: {items: usersMock as UserInterface[]}})
                    )
            );
        await store.dispatch(fetchUsers('mock'));
        expect(store.getActions()).toEqual(expectedActions);
    });

    it('should dispatch proper methods on request fail', async (): Promise<
        void
    > => {
        const expectedActions = [
            {type: SET_USERS_ERROR, usersError: ''},
            {type: TOGGLE_USERS_LOADING, isUsersLoading: true},
            {type: SET_RESULTS_QUERY, resultsQuery: ''},
            {
                type: SET_USERS_ERROR,
                usersError: 'Something went wrong, try again.',
            },
            {type: TOGGLE_USERS_LOADING, isUsersLoading: false},
        ];
        axios.get = jest
            .fn()
            .mockImplementation(
                async (): Promise<{data: {items: UserInterface[]}}> =>
                    new Promise((res, rej) => rej('mock'))
            );
        await store.dispatch(fetchUsers('mock'));
        expect(store.getActions()).toEqual(expectedActions);
    });
});
