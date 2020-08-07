import React, {ReactElement} from 'react';
import styles from './app.module.scss';
import UsersSearch from '../components/users-search/users-search';

export const App = (): ReactElement => (
    <div className={styles.container}>
        <UsersSearch />
    </div>
);

export default App;
