import {fetchUsers} from '../../redux/users/actions';
import {UserInterface} from '../../interfaces/user.interface';
import {setActiveUser} from '../../redux/users/action-creators';

export interface UsersSearchProps {
    users: UserInterface[];
    activeUserId: number;
    setActiveUser: typeof setActiveUser;
    isUsersLoading: boolean;
    usersError: string;
    resultsQuery: string;
    fetchUsers: typeof fetchUsers;
}
