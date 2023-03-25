import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import InputBlurUnsigned from '@tdduydev/react-native-unsigned-input';

export default function App() {
  const [text, setText] = React.useState('');
  const inputRef = React.useRef();

  const getValue = () => {
    const text = inputRef.current?.value;
    console.log(`Current text: ${text}`);
  };

  const onChangeText = (newText: any) => {
    setText(newText);
    console.log(`New text: ${newText}`);
  };

  return (
    <View style={styles.container}>
      <InputBlurUnsigned
        ref={inputRef}
        onChangeText={onChangeText}
        value={text}
      />
      <Button title="Get value" onPress={getValue} />
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
