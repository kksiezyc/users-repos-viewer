import {render} from '@testing-library/react';
import React from 'react';
import {ReposList, ReposListProps} from '../../../components/repos-list/repos-list';

const defaultProps: ReposListProps = {
    reposError: '',
    isReposLoading: false,
    repos: [],
    reposUrl: '',
    fetchRepos: jest.fn()
};

describe('repos-list', (): void => {
    it('should not render repost list if repos are loading or there is an error', (): void => {
        let component = render(
            <ReposList
                {...defaultProps}
                isReposLoading={false}
                reposError={'error'}
            />
        );
        let reposList = component.queryByTestId('reposList');
        expect(reposList).not.toBeInTheDocument();
        component = render(
            <ReposList
                {...defaultProps}
                isReposLoading={true}
                reposError={''}
            />
        );
        reposList = component.queryByTestId('reposList');
        expect(reposList).not.toBeInTheDocument();
    });
    it('should render repos list', (): void => {
        const {queryByTestId} = render(
            <ReposList
                {...defaultProps}
                isReposLoading={false}
                reposError={''}
            />
        );
        const reposList = queryByTestId('reposList');
        expect(reposList).toBeInTheDocument();
    });
    it('should not render error', (): void => {
        let component = render(
            <ReposList
                {...defaultProps}
                isReposLoading={true}
                reposError={'error'}
            />
        );
        let reposList = component.queryByTestId('reposListError');
        expect(reposList).not.toBeInTheDocument();
        component = render(
            <ReposList
                {...defaultProps}
                isReposLoading={false}
                reposError={''}
            />
        );
        reposList = component.queryByTestId('reposListError');
        expect(reposList).not.toBeInTheDocument();
    });
    it('should render error text', (): void => {
        const {queryByTestId} = render(
            <ReposList {...defaultProps} reposError={'error mock'} />
        );
        const resultsQueryText = queryByTestId('reposListError');
        expect(resultsQueryText).toBeInTheDocument();
        expect(resultsQueryText).toHaveTextContent('error mock');
    });
    it('should not render circular progress', (): void => {
        const {queryByTestId} = render(
            <ReposList {...defaultProps} isReposLoading={false} />
        );
        const resultsQueryText = queryByTestId('reposListLoader');
        expect(resultsQueryText).not.toBeInTheDocument();
    });
    it('should render circular progress', (): void => {
        const {queryByTestId} = render(
            <ReposList {...defaultProps} isReposLoading={true} />
        );
        const resultsQueryText = queryByTestId('reposListLoader');
        expect(resultsQueryText).toBeInTheDocument();
    });
});
