import React from 'react';

interface Task {
    id: number;
    title: string;
    dueDate: string;
    priority: string;
}

interface TaskDetailViewProps {
    task: Task;
    onTaskRemove: (taskId: number) => void;
}

const TaskDetailView: React.FC<TaskDetailViewProps> = ({ task, onTaskRemove }) => {
    const handleRemoveClick = () => {
        onTaskRemove(task.id);
    };

    return (
        <div className='task-detail-view'>
            <h2>{task.title}</h2>
            <p>Due Date: {task.dueDate}</p>
            <p>Priority: {task.priority}</p>
            <button className='remove-button' onClick={handleRemoveClick}>
                Remove
            </button>
        </div>
    );
};

export default TaskDetailView;
