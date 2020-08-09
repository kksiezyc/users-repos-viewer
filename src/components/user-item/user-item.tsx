import React, {memo, useCallback} from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
} from '@material-ui/core';
import {UserItemProps} from './user-item.interface';
import {bindActionCreators} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {RootState} from '../../redux/store';
import {ReposActionTypes} from '../../redux/repos/action-types';
import {fetchRepos} from '../../redux/repos/actions';
import {connect} from 'react-redux';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styles from './user-item.module.scss';
import ReposList from '../repos-list/repos-list';

export const UserItem = memo(
    ({
        user,
        isExpanded,
        fetchRepos: fetchReposAction,
        onExpandHandler,
    }: UserItemProps) => {
        const expandUserHandler = useCallback((): void => {
            if (isExpanded) {
                onExpandHandler(0);
                return;
            }
            onExpandHandler(user.id);
            fetchReposAction(user.repos_url);
        }, [fetchReposAction, onExpandHandler, isExpanded, user.id, user.repos_url]);

        return (
            <Accordion
                data-testid={'userItem'}
                TransitionProps={{unmountOnExit: true}}
                expanded={isExpanded}
                onChange={expandUserHandler}
            >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{user.login}</Typography>
                </AccordionSummary>
                {isExpanded && (
                    <AccordionDetails
                        data-testid={'userItemAccordionDetails'}
                        className={styles.accordionDetails}
                    >
                        <ReposList reposUrl={user.repos_url} />
                    </AccordionDetails>
                )}
            </Accordion>
        );
    }
);

UserItem.displayName = 'UserItem';

const mapDispatchToProps = (
    dispatch: ThunkDispatch<RootState, void, ReposActionTypes>
) => ({
    ...bindActionCreators({fetchRepos}, dispatch),
});

export default connect(null, mapDispatchToProps)(UserItem);
