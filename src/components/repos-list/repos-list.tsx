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
}
export const ReposList = ({
    repos,
    isReposLoading,
}: ReposListProps): ReactElement => (
    <div className={styles.container}>
        {isReposLoading && <CircularProgress />}
        {!isReposLoading && !!repos?.length && (
            <div className={styles.reposContainer}>
                {repos.map(
                    (repoItem: RepoInterface): ReactElement => (
                        <RepoItem key={repoItem.id} repoItem={repoItem} />
                    )
                )}
            </div>
        )}
        {!isReposLoading && !repos?.length && (
            <Typography>
                Selected user does not have any repositories.
            </Typography>
        )}
    </div>
);

const mapStateToProps = ({repos}: RootState) => ({
    isReposLoading: repos.isReposLoading,
    repos: repos.repos,
});

export default connect(mapStateToProps)(ReposList);
