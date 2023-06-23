import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import taskListReducer from '~/features/TaskList/taskListSlice';

export const store = configureStore({
    reducer: {
        taskList: taskListReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
