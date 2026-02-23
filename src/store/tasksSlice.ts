import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Task } from '../utils/types/types';
import supabase from '../utils/supabase';
import { convertListWithTaskToRecord } from '../utils/redux';

type TasksState = {
  tasks: Record<number, Task>;
  isLoading: boolean;
  error: string | null;
};

const initialState: TasksState = {
  tasks: {},
  isLoading: false,
  error: null,
};

export const getTasks = createAsyncThunk('tasks/getAll', async () => {
  const { data: tasks } = await supabase.from('task').select('*');
  return tasks;
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = convertListWithTaskToRecord(action.payload);
      })
      .addCase(getTasks.rejected, (state) => {
        state.error = 'Failed to fetch tasks';
        state.isLoading = false;
      });
  },
});

export default tasksSlice.reducer;
