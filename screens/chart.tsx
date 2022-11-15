/*eslint-disable*/

import React from 'react';
import {Button, Text, View, StyleSheet} from 'react-native';
import {useNavigation, useRoute} from "@react-navigation/native";

const ChartScreen = () => {
    const navigation = useNavigation();
    const route = useRoute<any>();
    const {string, grammar} = route.params
    console.log(string)
    return (
        <View style={styles.container}>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default ChartScreen;
