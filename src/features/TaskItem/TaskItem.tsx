import classNames from 'classnames/bind';
import React, { useState } from 'react';
import styles from './TaskItem.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

type Task = {
    title: string;
    dueDate: string;
    priority: string;
    checked: boolean;
};

type TaskItemProps = {
    task: Task;
    onDelete: () => void;
    onUpdate: (updatedTask: Task) => void;
    onCheck: (isChecked: boolean) => void;
};

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onUpdate, onCheck }) => {
    const [showDetails, setShowDetails] = useState(false);
    const [editedTask, setEditedTask] = useState<Task>(task);

    const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedTask((prevTask) => ({
            ...prevTask,
            title: e.target.value,
        }));
    };

    const handleSaveTask = () => {
        setShowDetails(false);
        onUpdate(editedTask);
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onCheck(e.target.checked);
    };

    const handleToggleDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <div className={cx('task-wrapper')}>
            <div className={cx('task')}>
                <input
                    type='checkbox'
                    className={cx('task-checkbox')}
                    checked={task.checked}
                    onChange={handleCheckboxChange}
                />
                <span className={cx('task-title')}>{task.title}</span>

                <div className={cx('task-actions')}>
                    <Button size='small' color='green' onClick={handleToggleDetails}>
                        Detail
                    </Button>
                    <Button size='small' color='red' onClick={onDelete}>
                        Delete
                    </Button>
                </div>
            </div>
            {showDetails && (
                <div className={cx('task-details')}>
                    <input
                        type='text'
                        value={editedTask.title}
                        onChange={handleTaskChange}
                        className={cx('task-edit-input')}
                    />
                    <span className={cx('task-due-date')}>Due Date: {task.dueDate}</span>
                    <span className={cx('task-priority')}>Priority: {task.priority}</span>
                    <Button size='small' color='indigo' onClick={handleSaveTask}>
                        Update
                    </Button>
                </div>
            )}
        </div>
    );
};

export default TaskItem;
