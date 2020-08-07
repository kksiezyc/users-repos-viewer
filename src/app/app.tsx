import React, {ReactElement} from 'react';
import styles from './app.module.scss';

export const App = (): ReactElement => (
    <div className={styles.container}>
        {'hello world'}
    </div>
);

export default App;
