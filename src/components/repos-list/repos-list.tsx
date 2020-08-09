import React, {ReactElement, useCallback} from 'react';
import {CircularProgress, Typography} from '@material-ui/core';
import {RepoInterface} from '../../interfaces/repo.interface';
import {RepoItem} from '../repo-item/repo-item';
import {RootState} from '../../redux/store';
import {connect} from 'react-redux';
import styles from './repos-list.module.scss';
import {ThunkDispatch} from 'redux-thunk';
import {ReposActionTypes} from '../../redux/repos/action-types';
import {bindActionCreators} from 'redux';
import {fetchRepos} from '../../redux/repos/actions';
import RefreshIcon from '@material-ui/icons/Refresh';

export interface ReposListProps {
    repos: RepoInterface[];
    isReposLoading: boolean;
    reposError: string;
    fetchRepos: typeof fetchRepos;
    reposUrl: string;
}
export const ReposList = ({
    repos,
    isReposLoading,
    reposError,
    fetchRepos: fetchReposAction,
    reposUrl
}: ReposListProps): ReactElement => {

    const fetchRepos = useCallback((): void => {
        fetchReposAction(reposUrl);
    }, [reposUrl]);

    return (
        <div className={styles.container}>
            {!isReposLoading && !reposError && (
                <div data-testid={'reposList'} className={styles.reposContainer}>
                    {repos.map(
                        (repoItem: RepoInterface): ReactElement => (
                            <RepoItem key={repoItem.id} repoItem={repoItem} />
                        )
                    )}
                </div>
            )}
            {!isReposLoading && reposError && (
                <div className={styles.errorContainer} data-testid={'reposListError'}>
                    <Typography>
                        {reposError}
                    </Typography>
                    <RefreshIcon onClick={fetchRepos}/>
                </div>
            )}
            {isReposLoading && <CircularProgress data-testid={'reposListLoader'}/>}
        </div>
    )
}

const mapStateToProps = ({repos}: RootState) => ({
    isReposLoading: repos.isReposLoading,
    repos: repos.repos,
    reposError: repos.reposError
});

const mapDispatchToProps = (
    dispatch: ThunkDispatch<RootState, void, ReposActionTypes>
) => ({
    ...bindActionCreators({fetchRepos}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReposList);
