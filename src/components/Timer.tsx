import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {convertToTime} from '../utilities/helpers';

interface Props {
  time: number;
}

const Timer: React.FC<Props> = ({time}) => {
  return (
    <View style={styles.textContainer}>
      <Text style={styles.text}>{convertToTime(time)}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'black',
  },
});
export default Timer;
