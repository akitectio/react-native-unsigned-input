import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import InputBlurUnsigned from '@tdduydev/react-native-unsigned-input';

export default function App() {
  const [text, setText] = React.useState('');
  const inputRef = React.useRef();

  const onChangeText = (event: any) => {
    const newText = event.nativeEvent.text;
    setText(newText);
    console.log(newText);
  };

  return (
    <View style={styles.container}>
      <InputBlurUnsigned
        ref={inputRef}
        onChangeText={onChangeText}
        value={text}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
