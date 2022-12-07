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
            keyboardType={"web-search"}
            textAlign={"left"}
            multiline={true}>
        </TextInput>
    );
};

const styles = StyleSheet.create({
  input: {
      width: Dimensions.get("window").width - 20,
      paddingLeft: 20,
      borderRadius: 20,
      backgroundColor: "white",
      color: "black",
      shadowOffset: {width: 5, height: 5},
      shadowColor: "gray",
      shadowOpacity: 0.7,
      fontSize: 20,
      alignSelf: "center",
      marginTop: 5,
      paddingTop: 20,
      paddingBottom: 20
  }
});

export default memo(InputField);
