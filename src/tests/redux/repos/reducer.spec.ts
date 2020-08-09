import reposReducer, {
    initialReposState,
} from '../../../../src/redux/repos/reducer';
import {
    SET_REPOS,
    SET_REPOS_ERROR,
    TOGGLE_REPOS_LOADING,
} from '../../../redux/repos/action-types';
import {
    setRepos,
    setReposError,
    toggleReposLoading,
} from '../../../redux/repos/action-creators';
import {RepoInterface} from '../../../interfaces/repo.interface';

describe('repos-reducer', (): void => {
    it('should return initial state', (): void => {
        expect(reposReducer(undefined, {})).toEqual(initialReposState);
    });
    it(`should handle ${SET_REPOS}`, (): void => {
        const reposMock = [
            {
                id: 1,
            },
        ];
        expect(
            reposReducer(undefined, setRepos(reposMock as RepoInterface[]))
        ).toEqual({
            ...initialReposState,
            repos: reposMock,
        });
    });
    it(`should handle ${TOGGLE_REPOS_LOADING}`, (): void => {
        expect(reposReducer(undefined, toggleReposLoading(false))).toEqual({
            ...initialReposState,
            isReposLoading: false,
        });
        expect(reposReducer(undefined, toggleReposLoading(true))).toEqual({
            ...initialReposState,
            isReposLoading: true,
        });
    });
    it(`should handle ${SET_REPOS_ERROR}`, (): void => {
        expect(reposReducer(undefined, setReposError('mock'))).toEqual({
            ...initialReposState,
            reposError: 'mock',
        });
    });
});
