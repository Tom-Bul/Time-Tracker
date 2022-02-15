import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {FlatList, ListRenderItem, Text, View} from 'react-native';

import {setInit, updateTimer} from '../redux/userDataSlice';
import {Task} from '../utilities/types';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import TaskContainer from './TaskContainer';

const TasksList = () => {
  const {tasks} = useAppSelector(state => state.userData);
  const dispatch = useAppDispatch();
  const [userData, setUserData] = useState<Task[] | undefined>();

  useEffect(() => {
    (async () => {
      const storedTasks = await AsyncStorage.getItem('tasks');
      storedTasks && dispatch(setInit(JSON.parse(storedTasks)));
    })();
  }, []);

  useEffect(() => {
    setInterval(() => {
      dispatch(updateTimer());
    }, 1000);
  }, []);

  useEffect(() => {
    if (tasks) setUserData(tasks);
  }, [tasks]);

  const renderTask: ListRenderItem<Task> = ({item}) => (
    <TaskContainer
      title={item.title}
      time={item.time}
      active={item.active}
      startDate={item.startDate}
      endDate={item.endDate}
    />
  );

  return userData && Object.keys(userData).length !== 0 ? (
    <FlatList data={userData} renderItem={renderTask} />
  ) : (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>List is empty</Text>
    </View>
  );
};

export default TasksList;
