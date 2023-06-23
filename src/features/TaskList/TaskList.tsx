import { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import {
    checkTask,
    reloadTaskList,
    removeMultipleTasks,
    removeTask,
    selectTaskList,
    updateTask,
} from './taskListSlice';

import { Button, TextField } from '~/components';
import { TaskItem } from '../TaskItem';

import classNames from 'classnames/bind';
import styles from './TaskList.module.scss';

const cx = classNames.bind(styles);

const TaskList: FunctionComponent = () => {
    // select the taskList state from Redux
    const taskList = useAppSelector(selectTaskList);
    const dispatch = useAppDispatch();

    // fetching the task list on component mount
    useEffect(() => {
        dispatch(reloadTaskList());
    }, [dispatch]);

    /**
     * filtering the task list based on the search text
     * and using useMemo hook to avoid unnecessary re-rendering
     */
    const [searchText, setSearchText] = useState<string>('');
    const filteredTasks = useMemo(
        () => taskList.filter((task) => task.title.toLowerCase().includes(searchText.toLowerCase())),
        [taskList, searchText],
    );

    // manage the expanded task index state
    const [expandIndex, setExpandIndex] = useState<number | null>(null);

    return (
        <div className={cx('task-list-container')}>
            <header className={cx('task-list-title')}>Todo List</header>

            {/* search input field */}
            <TextField
                label='Search Title'
                value={searchText}
                placeholder='Enter title ...'
                className={cx('search-text')}
                onChange={(e) => setSearchText(e.target.value)}
            />

            <div className={cx('task-list')}>
                {/* mapping over the filtered task list and rendering TaskItem components */}
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

            {/* rendering the bulk action section if there are checked tasks */}
            {taskList.some((task) => task.checked) && (
                <div className={cx('bulk-action')}>
                    <p className={cx('title')}>Bulk Action:</p>
                    <div className={cx('actions')}>
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
                </div>
            )}
        </div>
    );
};

export default TaskList;
