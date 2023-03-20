import {
  requireNativeComponent,
  UIManager,
  Platform,
  ViewStyle,
} from 'react-native';


const LINKING_ERROR =
  `The package '@tdduydev/react-native-unsigned-input' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

type UnsignedInputProps = {
  value?: string,
  placeholder?: string,
  autoCapitalize?: "none" | "sentences" | "words" | "characters",
  autoCorrect?: boolean,
  autoFocus?: boolean,
  blurOnSubmit?: boolean,
  caretHidden?: boolean,
  contextMenuHidden?: boolean,
  defaultValue?: string,
  editable?: boolean,
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad",
  maxLength?: number,
  multiline?: boolean,
  onChangeText?: (text: string) => void,
  onChange?: (text: string) => void,
  passwordRules?: string,
  placeholderTextColor?: string,
  returnKeyType?: "done" | "go" | "next" | "search" | "send",
  secureTextEntry?: boolean,
  style?: ViewStyle,
  testID?: string,
  ref?: any,
};


const ComponentName = 'UnsignedInputView';

export const UnsignedInputView =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<UnsignedInputProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };


