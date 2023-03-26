import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Button,
  TouchableOpacity,
} from 'react-native';
import InputBlurUnsigned from '@tdduydev/react-native-unsigned-input';
import Icon from 'react-native-vector-icons/FontAwesome';

let ICON_SIZE = 20;
const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);

  const handleUsernameChange = (event: any) => {
    const value = event.nativeEvent.text;
    console.log('handlePasswordChange', value);
    setUsername(value);
  };

  const handlePasswordChange = (event: any) => {
    const value = event.nativeEvent.text;
    console.log('handlePasswordChange', value);
    setUsername(value);
  };

  const handleLogin = () => {
    // TODO: handle login logic
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./background.png')}
        style={styles.backgroundImage}
      >
        <View style={styles.loginForm}>
          <InputBlurUnsigned
            placeholder="Username"
            value={username}
            onChangeText={handleUsernameChange}
            style={styles.input}
            leftIcon={
              <View style={styles.iconLeft}>
                <Icon name="user" size={ICON_SIZE} color="blue" />
              </View>
            }
          />
        </View>
        <View style={styles.loginForm}>
          <InputBlurUnsigned
            placeholder="Password"
            value={password}
            onChangeText={handlePasswordChange}
            secureTextEntry={true}
            style={styles.input}
            spellCheck={true}
            leftIcon={
              <View style={styles.iconLeft}>
                <Icon name="key" size={ICON_SIZE} color="#900" />
              </View>
            }
            onFocus={() => {}}
            onEndEditing={() => {}}
            rightIcon={
              <View style={styles.iconRight}>
                <TouchableOpacity
                  onPress={() => setSecure(!secure)}
                  style={[styles.iconTail]}
                >
                  {secure ? (
                    <Icon name="eye-slash" size={ICON_SIZE} color="gray" />
                  ) : (
                    <Icon name="eye" size={ICON_SIZE} color="#900" />
                  )}
                </TouchableOpacity>
              </View>
            }
          />
          <Button title="Login" onPress={handleLogin} />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  loginForm: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 10,
    margin: 20,
  },
  input: {
    marginBottom: 10,
    marginTop: 10,
    borderColor: 'black',
  },
  iconTail: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconLeft: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  iconRight: {
    flexDirection: 'row',
    marginRight: 10,
  },
});

export default LoginScreen;
