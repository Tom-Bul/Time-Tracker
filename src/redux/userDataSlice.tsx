import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {State, Task} from '../utilities/types';
import {RootState} from './store';

const initialState: State = {
  tasks: [],
};

export const userDataSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setInit: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      if (!state.tasks.some(task => task.title === action.payload.title))
        state.tasks = [action.payload, ...state.tasks];
    },
    updateTimer: state => {
      state.tasks = state.tasks.map(task => {
        if (task.active === true) {
          task.time = task.time + 1;
        }
        return task;
      });
    },
    findAndClearActiveTask: state => {
      state.tasks = state.tasks.map(task => {
        if (task.active === true) {
          task.endDate = Date.now();
          task.active = false;
        }
        return task;
      });
    },
    findAndSetActiveTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.map(task => {
        if (task.title === action.payload) {
          task.active = true;
        }
        return task;
      });
    },
  },
});

export const {
  setInit,
  addTask,
  findAndClearActiveTask,
  findAndSetActiveTask,
  updateTimer,
} = userDataSlice.actions;

const getUserData = (state: RootState) => state;

const getActiveTask = (state: RootState) => {
  return state?.userData?.tasks.find(task => task.active);
};

export {getUserData, getActiveTask};

export default userDataSlice.reducer;
