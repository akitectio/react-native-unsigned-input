# react-native-unsigned-input

react-native-unsigned-input is a React component that allows users to input data into a TextInput field with customizable options such as left and right icons. The following is the documentation for using this component.

## Demo

<img src="./iphone.gif" height="40%"/>

## Installation

Make sure to install the `@tdduydev/react-native-unsigned-input` package and link it with your project.

```sh
npm install react-native-unsigned-input --save
```

## Usage

```jsx
import InputBlurUnsigned from '@tdduydev/react-native-unsigned-input';

// In your JSX
<InputBlurUnsigned
  placeholder="Enter text"
  leftIcon={<YourLeftIcon />}
  rightIcon={<YourRightIcon />}
  onChangeText={(text) => console.log(text)}
/>;
```

## Props

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
      <td>secureTextEntry</td>
      <td>Boolean</td>
      <td>If set to true, the text entered will be obscured, typically used for password fields.</td>
    </tr>
    <tr>
      <td>style</td>
      <td>Object</td>
      <td>Additional styles to be applied to the TextInput component.</td>
    </tr>
    <tr>
      <td>multiline</td>
      <td>Boolean</td>
      <td>If set to true, the TextInput will allow multiple lines of text.</td>
    </tr>
    <tr>
      <td>rightIcon</td>
      <td>ReactElement</td>
      <td>A React element to be displayed as the right icon within the TextInput field.</td>
    </tr>
    <tr>
      <td>leftIcon</td>
      <td>ReactElement</td>
      <td>A React element to be displayed as the left icon within the TextInput field.</td>
    </tr>
    <tr>
      <td>rightIconContainerStyle</td>
      <td>Object</td>
      <td>Additional styles to be applied to the right icon container.</td>
    </tr>
    <tr>
      <td>leftIconContainerStyle</td>
      <td>Object</td>
      <td>Additional styles to be applied to the left icon container.</td>
    </tr>
    <tr>
      <td>value</td>
      <td>String</td>
      <td>The value of the TextInput field.</td>
    </tr>
    <tr>
      <td>defaultValue</td>
      <td>String</td>
      <td>The initial value of the TextInput field.</td>
    </tr>
    <tr>
      <td>onChangeText</td>
      <td>Function</td>
      <td>A function to be called when the text changes in the TextInput field.</td>
    </tr>
    <tr>
      <td>placeholder</td>
      <td>String</td>
      <td>A placeholder string to be displayed when the TextInput field is empty.</td>
    </tr>
    <tr>
      <td>placeholderTextColor</td>
      <td>String</td>
      <td>The color of the placeholder text.</td>
    </tr>
    <tr>
      <td>onGetValue</td>
      <td>Function</td>
      <td>A function to be called when the value of the TextInput field is retrieved.</td>
    </tr>
    <tr>
      <td>onFocus</td>
      <td>Function</td>
      <td>A function to be called when the TextInput field receives focus.</td>
    </tr>
    <tr>
      <td>onBlur</td>
      <td>Function</td>
      <td>A function to be called when the TextInput field loses focus.</td>
    </tr>
    <tr>
      <td>...rest</td>
      <td>Any</td>
      <td>Additional props to be passed down to the TextInput component.</td>
    </tr>
  </tbody>
</table>

#Styling

The component has built-in styling for the TextInput and its container. To customize the styling, use the `style`, `rightIconContainerStyle`, and `leftIconContainerStyle` props as needed.

## Methods

`focus`: This method can be called to focus the TextInput field programmatically. To use it, create a ref for the component and call the `focus` method on the ref:

```jsx
const inputRef = useRef();

// Somewhere in your code
inputRef.current.focus();

// In your JSX
<InputBlurUnsigned ref={inputRef} ... />

```

Regenerate response

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---
