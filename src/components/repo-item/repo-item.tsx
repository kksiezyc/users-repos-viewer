import React, {ReactElement, useCallback} from 'react';
import {Card, CardActionArea, CardContent, Typography} from '@material-ui/core';
import {RepoInterface} from '../../interfaces/repo.interface';
import styles from './repo-item.module.scss';
import StarIcon from '@material-ui/icons/Star';

export interface RepoItemProps {
    repoItem: RepoInterface;
}
export const RepoItem = ({repoItem}: RepoItemProps): ReactElement => {
    const repoClickHandler = useCallback((): void => {
        window.open(repoItem.svn_url);
    }, []);

    return (
        <Card className={styles.container}>
            <CardActionArea onClick={repoClickHandler}>
                <CardContent>
                    <div className={styles.cardTopContainer}>
                        <Typography color={'textPrimary'} gutterBottom>
                            {repoItem.name}
                        </Typography>
                        <div className={styles.stars}>
                            <Typography>{repoItem.stargazers_count}</Typography>
                            <StarIcon />
                        </div>
                    </div>
                    <Typography color={'textSecondary'}>
                        {repoItem.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};
