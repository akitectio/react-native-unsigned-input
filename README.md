# react-native-unsigned-input


In the `shouldChangeCharactersInRange` method of the `UITextFieldDelegate` protocol, we can normalize the input string by removing Vietnamese diacritical marks and trimming whitespace characters. Then, we replace the input string with the normalized string. This will effectively prevent accented characters from being entered into the text field.

Here is the code for the `shouldChangeCharactersInRange` method:

```objective-C
- (BOOL)textField:(UITextField *)textField shouldChangeCharactersInRange:(NSRange)range replacementString:(NSString *)string {
    // Normalize the input string by removing Vietnamese diacritical marks and trimming whitespace characters
    NSString *normalizedString = [[[string decomposedStringWithCanonicalMapping] stringByFoldingWithOptions:NSDiacriticInsensitiveSearch locale:[NSLocale currentLocale]] stringByTrimmingCharactersInSet:[NSCharacterSet whitespaceCharacterSet]];
    // Replace the input string with the normalized string
    textField.text = [textField.text stringByReplacingCharactersInRange:range withString:normalizedString];
    return NO;
}

```

By doing this, the text field will only accept input without diacritical marks or whitespace characters, effectively preventing input of accented characters.

## Installation

```sh
npm install react-native-unsigned-input --save
```

## Usage

```js
import React, { forwardRef,useEffect } from 'react';
import { requireNativeComponent, findNodeHandle, NativeModules, Text } from 'react-native';

const UnsignedInput = requireNativeComponent('UnsignedInputView');

const { UnsignedInputViewManager } = NativeModules;

const NativeInput = forwardRef((props, ref) => {
  const inputRef = React.useRef(null);

  useEffect(() => {

    getValue ();
    return () => {

    }
  }, [])

  const getValue = async () => {
    if (!inputRef.current) {
      return Promise.reject('Input ref is not set');
    }

    const reactTag = findNodeHandle(inputRef.current);

    try {
      const text = await UnsignedInputViewManager.getValue(reactTag);
      console.log('text',text)
      return text;
    } catch (error) {
      return Promise.reject(error);
    }
  };


  const handleOnChangeText = (text) => {
    console.log("text",text)
    if (props.onChangeText) {
      props.onChangeText(text);
    }
  };

  return <>
  <UnsignedInput style={{
    backgroundColor:"red",
    height:200,
    width:200
   }} {...props}
   text={"3123132123"}
   ref={inputRef} onChangeText={handleOnChangeText} />
   <Text>{props.value}</Text>
  </>;
});

export default NativeInput;

```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

