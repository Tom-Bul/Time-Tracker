import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';

interface Props {
  handleChange: (text: string) => void;
  input: string;
}

const TaskInput: React.FC<Props> = ({handleChange, input}) => {
  const onInputChange = (text: string): void => {
    handleChange(text);
  };

  return (
    <View style={styles.textContainer}>
      <TextInput
        placeholder="What are you doing?"
        maxLength={16}
        value={input}
        onChangeText={text => onInputChange(text)}
        placeholderTextColor={'black'}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});
export default TaskInput;
