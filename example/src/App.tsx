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
import LinearGradient from 'react-native-linear-gradient';

let ICON_SIZE = 20;
const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);

  const handleUsernameChange = (value: any) => {
    console.log('handlePasswordChange', value);
    setUsername(value);
  };

  const handlePasswordChange = (value: any) => {
    console.log('handlePasswordChange', value);
    setPassword(value);
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
            backgroundInput={
              <View style={styles.BlurView}>
                <LinearGradient
                  colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.4)']}
                  style={styles.LinearGradient}
                ></LinearGradient>
              </View>
            }
          />
        </View>
        <View style={styles.loginForm}>
          <InputBlurUnsigned
            placeholder="Password"
            value={password}
            onChangeText={handlePasswordChange}
            secureTextEntry={secure}
            style={styles.input}
            spellCheck={true}
            leftIcon={
              <View style={styles.iconLeft}>
                <Icon name="key" size={ICON_SIZE} color="#900" />
              </View>
            }
            backgroundInput={
              <View style={styles.BlurView}>
                <LinearGradient
                  colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.4)']}
                  style={styles.LinearGradient}
                ></LinearGradient>
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
    // backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
  LinearGradient: {
    zIndex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: 45,
    opacity: 0.6,
  },
  BlurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: 45,
    flex: 1,
    backgroundColor: 'white',
    zIndex: 1,
    opacity: 0.3,
  },
});

export default LoginScreen;
