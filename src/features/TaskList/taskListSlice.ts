import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '~/redux/store';

interface TaskListState {
    tasks: Task[];
}

const initialState: TaskListState = {
    tasks: [],
};

const taskListSlice = createSlice({
    name: 'taskList',
    initialState,
    reducers: {
        reloadTaskList: (state) => {
            const data = localStorage.getItem('tasks');
            state.tasks = data ? JSON.parse(data) : [];
        },
        addTask: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload);
            sortAndStoreLocal(state.tasks);
        },
        checkTask: (state, action: PayloadAction<{ index: number; isChecked: boolean }>) => {
            const { index, isChecked } = action.payload;
            state.tasks[index].checked = isChecked;
        },
        removeTask: (state, action: PayloadAction<number>) => {
            const removeIndex = action.payload;
            state.tasks.splice(removeIndex, 1);
            sortAndStoreLocal(state.tasks);
        },
        removeMultipleTasks: (state) => {
            state.tasks = state.tasks.filter((task) => !task.checked);
            sortAndStoreLocal(state.tasks);
        },
        updateTask: (state, action: PayloadAction<{ index: number; updatedTask: Task }>) => {
            const { index, updatedTask } = action.payload;
            state.tasks[index] = updatedTask;
            sortAndStoreLocal(state.tasks);
        },
    },
});

export const { reloadTaskList, addTask, removeTask, updateTask, checkTask, removeMultipleTasks } =
    taskListSlice.actions;

export const selectTaskList = (state: RootState) => state.taskList.tasks;

export default taskListSlice.reducer;

// Utility function to sort tasks by dueDate
const sortAndStoreLocal = (tasks: Task[]) => {
    tasks.sort((a, b) => a.dueDate.localeCompare(b.dueDate));
    localStorage.setItem('tasks', JSON.stringify(tasks));
};
