import { ChangeEvent, FunctionComponent, memo, useState } from 'react';
import { Button, DateField, SelectField, TextField, Textarea } from '~/components';
import { getCurrentDate } from '~/utils/dateUtils';
import { priorityOptions } from '~/utils/selectOptions';

import classNames from 'classnames/bind';
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

const TaskItem: FunctionComponent<TaskItemProps> = memo(
    ({ task, isExpanded, onDelete, onUpdate, onCheck, onExpand }) => {
        const [editedTask, setEditedTask] = useState<Task>(task);

        /**
         * Handling the change event for the input, select, and textarea fields
         * and updating the edited task state based on the field being changed
         */
        const handleChangeTask =
            (field: string) =>
            (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
                setEditedTask((prevTask) => ({
                    ...prevTask,
                    [field]: e.target.value,
                }));
            };

        // Collapsing the task details and updating the task with the edited task data
        const handleSaveTask = () => {
            onExpand(false);
            onUpdate(editedTask);
        };

        // Toggling the task details and set the edited task state with the task data
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
                        <Button
                            size='small'
                            color='green'
                            className={cx('detail-btn')}
                            onClick={handleToggleExpand}
                        >
                            Detail
                        </Button>
                        <Button size='small' color='red' className={cx('remove-btn')} onClick={onDelete}>
                            Remove
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
    },
);

export default TaskItem;
