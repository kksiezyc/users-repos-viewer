import {UserInterface} from '../../interfaces/user.interface';
import {RepoInterface} from '../../interfaces/repo.interface';

export interface UserItemProps {
    user: UserInterface;
    isExpanded: boolean;
    onExpand: (user: UserInterface) => void;
    reposError: string;
    isReposLoading: boolean;
    repos: RepoInterface[];
}
