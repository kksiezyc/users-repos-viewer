import React, {
    ChangeEvent,
    ReactElement,
    useState,
} from 'react';
import {Button, Card, CardContent, TextField} from '@material-ui/core';
import styles from './users-search.module.scss';
import {connect} from 'react-redux';
import {UsersActionTypes} from '../../redux/users/action-types';
import {bindActionCreators} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {RootState} from '../../redux/store';
import {fetchUsers} from '../../redux/users/actions';
import {UserInterface} from '../../interfaces/user.interface';
import UsersList from '../users-list/users-list';
export interface UsersSearchProps {
    users: UserInterface[];
    isUsersLoading: boolean;
    usersError: string;
    fetchUsers: typeof fetchUsers;
}

export const UsersSearch = ({fetchUsers: fetchUsersAction, users, isUsersLoading, usersError}: UsersSearchProps): ReactElement => {
    const [searchValue, setSearchValue] = useState<string>('');

    const handleValueChange = ({
        target: {value},
    }: ChangeEvent<HTMLInputElement>): void => setSearchValue(value);

    const searchRepos = async (): Promise<void> => {
        fetchUsersAction(searchValue);
    }

    return (
        <Card>
            <CardContent className={styles.cardContent}>
                <div className={styles.searchBox}>
                    <TextField
                        value={searchValue}
                        onChange={handleValueChange}
                        placeholder={'Enter username'}
                        id={'outlined-basic'}
                        label={'Enter username'}
                        variant={'outlined'}
                    />
                    <Button
                        onClick={searchRepos}
                        className={styles.searchButton}
                        variant={'contained'}
                        color={'primary'}
                    >
                        Search
                    </Button>
                </div>
                {!!users?.length && <UsersList/>}
            </CardContent>
        </Card>
    );
};

const mapStateToProps =({users}: RootState) => ({
    users: users.users,
    isUsersLoading: users.isUsersLoading,
    usersError: users.usersError
})
const mapDispatchToProps = (
    dispatch: ThunkDispatch<RootState, void, UsersActionTypes>
) => ({
    ...bindActionCreators({fetchUsers}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersSearch);
