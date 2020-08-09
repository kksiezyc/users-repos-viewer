import React, {ReactElement} from 'react';
import {CircularProgress, Typography} from '@material-ui/core';
import {RepoInterface} from '../../interfaces/repo.interface';
import {RepoItem} from '../repo-item/repo-item';
import {RootState} from '../../redux/store';
import {connect} from 'react-redux';
import styles from './repos-list.module.scss';

export interface ReposListProps {
    repos: RepoInterface[];
    isReposLoading: boolean;
    reposError: string;
}
export const ReposList = ({
    repos,
    isReposLoading,
    reposError
}: ReposListProps): ReactElement => (
    <div className={styles.container}>
        {!isReposLoading && !reposError && (
            <div className={styles.reposContainer}>
                {repos.map(
                    (repoItem: RepoInterface): ReactElement => (
                        <RepoItem key={repoItem.id} repoItem={repoItem} />
                    )
                )}
            </div>
        )}
        {!isReposLoading && reposError && (
            <Typography>
                {reposError}
            </Typography>
        )}
        {isReposLoading && <CircularProgress />}
    </div>
);

const mapStateToProps = ({repos}: RootState) => ({
    isReposLoading: repos.isReposLoading,
    repos: repos.repos,
    reposError: repos.reposError
});

export default connect(mapStateToProps)(ReposList);
