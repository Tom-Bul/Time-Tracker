import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Overlay} from 'react-native-elements';

import {
  findAndClearActiveTask,
  findAndSetActiveTask,
} from '../redux/userDataSlice';
import {convertToDate, convertToTime} from '../utilities/helpers';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {Task} from '../utilities/types';
import TaskInfo from './TaskInfo';
import Timer from './Timer';
import TimerButton from './TimerButton';

const TaskContainer: React.FC<Task> = ({
  title,
  time,
  active,
  startDate,
  endDate,
}) => {
  const {tasks} = useAppSelector(state => state.userData);
  const dispatch = useAppDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleButtonClick = (): void => {
    if (!tasks) return;
    dispatch(findAndClearActiveTask());
    if (!active) {
      dispatch(findAndSetActiveTask(title));
    }
  };

  return (
    <TouchableOpacity
      style={[styles.mainContainer, styles.taskContainer]}
      onPress={() => setIsModalVisible(true)}>
      <View style={[styles.taskContainer, styles.infoContainer]}>
        <TaskInfo title={title} />
      </View>
      <View style={[styles.taskContainer, styles.timerContainer]}>
        <Timer time={time} />
        <TimerButton
          isActive={active}
          handleClick={() => handleButtonClick()}
        />
      </View>
      <Overlay
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}>
        <Text>Name: {title}</Text>
        <Text>Time: {convertToTime(time)}</Text>
        <Text>Start date: {convertToDate(startDate)}</Text>
        <Text>End date: {convertToDate(endDate)}</Text>
      </Overlay>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    elevation: 4,
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: '#e8e7e3',
  },
  taskContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  infoContainer: {
    flex: 3,
    justifyContent: 'flex-start',
    paddingLeft: 20,
  },
  timerContainer: {
    flex: 2,
    paddingHorizontal: 10,
    justifyContent: 'space-around',
  },
});

export default TaskContainer;
