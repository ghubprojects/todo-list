import { ChangeEvent, FunctionComponent, useState } from 'react';
import { useAppDispatch } from '~/redux/hooks';
import { addTask } from '../TaskList/taskListSlice';

import { Button, DateField, SelectField, TextField, Textarea } from '~/components';
import { getCurrentDate } from '~/utils/dateUtils';
import { priorityOptions } from '~/utils/selectOptions';

import classNames from 'classnames/bind';
import styles from './TaskCreationForm.module.scss';

const cx = classNames.bind(styles);

const TaskCreationForm: FunctionComponent = () => {
    const dispatch = useAppDispatch();

    // Initializing the task object with default values
    const taskInit = {
        title: '',
        description: '',
        dueDate: getCurrentDate(),
        priority: 'normal',
        checked: false,
    };

    const [task, setTask] = useState<Task>(taskInit);

    /**
     * Handling the change event for the input, select, and textarea fields
     * and updating the task state based on the field being edited
     */
    const handleChangeField =
        (field: keyof Task) =>
        (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
            setTask((prevTask) => ({
                ...prevTask,
                [field]: e.target.value,
            }));
        };

    /**
     * Handling the add task action:
     * Checking if the task title is not empty and the due date is valid,
     * dispatching the addTask action with the new task object
     * and resetting the task state to its initial values
     */
    const handleAddTask = () => {
        const { title, dueDate } = task;
        if (title.trim() && dueDate >= getCurrentDate()) {
            const newTask: Task = { ...task };
            dispatch(addTask(newTask));
            setTask(taskInit);
        }
    };

    return (
        <div className={cx('task-creation-form')}>
            <header className={cx('title')}>New Task</header>

            <div className={cx('task-form')}>
                <div className={cx('form-row')}>
                    <TextField
                        label='Title'
                        value={task.title}
                        placeholder='Add new task ...'
                        required
                        onChange={handleChangeField('title')}
                    />
                </div>

                <div className={cx('form-row')}>
                    <Textarea
                        label='Description'
                        value={task.description}
                        className={cx('description-textarea')}
                        onChange={handleChangeField('description')}
                    />
                </div>

                <div className={cx('form-row')}>
                    <DateField
                        label='Due Date'
                        value={task.dueDate}
                        min={getCurrentDate()}
                        onChange={handleChangeField('dueDate')}
                        className={cx('due-date-field')}
                    />

                    <SelectField
                        label='Priority'
                        options={priorityOptions}
                        value={task.priority}
                        onChange={handleChangeField('priority')}
                        className={cx('priority-field')}
                    />
                </div>
            </div>
            <Button onClick={handleAddTask} className={cx('add-task-btn')}>
                Add
            </Button>
        </div>
    );
};

export default TaskCreationForm;
