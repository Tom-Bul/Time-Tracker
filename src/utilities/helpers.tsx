import AsyncStorage from '@react-native-async-storage/async-storage';
import {Task} from './types';

export const convertToTime = (seconds: number): string => {
  const date = new Date(0);
  date.setSeconds(seconds);
  const timeFormat = date.toISOString().slice(11, -5);
  return timeFormat;
};

export const convertToDate = (seconds: number): string => {
  const date = new Date(seconds);
  return date.toString().slice(4, 24);
};

export const saveTask = async (task: Task): Promise<void> => {
  const newTask = {
    title: task.title,
    timeNow: Date.now(),
    time: task.time,
    startDate: task.startDate,
    endDate: task.endDate,
  };
  await AsyncStorage.setItem('task', JSON.stringify(newTask));
};

export const setTaskTime = async (): Promise<void> => {
  const storedTasks = await AsyncStorage.getItem('tasks');
  const savedTask = await AsyncStorage.getItem('task');
  if (savedTask && storedTasks) {
    const millis = Date.now() - JSON.parse(savedTask).timeNow;
    let newStoredTasks: Task[] = JSON.parse(storedTasks);
    const index = newStoredTasks.findIndex(
      obj => obj.title === JSON.parse(savedTask).title,
    );
    newStoredTasks[index] = {
      title: JSON.parse(savedTask).title,
      time: JSON.parse(savedTask).time + Math.floor(millis / 1000),
      active: true,
      startDate: JSON.parse(savedTask).startDate,
      endDate: JSON.parse(savedTask).endDate,
    };
    await AsyncStorage.removeItem('task');
    await AsyncStorage.setItem('tasks', JSON.stringify(newStoredTasks));
  }
};
