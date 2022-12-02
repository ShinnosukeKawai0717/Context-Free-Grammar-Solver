/*eslint-disable*/

import React from 'react';

import {Text, View, StyleSheet} from 'react-native';
import {State} from "../models/grammarModels/state";

const StateItem = (props: {state: State}) => {
    const {
        state
    } = props
    return (
        <View style={styles.container}>
            <Text style={styles.id}>{state.id}</Text>
            <Text style={styles.lhs}>{state.lhs}</Text>
            <Text style={styles.arrow}>{"=>"}</Text>
            <Text style={styles.rhs}>{state.rhs.termsToString()}</Text>
            <Text style={styles.positions}>{state.position()}</Text>
            <Text style={styles.backPointer}>{state.backPointersInSting()}</Text>
            <Text style={styles.addedBy}>{state.addedBy}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 7,
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 9,
        alignItems: "center"
    },
    id: {
        flex: 0.6,
        textAlign: "center",
        justifyContent: "center",
        backgroundColor: "red"
    },
    lhs: {
        flex: 0.7,
        textAlign: "center"
    },
    arrow: {
        flex: 0.7,
        textAlign: "center",
    },
    rhs: {
        flex: 1.7,
        textAlign: "center"
    },
    positions: {
        flex: 1,
        textAlign: "center"
    },
    backPointer: {
        flex: 1,
        textAlign: "center",
    },
    addedBy: {
        flex: 1.2,
        textAlign: "left"
    }
});

export default StateItem;
