import classNames from 'classnames/bind';
import { ChangeEvent, FunctionComponent, useState } from 'react';

import { useAppDispatch } from '~/redux/hooks';
import { addTask } from '../TaskList/taskListSlice';

import { Button, DateField, SelectField, TextField, Textarea } from '~/components';
import { getCurrentDate } from '~/utils/dateUtils';
import styles from './TaskCreationForm.module.scss';

const cx = classNames.bind(styles);

const TaskCreationForm: FunctionComponent = () => {
    const dispatch = useAppDispatch();

    const priorityOptions = [
        { value: 'low', label: 'Low' },
        { value: 'normal', label: 'Normal' },
        { value: 'high', label: 'High' },
    ];

    const taskInit = {
        title: '',
        description: '',
        dueDate: getCurrentDate(),
        priority: 'normal',
        checked: false,
    };

    const [task, setTask] = useState<Task>(taskInit);
    const handleChangeField =
        (field: string) =>
        (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
            setTask((prevTask) => ({
                ...prevTask,
                [field]: e.target.value,
            }));
        };

    const handleAddTask = () => {
        if (task.title.trim() && task.dueDate >= getCurrentDate()) {
            const newTask: Task = {
                title: task.title,
                description: task.description,
                dueDate: task.dueDate,
                priority: task.priority,
                checked: false,
            };
            dispatch(addTask(newTask));
            setTask(taskInit);
        }
    };

    return (
        <div className={cx('task-creation-form-container')}>
            <h1>New Task</h1>
            <div className={cx('task-form')}>
                <div className={cx('form-row')}>
                    <TextField
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
