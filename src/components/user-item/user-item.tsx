import React, {memo, ReactElement} from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    CircularProgress,
    Typography,
} from '@material-ui/core';
import {RepoInterface} from '../../interfaces/repo.interface';
import {UserItemProps} from './user-item.interface';

export const UserItem = memo(
    ({user, isExpanded, onExpand, isReposLoading, repos}: UserItemProps) => {
        return (
            <Accordion
                key={user.id}
                square
                expanded={isExpanded}
                onChange={(): void => onExpand(user)}
            >
                <AccordionSummary>
                    <Typography>{user.login}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {isReposLoading && <CircularProgress />}
                    {!isReposLoading &&
                        !!repos?.length &&
                        repos.map(
                            (repoItem: RepoInterface): ReactElement => {
                                return (
                                    <div key={repoItem.id}>
                                        {repoItem.branches_url}
                                    </div>
                                );
                            }
                        )}
                    {!isReposLoading && !repos?.length && (
                        <Typography>
                            Selected user does not have any repositories.
                        </Typography>
                    )}
                </AccordionDetails>
            </Accordion>
        );
    }
);
