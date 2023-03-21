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


<h2>Props</h2>
<table>
  <thead>
    <tr>
      <th>Prop</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>autoCapitalize</td>
      <td>enum('none', 'sentences', 'words', 'characters')</td>
      <td>Controls auto-capitalization of text. See <a href="https://reactnative.dev/docs/textinput#autocapitalize">https://reactnative.dev/docs/textinput#autocapitalize</a> for more details.</td>
    </tr>
    <tr>
      <td>autoCorrect</td>
      <td>bool</td>
      <td>If false, disables auto-correct. Default is true.</td>
    </tr>
    <tr>
      <td>color</td>
      <td>string</td>
      <td>The color of the text input.</td>
    </tr>
    <tr>
      <td>editable</td>
      <td>bool</td>
      <td>If false, text input is disabled. Default is true.</td>
    </tr>
    <tr>
      <td>enablesReturnKeyAutomatically</td>
      <td>bool</td>
      <td>If true, disables return key when text input is empty. Default is false.</td>
    </tr>
    <tr>
      <td>keyboardAppearance</td>
      <td>enum('default', 'light', 'dark')</td>
      <td>Controls the appearance of the keyboard. See <a href="https://reactnative.dev/docs/textinput#keyboardappearance">https://reactnative.dev/docs/textinput#keyboardappearance</a> for more details.</td>
    </tr>
    <tr>
      <td>keyboardType</td>
      <td>enum('default', 'email-address', 'numeric', 'phone-pad', 'ascii-capable', 'numbers-and-punctuation', 'url', 'number-pad', 'name-phone-pad', 'decimal-pad', 'twitter', 'web-search', 'visible-password')</td>
      <td>Controls the keyboard type. See <a href="https://reactnative.dev/docs/textinput#keyboardtype">https://reactnative.dev/docs/textinput#keyboardtype</a> for more details.</td>
    </tr>
    <tr>
      <td>maxLength</td>
      <td>number</td>
      <td>Limits the maximum number of characters that can be entered.</td>
    </tr>
    <tr>
      <td>onBlur</td>
      <td>function</td>
      <td>Callback that is called when the text input loses focus.</td>
    </tr>
    <tr>
      <td>onChange</td>
      <td>function</td>
      <td>Callback that is called when the text input's text changes.</td>
    </tr>
    <tr>
      <td>onEndEditing</td>
      <td>function</td>
      <td>Callback that is called when editing is ended.</td>
    </tr>
    <tr>
      <td>onFocus</td>
      <td>function</td>
      <td>Callback that is called when the text input is focused.</td>
    </tr>
    <tr>
      <td>onSelectionChange</td>
      <td>function</td>
      <td>Callback that is

</tr>
</tbody>
</table>

Regenerate response


See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

