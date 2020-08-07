import React, {ReactElement, useCallback, useMemo, useState} from 'react';
import styles from './users-list.module.scss';
import {UserInterface} from '../../interfaces/user.interface';
import {RootState} from '../../redux/store';
import {ThunkDispatch} from 'redux-thunk';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ReposActionTypes} from '../../redux/repos/action-types';
import {fetchRepos} from '../../redux/repos/actions';
import {UsersListProps} from './user-list.interface';
import {UserItem} from '../user-item/user-item';

export const UsersList = ({
    users,
    fetchRepos: fetchReposAction,
    isReposLoading,
    reposError,
    repos,
}: UsersListProps): ReactElement => {
    const [expandedUserId, setExpandedUserId] = useState<number>(0);
    const handleExpanded = useCallback(
        ({id, repos_url}: UserInterface): void => {
            fetchReposAction(repos_url);
            setExpandedUserId(id);
        },
        []
    );
    const emptyRepos = useMemo((): [] => [], []);

    return (
        <div className={styles.container}>
            {users.map(
                (user: UserInterface): ReactElement => {
                    const componentToUpdate = expandedUserId === user.id;
                    return (
                        <UserItem
                            repos={componentToUpdate ? repos : emptyRepos}
                            reposError={componentToUpdate ? reposError : ''}
                            isReposLoading={componentToUpdate && isReposLoading}
                            key={user.id}
                            user={user}
                            isExpanded={componentToUpdate}
                            onExpand={handleExpanded}
                        />
                    );
                }
            )}
        </div>
    );
};

const mapStateToProps = ({repos, users}: RootState) => ({
    users: users.users,
    repos: repos.repos,
    isReposLoading: repos.isReposLoading,
    reposError: repos.reposError,
});
const mapDispatchToProps = (
    dispatch: ThunkDispatch<RootState, void, ReposActionTypes>
) => ({
    ...bindActionCreators({fetchRepos}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
