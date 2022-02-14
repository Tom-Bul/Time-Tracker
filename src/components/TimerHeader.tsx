import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, AppState} from 'react-native';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {
  addTask,
  findAndClearActiveTask,
  getActiveTask,
  setInit,
} from '../redux/userDataSlice';
import {saveTask, setTaskTime} from '../utilities/helpers';
import {Task} from '../utilities/types';
import TaskInfo from './TaskInfo';
import TaskInput from './TaskInput';
import Timer from './Timer';
import TimerButton from './TimerButton';

const TimerHeader = () => {
  const state = useAppSelector(state => state);
  const dispatch = useAppDispatch();
  const [createdTask, setCreatedTask] = useState('');
  const [activeTask, setActiveTask] = useState<Task>({
    title: '',
    time: 0,
    active: false,
    startDate: 0,
    endDate: 0,
  });

  const appState = useRef(AppState.currentState);

  const onInactive = async (): Promise<void> => {
    await AsyncStorage.setItem('tasks', JSON.stringify(state.userData.tasks));
    const task = getActiveTask(state);
    if (task?.active) {
      saveTask(task);
    }
  };

  const onActive = async (): Promise<void> => {
    await setTaskTime();
    const storedTasks = await AsyncStorage.getItem('tasks');
    storedTasks && dispatch(setInit(JSON.parse(storedTasks)));
  };

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current === 'active' &&
        nextAppState.match(/inactive|background/)
      ) {
        onInactive();
      }

      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        onActive();
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [state]);

  useEffect(() => {
    (async () => {
      const task = getActiveTask(state);
      if (task?.active && task !== activeTask) {
        setActiveTask(task);
      } else if (!task?.active && activeTask.active) {
        const storedTasks = await AsyncStorage.getItem('tasks');
        if (storedTasks) {
          let newStoredTasks: Task[] = JSON.parse(storedTasks);
          const index = newStoredTasks.findIndex(
            obj => obj.title === activeTask.title,
          );
          newStoredTasks[index].time = activeTask.time;
          await AsyncStorage.setItem('tasks', JSON.stringify(newStoredTasks));
        }
        setActiveTask({
          title: '',
          time: 0,
          active: false,
          startDate: 0,
          endDate: 0,
        });
      }
    })();
  }, [state]);

  const handleButtonClick = (): void => {
    (async () => {
      dispatch(findAndClearActiveTask());
      setCreatedTask('');
      if (!activeTask?.active) {
        const newTask: Task = {
          title: createdTask,
          time: 0,
          active: true,
          startDate: Date.now(),
          endDate: Date.now(),
        };
        const newTaskNotActive: Task = {
          title: createdTask,
          time: 0,
          active: false,
          startDate: Date.now(),
          endDate: Date.now(),
        };
        const storedTasks = await AsyncStorage.getItem('tasks');
        let newStoredTasks = storedTasks ? JSON.parse(storedTasks) : [];
        newStoredTasks.push(newTaskNotActive);
        await AsyncStorage.setItem('tasks', JSON.stringify(newStoredTasks));
        dispatch(addTask(newTask));
      }
    })();
  };

  const handleInputChange = (text: string): void => {
    setCreatedTask(text);
  };

  return (
    <View style={[styles.headerContainer, styles.mainContainer]}>
      <View style={[styles.headerContainer, styles.infoContainer]}>
        {activeTask?.active ? (
          <TaskInfo title={activeTask?.title} />
        ) : (
          <TaskInput handleChange={handleInputChange} input={createdTask} />
        )}
      </View>
      <View style={[styles.headerContainer, styles.timerContainer]}>
        <Timer time={activeTask?.active ? activeTask?.time : 0} />
        <TimerButton
          isActive={activeTask?.active}
          handleClick={() => handleButtonClick()}
          disable={activeTask.title ? false : !createdTask.length}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    elevation: 4,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 5,
  },
  infoContainer: {
    flex: 2,
    justifyContent: 'flex-start',
    paddingLeft: 20,
  },
  timerContainer: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
});

export default TimerHeader;
