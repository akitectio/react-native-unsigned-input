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
