import React, {ReactElement} from 'react';
import styles from './users-list.module.scss';
import {UserInterface} from '../../interfaces/user.interface';
import {UsersListProps} from './user-list.interface';
import UserItem from '../user-item/user-item';
import {CircularProgress, Typography} from '@material-ui/core';

export const UsersList = ({
    users,
    activeUserId,
    setActiveUser: setActiveUserAction,
    isUsersLoading,
    usersError,
}: UsersListProps): ReactElement => (
    <div className={styles.container}>
        {!isUsersLoading && !usersError && (
            <div data-testid={'usersList'} className={styles.usersContainer}>
                {users.map(
                    (user: UserInterface): ReactElement => (
                        <UserItem
                            key={user.id}
                            user={user}
                            isExpanded={activeUserId === user.id}
                            onExpandHandler={setActiveUserAction}
                        />
                    )
                )}
            </div>
        )}
        {!isUsersLoading && usersError && (
            <Typography data-testid={'usersSearchError'} color={'error'}>
                {usersError}
            </Typography>
        )}
        {isUsersLoading && (
            <CircularProgress data-testid={'usersSearchLoader'} />
        )}
    </div>
);
