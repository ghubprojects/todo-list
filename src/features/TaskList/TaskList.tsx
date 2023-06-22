import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import TaskItem from '../TaskItem/TaskItem';
import styles from './TaskList.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

const getCurrentDate = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    let month = String(today.getMonth() + 1);
    let day = String(today.getDate());

    if (month.length < 2) {
        month = '0' + month;
    }

    if (day.length < 2) {
        day = '0' + day;
    }

    return `${year}-${month}-${day}`;
};

type Task = {
    title: string;
    dueDate: string;
    priority: string;
    checked: boolean;
};

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTaskTitle, setNewTaskTitle] = useState<string>('');
    const [newTaskDueDate, setNewTaskDueDate] = useState<string>(getCurrentDate());
    const [newTaskPriority, setNewTaskPriority] = useState<string>('normal');
    const [searchText, setSearchText] = useState<string>('');

    useEffect(() => {
        // Sort tasks by due date in ascending order
        const sortedTasks = [...tasks].sort((a, b) => a.dueDate.localeCompare(b.dueDate));

        // Only update the state if the tasks are not already sorted
        if (!areTasksSorted(tasks, sortedTasks)) {
            setTasks(sortedTasks);
        }
    }, [tasks]);

    // Helper function to check if tasks are already sorted
    const areTasksSorted = (prevTasks: Task[], newTasks: Task[]): boolean => {
        for (let i = 0; i < prevTasks.length; i++) {
            if (prevTasks[i] !== newTasks[i]) {
                return false;
            }
        }
        return true;
    };

    const handleAddTask = () => {
        if (newTaskTitle.trim() && newTaskDueDate >= getCurrentDate()) {
            const newTask: Task = {
                title: newTaskTitle,
                dueDate: newTaskDueDate,
                priority: newTaskPriority,
                checked: false,
            };

            setTasks([...tasks, newTask]);
            setNewTaskTitle('');
            setNewTaskDueDate(getCurrentDate());
            setNewTaskPriority('normal');
        }
    };

    const handleDeleteTask = (index: number) => {
        setTasks((prevTasks) => prevTasks.filter((_, taskIndex) => taskIndex !== index));
    };

    const handleUpdateTask = (index: number, updatedTask: Task) => {
        setTasks((prevTasks) => {
            const updatedTasks = [...prevTasks];
            updatedTasks[index] = updatedTask;
            return updatedTasks;
        });
    };

    const handleCheckTask = (isChecked: boolean, index: number) => {
        setTasks((prevTasks) => {
            const updatedTasks = [...prevTasks];
            updatedTasks[index].checked = isChecked;
            return updatedTasks;
        });
    };

    const handleDeleteSelectedTasks = () => {
        setTasks((prevTasks) => prevTasks.filter((task) => !task.checked));
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    const filteredTasks = tasks.filter((task) =>
        task.title.toLowerCase().includes(searchText.toLowerCase()),
    );

    return (
        <div className={cx('task-list-container')}>
            <div className={cx('search-input')}>
                <input
                    type='text'
                    value={searchText}
                    onChange={handleSearch}
                    placeholder='Search by task title'
                    className={cx('search-input-field')}
                />
            </div>
            <div className={cx('task-list')}>
                {filteredTasks.map((task, index) => (
                    <TaskItem
                        key={index}
                        task={task}
                        onDelete={() => handleDeleteTask(index)}
                        onUpdate={(updatedTask) => handleUpdateTask(index, updatedTask)}
                        onCheck={(isChecked) => handleCheckTask(isChecked, index)}
                    />
                ))}
            </div>
            <div className={cx('task-form')}>
                <div className={cx('form-row')}>
                    <div className={cx('form-group')}>
                        <input
                            type='text'
                            value={newTaskTitle}
                            onChange={(e) => setNewTaskTitle(e.target.value)}
                            required
                            className={cx('form-input')}
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <input
                            type='date'
                            value={newTaskDueDate}
                            onChange={(e) => setNewTaskDueDate(e.target.value)}
                            min={getCurrentDate()}
                            className={cx('form-input')}
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <select
                            value={newTaskPriority}
                            onChange={(e) => setNewTaskPriority(e.target.value)}
                            className={cx('form-select')}
                        >
                            <option value='low'>Low</option>
                            <option value='normal'>Normal</option>
                            <option value='high'>High</option>
                        </select>
                    </div>
                    <div className={cx('form-group')}>
                        <Button onClick={handleAddTask}>Add Task</Button>
                    </div>
                </div>
            </div>
            {tasks.some((task) => task.checked) && (
                <div className={cx('form-group')}>
                    <Button color='green'>Done</Button>
                    <Button color='red' onClick={handleDeleteSelectedTasks}>
                        Remove All
                    </Button>
                </div>
            )}
        </div>
    );
};

export default TaskList;
