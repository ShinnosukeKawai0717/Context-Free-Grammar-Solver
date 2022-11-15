/*eslint-disable*/
import React, {memo} from 'react';

import {StyleSheet, Dimensions, TextInput} from 'react-native';

const InputField = (props: {myOnTextChange: (text: string) => void,
                            userInput: string}) => {
    const {
        myOnTextChange,
        userInput
    } = props

    return (
        <TextInput
            style={styles.input}
            onChangeText={myOnTextChange}
            defaultValue={""}
            value={userInput}
            cursorColor={"gray"}
            placeholder={"type here..."}
            keyboardType={"number-pad"}
            textAlign={"left"}>
        </TextInput>
    );
};

const styles = StyleSheet.create({
  input: {
      width: Dimensions.get("window").width - 20,
      height: 50,
      padding: 13,
      borderRadius: 20,
      backgroundColor: "white",
      color: "black",
      shadowOffset: {width: 5, height: 5},
      shadowColor: "gray",
      shadowOpacity: 0.7,
      fontSize: 20,
      alignSelf: "center",
      marginBottom: 5,
      marginTop: 5
  }
});

export default memo(InputField);
