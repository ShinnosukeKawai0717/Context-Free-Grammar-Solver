/*eslint-disable*/

import React from 'react';

import {Text, View, StyleSheet} from 'react-native';
import {EarleyParser} from "../models/grammarModels/parser";
import StateItem from "./stateItem";

const ChartView = (props: {parser: EarleyParser}) => {
    const {
        parser
    } = props
    return (
        parser.charts.map((chart) => {
            return (
                <View>
                    <Text style={styles.textStyle}>{"Chart:\t\t"+chart.id}</Text>
                    <View>
                        {chart.states.map((state)=> {{
                            return (
                                <StateItem state={state}></StateItem>
                            )
                        }})}
                    </View>
                </View>
            )
        })
    );
};

const styles = StyleSheet.create({
    textStyle: {
        textDecorationLine: "underline",
        textAlign: "center",
        fontSize: 20,
        marginTop: 10
    }
});

export default ChartView;
