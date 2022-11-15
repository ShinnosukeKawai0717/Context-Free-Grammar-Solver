/*eslint-disable*/
import React, {memo} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const GenerateButton = (props: { onPressFromParent: () => void}) => {

    const {
        onPressFromParent
    } = props

    return (
        <TouchableOpacity style={styles.button} onPress={onPressFromParent}>
            <Text style={{fontSize: 30, color: "turquoise"}}>Generate</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flex: 0.06,
        backgroundColor: "white",
        width: 200,
        height: 50,
        borderRadius: 20,
        marginBottom: 30,
        marginTop: 5,
        justifyContent: "center",
        alignItems: "center",
        shadowOpacity: 0.8,
        shadowColor: "gray",
        shadowOffset: {width: 5, height: 5}
    },
})

export default memo(GenerateButton);
