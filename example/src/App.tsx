import * as React from 'react';

import { Alert, StyleSheet, View } from 'react-native';
import { UnsignedInputView } from '@tdduydev/react-native-unsigned-input';

export default function App() {
  Alert.alert("onload")
  return (
    <View style={styles.container}>
      <UnsignedInputView
              onChangeText={(text:any)=> {
             console.log(text)
              }}
      style={styles.box} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: "80%",
    height: 60,
    marginVertical: 20,
    backgroundColor:"red"
  },
});
