import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import {
    checkTask,
    reloadTaskList,
    removeMultipleTasks,
    removeTask,
    selectTaskList,
    updateTask,
} from './taskListSlice';

import { TaskItem } from '../TaskItem';
import styles from './TaskList.module.scss';
import { Button, TextField } from '~/components';

const cx = classNames.bind(styles);

const TaskList: React.FunctionComponent = () => {
    const taskList = useAppSelector(selectTaskList);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(reloadTaskList());
    }, [dispatch]);

    // Search Tasks
    const [searchText, setSearchText] = useState<string>('');
    const filteredTasks = taskList.filter((task) =>
        task.title.toLowerCase().includes(searchText.toLowerCase()),
    );

    // Handle TaskItem expend event prop
    const [expandIndex, setExpandIndex] = useState<number | null>(null);

    return (
        <div className={cx('task-list-container')}>
            <header>
                <h1>Todo List</h1>
            </header>
            {/* Search Input */}
            <TextField
                value={searchText}
                placeholder='Search ...'
                className={cx('search-text')}
                onChange={(e) => setSearchText(e.target.value)}
            />
            {/* Task List */}
            <div className={cx('task-list')}>
                {filteredTasks.map((task, index) => (
                    <TaskItem
                        key={index}
                        task={task}
                        isExpanded={expandIndex === index}
                        onExpand={(isExpand) => setExpandIndex(!isExpand ? index : null)}
                        onCheck={(isChecked) => {
                            setExpandIndex(null);
                            dispatch(checkTask({ index, isChecked }));
                        }}
                        onDelete={() => {
                            setExpandIndex(null);
                            dispatch(removeTask(index));
                        }}
                        onUpdate={(updatedTask) => {
                            setExpandIndex(null);
                            dispatch(updateTask({ index, updatedTask }));
                        }}
                    />
                ))}
            </div>
            {/* Bulk Action */}
            {taskList.some((task) => task.checked) && (
                <div className={cx('bulk-action')}>
                    <Button color='green'>Done</Button>
                    <Button
                        color='red'
                        onClick={() => {
                            setExpandIndex(null);
                            dispatch(removeMultipleTasks());
                        }}
                    >
                        Remove All
                    </Button>
                </div>
            )}
        </div>
    );
};

export default TaskList;
