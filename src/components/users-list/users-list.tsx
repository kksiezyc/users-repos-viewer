import React, {ReactElement} from 'react';
import styles from './users-list.module.scss';
import {UserInterface} from '../../interfaces/user.interface';
import {RootState} from '../../redux/store';
import {connect} from 'react-redux';
import {UsersListProps} from './user-list.interface';
import UserItem from '../user-item/user-item';
import {bindActionCreators} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {ReposActionTypes} from '../../redux/repos/action-types';
import {setActiveUser} from '../../redux/users/action-creators';

export const UsersList = ({
    users,
    activeUserId,
    setActiveUser: setActiveUserAction,
}: UsersListProps): ReactElement => (
    <div className={styles.container}>
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

const mapStateToProps = ({users}: RootState) => ({
    users: users.users,
    activeUserId: users.activeUserId,
});

const mapDispatchToProps = (
    dispatch: ThunkDispatch<RootState, void, ReposActionTypes>
) => ({
    ...bindActionCreators({setActiveUser}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
