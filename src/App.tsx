import React from 'react';
import '~/styles/global.scss';
import TaskList from './features/TaskList/TaskList';

const App: React.FC = () => {
    return (
        <div className='app'>
            <h1>To-Do List</h1>
            <TaskList />
        </div>
    );
};

export default App;
