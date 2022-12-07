/*eslint-disable*/
import React, {memo} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

const GenerateButton = (props: { onPressFromParent: () => void}) => {

    const {
        onPressFromParent
    } = props

    return (
        <TouchableOpacity style={styles.buttonContainer} onPress={onPressFromParent}>
            <Text style={{marginStart: 20, marginEnd: 20, fontSize: 30, color: "turquoise"}}>Generate</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 0.1,
        backgroundColor: "white",
        borderRadius: 20,
        marginBottom: 30,
        marginTop: 5,
        justifyContent: "center",
        alignItems: "center",
        shadowOpacity: 0.8,
        shadowColor: "gray",
        shadowOffset: {width: 5, height: 5},
    },
})

export default memo(GenerateButton);
