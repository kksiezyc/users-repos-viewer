import React, {ReactElement} from 'react';
import styles from './users-list.module.scss';
import {UserInterface} from '../../interfaces/user.interface';
import {UsersListProps} from './user-list.interface';
import UserItem from '../user-item/user-item';

export const UsersList = ({
    users,
    activeUserId,
    setActiveUser: setActiveUserAction,
}: UsersListProps): ReactElement => (
    <div data-testid={'usersList'} className={styles.container}>
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
);
