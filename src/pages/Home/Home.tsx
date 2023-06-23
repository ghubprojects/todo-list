import TaskCreationForm from '~/features/TaskCreationForm/TaskCreationForm';
import TaskList from '~/features/TaskList/TaskList';

import classNames from 'classnames/bind';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

const Home: React.FunctionComponent = () => {
    return (
        <div className={cx('home-container')}>
            <TaskCreationForm />
            <TaskList />
        </div>
    );
};

export default Home;
