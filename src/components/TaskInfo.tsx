import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

interface Props {
  title?: string;
}

const TaskInfo: React.FC<Props> = ({title}) => {
  return (
    <View style={styles.textContainer}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  text: {
    color: 'black',
  },
});
export default TaskInfo;
