import classNames from 'classnames/bind';
import { ChangeEvent, FunctionComponent, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import { useAppDispatch } from '~/redux/hooks';
import { addTask } from '../TaskList/taskListSlice';

import { Button, DateField, SelectField, TextField, Textarea } from '~/components';
import { getCurrentDate } from '~/utils/dateUtils';
import styles from './TaskCreationForm.module.scss';

const cx = classNames.bind(styles);

const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'normal', label: 'Normal' },
    { value: 'high', label: 'High' },
];

const TaskCreationForm: FunctionComponent = () => {
    /**
     * Responsive using hooks
     */
    // Desktops (min-width : 1024px)
    const isDesktop = useMediaQuery({ minWidth: '64em' });
    // Tablets (min-width : 740px and max-width : 1023px)
    const isTablet = useMediaQuery({ minWidth: '46.25em', maxWidth: '63.9375em' });
    // Mobiles (max-width : 739px)
    const isMobile = useMediaQuery({ maxWidth: '46.1875em' });

    const dispatch = useAppDispatch();

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
