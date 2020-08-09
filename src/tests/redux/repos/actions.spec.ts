import axios from 'axios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {
    SET_REPOS,
    SET_REPOS_ERROR,
    TOGGLE_REPOS_LOADING,
} from '../../../redux/repos/action-types';
import {RepoInterface} from '../../../interfaces/repo.interface';
import {fetchRepos} from '../../../redux/repos/actions';
import {Requests} from '../../../enums/requests.enum';
jest.mock('axios');

describe('repos actions', (): void => {
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
        const reposMock = [
            {
                id: 1,
            },
        ];
        const expectedActions = [
            {type: SET_REPOS_ERROR, reposError: ''},
            {type: TOGGLE_REPOS_LOADING, isReposLoading: true},
            {type: SET_REPOS, repos: reposMock},
            {type: TOGGLE_REPOS_LOADING, isReposLoading: false},
        ];
        axios.CancelToken.source = jest.fn().mockImplementation(() => ({
            token: 'some value',
            cancel: jest.fn()
        }));
        axios.get = jest
            .fn()
            .mockImplementation(
                async (): Promise<{data: RepoInterface[]}> =>
                    new Promise((res) =>
                        res({data: reposMock as RepoInterface[]})
                    )
            );
        await store.dispatch(fetchRepos('mock'));
        expect(store.getActions()).toEqual(expectedActions);
    });
    it('should fetch repos and dispatch proper methods for empty content', async (): Promise<
        void
    > => {
        const reposMock = [];
        const expectedActions = [
            {type: SET_REPOS_ERROR, reposError: ''},
            {type: TOGGLE_REPOS_LOADING, isReposLoading: true},
            {
                type: SET_REPOS_ERROR,
                reposError: 'Selected users does not have any repositories.',
            },
            {type: TOGGLE_REPOS_LOADING, isReposLoading: false},
        ];
        axios.CancelToken.source = jest.fn().mockImplementation(() => ({
            token: 'some value',
            cancel: jest.fn()
        }));
        axios.get = jest
            .fn()
            .mockImplementation(
                async (): Promise<{data: RepoInterface[]}> =>
                    new Promise((res) =>
                        res({data: reposMock as RepoInterface[]})
                    )
            );
        await store.dispatch(fetchRepos('mock'));
        expect(store.getActions()).toEqual(expectedActions);
    });
    it('should dispatch proper methods on request fail (not cancelled)', async (): Promise<
        void
    > => {
        const expectedActions = [
            {type: SET_REPOS_ERROR, reposError: ''},
            {type: TOGGLE_REPOS_LOADING, isReposLoading: true},
            {
                type: SET_REPOS_ERROR,
                reposError: 'Something went wrong, try again.',
            },
            {type: TOGGLE_REPOS_LOADING, isReposLoading: false},
        ];
        axios.CancelToken.source = jest.fn().mockImplementation(() => ({
            token: 'some value',
            cancel: jest.fn()
        }));
        axios.get = jest
            .fn()
            .mockImplementation(
                async (): Promise<{data: RepoInterface[]}> =>
                    new Promise((res, rej) => rej('mock'))
            );
        await store.dispatch(fetchRepos('mock'));
        expect(store.getActions()).toEqual(expectedActions);
    });
    it('should dispatch proper methods on request cancel', async (): Promise<
        void
    > => {
        const expectedActions = [
            {type: SET_REPOS_ERROR, reposError: ''},
            {type: TOGGLE_REPOS_LOADING, isReposLoading: true},
        ];
        axios.CancelToken.source = jest.fn().mockImplementation(() => ({
            token: 'some value',
            cancel: jest.fn()
        }));
        axios.get = jest
            .fn()
            .mockImplementation(
                async (): Promise<{data: RepoInterface[]}> =>
                    new Promise((res, rej) =>
                        rej({message: Requests.REQUEST_CANCEL})
                    )
            );
        await store.dispatch(fetchRepos('mock'));
        expect(store.getActions()).toEqual(expectedActions);
    });
    it('should cancel previous request if ajaxRequest object is truthy', async (): Promise<
        void
    > => {
        const cancelTokenMock = {
            token: 'some value',
            cancel: jest.fn(),
        };
        axios.CancelToken.source = jest
            .fn()
            .mockImplementation(() => cancelTokenMock);
        store.dispatch(fetchRepos('mock'));
        expect(cancelTokenMock.cancel).not.toHaveBeenCalled();
        await store.dispatch(fetchRepos('mock2'));
        expect(cancelTokenMock.cancel).toHaveBeenCalledWith(
            Requests.REQUEST_CANCEL
        );
    });
});
