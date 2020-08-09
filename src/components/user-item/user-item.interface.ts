import {UserInterface} from '../../interfaces/user.interface';
import {fetchRepos} from '../../redux/repos/actions';
import {setActiveUser} from '../../redux/users/action-creators';

export interface UserItemProps {
    user: UserInterface;
    isExpanded: boolean;
    fetchRepos: typeof fetchRepos;
    onExpandHandler: typeof setActiveUser;
}
