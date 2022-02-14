import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import Colors from '../constants/colors';

interface Props {
  isActive: boolean;
  handleClick: () => void;
  size?: number;
  disable?: boolean;
}

const TimerButton: React.FC<Props> = ({
  isActive,
  handleClick,
  size = 55,
  disable = false,
}) => {
  return (
    <View style={styles.buttonContainer}>
      <Icon
        name={isActive ? 'stop-circle' : 'play-circle'}
        type="font-awesome"
        color={isActive ? Colors.red : disable ? 'gray' : Colors.green}
        size={size}
        onPress={() => {
          !disable && handleClick();
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default TimerButton;
