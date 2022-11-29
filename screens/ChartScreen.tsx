/*eslint-disable*/

import React from 'react';
import {Button, Text, View, StyleSheet} from 'react-native';

const ChartScreen = (props: {route: any}) => {
    const {
        sentence
    } = props.route.params

    return (
        <View style={styles.container}>
            <Text>{sentence}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default ChartScreen;
