import React, {
  useRef,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from 'react';
import {
  StyleSheet,
  View,
  Platform,
  NativeModules,
  TextInput,
  findNodeHandle,
} from 'react-native';

const LINKING_ERROR =
  `The package '"@tdduydev/react-native-unsigned-input' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const ReactNativeUnsignedInput = NativeModules.ReactNativeUnsignedInput
  ? NativeModules.ReactNativeUnsignedInput
  : new Proxy(
    {},
    {
      get() {
        throw new Error(LINKING_ERROR);
      },
    }
  );

/**
 * Apply mask to TextInput
 *
 * @param reactNode {number}
 * @param options {MaskOptions}
 */
export function applyMask(reactNode) {
  ReactNativeUnsignedInput.applyMask(reactNode);
}

const InputBlurUnsigned = forwardRef(
  (
    {
      secureTextEntry,
      style,
      multiline,
      rightIcon,
      leftIcon,
      rightIconContainerStyle,
      leftIconContainerStyle,
      value,
      defaultValue,
      onChangeText,
      placeholder,
      placeholderTextColor,
      onGetValue,
      onFocus,
      onBlur,
      ...rest
    },
    ref
  ) => {
    const inputRef = useRef(null);

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current.focus();
      },
    }));

    useEffect(() => {
      const reactNode = findNodeHandle(inputRef.current);
      if (!reactNode) {
        return;
      }
      applyMask(reactNode);
    }, []);

    return (
      <View style={styles.viewInput}>
        {leftIcon && (
          <View
            style={StyleSheet.flatten([
              styles.iconContainer,
              leftIconContainerStyle,
            ])}
          >
            {leftIcon}
          </View>
        )}
        <TextInput
          {...rest}
          ref={inputRef}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          secureTextEntry={secureTextEntry}
          style={[
            styles.input,
            !multiline && {
              height: 46,
            },
            style && style,
          ]}
          value={value}
          onChangeText={onChangeText}
          onChange={onChangeText}
          onBlur={onBlur}
          onFocus={onFocus}
        />
        {rightIcon && (
          <View
            style={StyleSheet.flatten([
              styles.iconContainer,
              rightIconContainerStyle,
            ])}
          >
            {rightIcon}
          </View>
        )}
      </View>
    );
  }
);

export default InputBlurUnsigned;

const styles = StyleSheet.create({
  BlurView: {
    position: 'absolute',
    zIndex: 2,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: 45,
    opacity: 0.9,
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
  viewInput: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: 'rgb(230, 230, 230)',
    height: 45,
  },
  input: {
    flex: 1,
    // paddingHorizontal: padding.large,
    // paddingRight: padding.large,
    // paddingLeft: padding.large,
    position: 'relative',
    // color: "#ffffff",
    zIndex: 3,
    fontSize: 20,
    // backgroundColor: "red"
  },
  viewIcon: {
    marginRight: 16,
  },
  iconContainer: {
    zIndex: 99,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
  },
});
