import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Task, TaskToggleCompleted } from '../utils/types/types';
import supabase from '../utils/supabase';
import { convertListWithTaskToRecord } from '../utils/redux';
import type { TCreateTask, TUpdateTask } from '../utils/types/forms';

type TasksState = {
  tasks: Record<number, Task>;
  numberOfPages: number;
  isLoading: boolean;
  error: string | null;
  isLoggedIn: boolean;
};

const initialState: TasksState = {
  tasks: {},
  numberOfPages: 1,
  isLoading: false,
  error: null,
  isLoggedIn: false,
};

export const getTasks = createAsyncThunk(
  'tasks/getAll',
  async (pageIndex: number) => {
    const startIndex = (pageIndex - 1) * 8;
    const endIndex = pageIndex * 8 - 1;
    const { data: tasks, count } = await supabase
      .from('task')
      .select('*', { count: 'exact' })
      .range(startIndex, endIndex)
      .order('id', { ascending: true });
    let numberOfPages = 1;
    if (count) {
      numberOfPages = Math.ceil(count / 8);
    }
    return {
      tasks,
      numberOfPages,
    };
  },
);

export const insertTask = createAsyncThunk(
  'tasks/insert',
  async (task: TCreateTask) => {
    const { data } = await supabase.from('task').insert(task).select();
    return data;
  },
);

export const updateIsTaskCompleted = createAsyncThunk(
  'tasks/updateIsCompleted',
  async (task: TaskToggleCompleted) => {
    const { data } = await supabase
      .from('task')
      .update({ isCompleted: task.isCompleted })
      .eq('id', task.id)
      .select();
    return data;
  },
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteById',
  async (id: number) => {
    const { data } = await supabase.from('task').delete().eq('id', id).select();
    return data;
  },
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async (task: TUpdateTask) => {
    const { data } = await supabase
      .from('task')
      .update(task)
      .eq('id', task.id)
      .select();
    return data;
  },
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = convertListWithTaskToRecord(action.payload.tasks);
        state.numberOfPages = action.payload.numberOfPages;
      })
      .addCase(getTasks.rejected, (state) => {
        state.error = 'Failed to fetch tasks';
        state.isLoading = false;
      })
      .addCase(insertTask.fulfilled, (state, action) => {
        if (action.payload) {
          const newTask = action.payload as Task[];
          state.tasks[newTask[0].id] = newTask[0];
        }
      })
      .addCase(updateIsTaskCompleted.fulfilled, (state, action) => {
        if (action.payload) {
          const newTask = action.payload as Task[];
          state.tasks[newTask[0].id] = newTask[0];
        }
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        if (action.payload) {
          const newTask = action.payload as Task[];
          state.tasks[newTask[0].id] = newTask[0];
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        if (action.payload) {
          const newTask = action.payload as Task[];
          delete state.tasks[newTask[0].id];
        }
      });
  },
});

export const { setIsLoggedIn } = tasksSlice.actions;
export default tasksSlice.reducer;
