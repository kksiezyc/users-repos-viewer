import {UserInterface} from '../../interfaces/user.interface';
import {setActiveUser} from '../../redux/users/action-creators';

export interface UsersListProps {
    users: UserInterface[];
    activeUserId: number;
    setActiveUser: typeof setActiveUser;
    isUsersLoading: boolean;
    usersError: string;
}
