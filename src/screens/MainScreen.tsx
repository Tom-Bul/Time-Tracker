import React from 'react';
import TasksList from '../components/TasksList';
import TimerHeader from '../components/TimerHeader';

const MainScreen = () => {
  return (
    <>
      <TimerHeader />
      <TasksList />
    </>
  );
};

export default MainScreen;
