import React, {
    ChangeEvent,
    KeyboardEvent,
    ReactElement,
    useCallback,
    useState,
} from 'react';
import {
    Button,
    Card,
    CardContent,
    CircularProgress,
    TextField,
    Typography,
} from '@material-ui/core';
import styles from './users-search.module.scss';
import {connect} from 'react-redux';
import {UsersActionTypes} from '../../redux/users/action-types';
import {bindActionCreators} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {RootState} from '../../redux/store';
import {fetchUsers} from '../../redux/users/actions';
import {UsersList} from '../users-list/users-list';
import {UsersSearchProps} from './users-search.interface';
import {setActiveUser} from '../../redux/users/action-creators';

export const UsersSearch = ({
    users,
    activeUserId,
    setActiveUser: setActiveUserAction,
    fetchUsers: fetchUsersAction,
    isUsersLoading,
    usersError,
    resultsQuery,
}: UsersSearchProps): ReactElement => {
    const [searchValue, setSearchValue] = useState<string>('');

    const handleEnterPress = useCallback(
        ({key}: KeyboardEvent<HTMLDivElement>): void => {
            if (key === 'Enter') {
                fetchUsersAction(searchValue);
            }
        },
        [searchValue, fetchUsersAction]
    );

    const handleValueChange = useCallback(
        ({target: {value}}: ChangeEvent<HTMLInputElement>): void => {
            setSearchValue(value);
        },
        [setSearchValue]
    );

    const searchRepos = useCallback((): void => {
        fetchUsersAction(searchValue);
    }, [fetchUsersAction, searchValue]);

    return (
        <Card className={styles.container}>
            <CardContent className={styles.cardContent}>
                <div className={styles.searchBox}>
                    <TextField
                        value={searchValue}
                        onChange={handleValueChange}
                        onKeyUp={handleEnterPress}
                        placeholder={'Enter username'}
                        label={'Enter username'}
                        variant={'outlined'}
                    />
                    <Button
                        disabled={!searchValue || isUsersLoading}
                        onClick={searchRepos}
                        className={styles.searchButton}
                        variant={'contained'}
                        color={'primary'}
                    >
                        Search
                    </Button>
                    {resultsQuery && (
                        <Typography
                            data-testid={'usersSearchResultsQuery'}
                            color={'textSecondary'}
                            className={styles.resultsQuery}
                        >
                            {`Showing results for: ${resultsQuery}`}
                        </Typography>
                    )}
                </div>
                <div className={styles.innerCardContent}>
                    {!isUsersLoading && !usersError && (
                        <UsersList
                            users={users}
                            setActiveUser={setActiveUserAction}
                            activeUserId={activeUserId}
                        />
                    )}
                    {!isUsersLoading && usersError && (
                        <Typography data-testid={'usersSearchError'} color={'error'}>{usersError}</Typography>
                    )}
                    {isUsersLoading && <CircularProgress data-testid={'usersSearchLoader'} />}
                </div>
            </CardContent>
        </Card>
    );
};

const mapStateToProps = ({users}: RootState) => ({
    users: users.users,
    activeUserId: users.activeUserId,
    isUsersLoading: users.isUsersLoading,
    usersError: users.usersError,
    resultsQuery: users.resultsQuery,
});
const mapDispatchToProps = (
    dispatch: ThunkDispatch<RootState, void, UsersActionTypes>
) => ({
    ...bindActionCreators({fetchUsers, setActiveUser}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersSearch);
