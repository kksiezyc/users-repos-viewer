import {UserInterface} from '../../interfaces/user.interface';
import {RepoInterface} from '../../interfaces/repo.interface';
import {fetchRepos} from '../../redux/repos/actions';

export interface UsersListProps {
    users: UserInterface[];
    fetchRepos: typeof fetchRepos;
    repos: RepoInterface[];
    isReposLoading: boolean;
    reposError: string;
}
