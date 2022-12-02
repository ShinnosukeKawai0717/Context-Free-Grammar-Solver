/*eslint-disable*/

import React, {useEffect, useMemo, useState} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, Text, View} from 'react-native';
import {EarleyParser} from "../models/grammarModels/parser";
import StateItem from "../components/stateItem";
import {NavigationProp, useFocusEffect} from "@react-navigation/native";
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

export class StaticStorage {
    static readonly data: Map<string, any> = new Map<string, any>()
}

const ChartScreen = (props: {route: any, navigation: NavigationProp<any>}) => {
    const {
        sentence,
        key
    } = props.route.params

    const [isLoading, setIsLoading] = useState<boolean>(true)

    const parser = useMemo(() => {
        let grammar = StaticStorage.data.get(key)
        return new EarleyParser(grammar, sentence);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            parser.parseSentence().then((derivationTrees) => {
                setIsLoading(false)

                console.log(derivationTrees.length)
            })
        }, 1000)

    }, []);

    const memoChartView = useMemo(() => {
        if (isLoading) {
            return (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator color={"#00ff00"} size={"large"}/>
                </View>
            )
        }
        return (
            parser.charts.map((chart) => {
                return (
                    <View key={chart.id}>
                        <Text style={styles.chartStyle}>{"Chart:\t\t"+chart.id}</Text>
                        <View>
                            {chart.states.map((state)=> {{
                                return (
                                    <StateItem key={state.id} state={state}></StateItem>
                                )
                            }
                            })}
                        </View>
                    </View>
                )
            })
        )
    }, [isLoading])

    return (
        <View style={styles.container}>
            <View style={styles.sentenceLabel}>
                <Text numberOfLines={0} style={styles.sentenceStyle}>{sentence.getSentence()}</Text>
            </View>
            <ScrollView style={styles.chartView}>
                {memoChartView}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    sentenceLabel: {
        flex: 0.1,
        justifyContent: "center"
    },
    chartView :{
        flex: 0.95,
        marginBottom: 20,
        marginHorizontal: 6
    },
    loaderContainer:{
        justifyContent: "center",
        alignItems: "center"
    },
    sentenceStyle: {
        fontSize: 20,
        textAlign: "center",
    },
    chartStyle: {
        textDecorationLine: "underline",
        textAlign: "center",
        fontSize: 20,
        marginTop: 10
    }
});

export default ChartScreen;
