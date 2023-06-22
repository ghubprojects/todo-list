import { useState } from 'react';

interface Task {
    id: number;
    title: string;
    dueDate: string;
    priority: string;
}

interface TaskCreationFormProps {
    onTaskCreate: (task: Task) => void;
}

const TaskCreationForm: React.FC<TaskCreationFormProps> = ({ onTaskCreate }) => {
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState(new Date().toISOString().slice(0, 10));
    const [priority, setPriority] = useState('normal');

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newTask: Task = {
            title,
            dueDate,
            priority,
            id: Date.now(), // Generate a unique ID for the task
        };
        onTaskCreate(newTask);
        setTitle('');
        setDueDate(new Date().toISOString().slice(0, 10));
        setPriority('normal');
    };

    return (
        <form className='task-creation-form' onSubmit={handleFormSubmit}>
            <input
                type='text'
                placeholder='Task title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <input type='date' value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value='low'>Low</option>
                <option value='normal'>Normal</option>
                <option value='high'>High</option>
            </select>
            <button type='submit'>Create Task</button>
        </form>
    );
};

export default TaskCreationForm;
