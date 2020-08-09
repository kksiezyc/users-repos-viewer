import {UserInterface} from '../../interfaces/user.interface';
import {fetchUsers} from '../../redux/users/actions';

export interface UsersSearchProps {
    users: UserInterface[];
    isUsersLoading: boolean;
    usersError: string;
    resultsQuery: string;
    fetchUsers: typeof fetchUsers;
}
