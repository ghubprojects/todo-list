import classNames from 'classnames/bind';
import { ChangeEvent, FunctionComponent, useState } from 'react';

import { Button, DateField, SelectField, TextField, Textarea } from '~/components';
import { getCurrentDate } from '~/utils/dateUtils';
import styles from './TaskItem.module.scss';

const cx = classNames.bind(styles);

interface TaskItemProps {
    task: Task;
    isExpanded: boolean;
    onDelete: () => void;
    onUpdate: (updatedTask: Task) => void;
    onCheck: (isChecked: boolean) => void;
    onExpand: (isExpanded: boolean) => void;
}

const TaskItem: FunctionComponent<TaskItemProps> = ({
    task,
    isExpanded,
    onDelete,
    onUpdate,
    onCheck,
    onExpand,
}) => {
    const priorityOptions = [
        { value: 'low', label: 'Low' },
        { value: 'normal', label: 'Normal' },
        { value: 'high', label: 'High' },
    ];

    const [editedTask, setEditedTask] = useState<Task>(task);
    const handleChangeTask =
        (field: string) =>
        (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
            setEditedTask((prevTask) => ({
                ...prevTask,
                [field]: e.target.value,
            }));
        };

    const handleSaveTask = () => {
        onExpand(false);
        onUpdate(editedTask);
    };

    const handleToggleExpand = () => {
        onExpand(isExpanded);
        setEditedTask(task);
    };

    return (
        <div className={cx('task-wrapper')}>
            <div className={cx('task')}>
                <div className={cx('task-info')}>
                    <input
                        type='checkbox'
                        className={cx('task-checkbox')}
                        checked={task.checked}
                        onChange={(e) => onCheck(e.target.checked)}
                    />
                    <span className={cx('task-title')}>{task.title}</span>
                </div>
                <div className={cx('task-actions')}>
                    <Button size='small' color='green' onClick={handleToggleExpand}>
                        Detail
                    </Button>
                    <Button size='small' color='red' onClick={onDelete}>
                        Delete
                    </Button>
                </div>
            </div>
            {isExpanded && (
                <div className={cx('task-details')}>
                    <header className={cx('task-details-title')}>Details</header>

                    <div className={cx('form-row')}>
                        <TextField
                            label='Title'
                            value={editedTask.title}
                            onChange={handleChangeTask('title')}
                            required
                        />
                    </div>

                    <div className={cx('form-row')}>
                        <Textarea
                            label='Description'
                            value={editedTask.description}
                            className={cx('description-textarea')}
                            onChange={handleChangeTask('description')}
                        />
                    </div>

                    <div className={cx('form-row')}>
                        <DateField
                            label='Due Date'
                            value={editedTask.dueDate}
                            min={getCurrentDate()}
                            className={cx('due-date-field')}
                            onChange={handleChangeTask('dueDate')}
                        />

                        <SelectField
                            label='Priority'
                            options={priorityOptions}
                            value={editedTask.priority}
                            className={cx('priority-field')}
                            onChange={handleChangeTask('priority')}
                        />
                    </div>

                    <div className={cx('update-task-action')}>
                        <Button
                            size='medium'
                            color='indigo'
                            className={cx('update-task-btn')}
                            onClick={handleSaveTask}
                        >
                            Update
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskItem;
