/*eslint-disable*/

import React, {useEffect, useMemo, useState} from 'react';
import {ActivityIndicator, Dimensions, LogBox, ScrollView, StyleSheet, Text, View} from 'react-native';
import {EarleyParser} from "../models/grammarModels/parser";
import StateItem from "../components/stateItem";
import {NavigationProp} from "@react-navigation/native";
import {State} from "../models/grammarModels/state";

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
    const [trees, setTrees] = useState<State[][]>([])

    const parser = useMemo(() => {
        let grammar = StaticStorage.data.get(key)
        return new EarleyParser(grammar, sentence);
    }, [key]);

    useEffect(() => {
        const getTrees = async () => {
            return parser.parseSentence()
        }

        setTimeout(() => {
            getTrees().then(trees =>{
                setTrees(trees)
                setIsLoading(false)
            });
        }, 1000)

    }, [parser]);

    const memoChartView = useMemo(() => {
         return !isLoading ?
             <ScrollView style={styles.chartView}>
             {
                 parser.charts.map((chart) => {
                     return (
                         <View key={chart.id}>
                             <Text style={styles.textStyle}>{"Chart:\t"+chart.id}</Text>
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
             }
             </ScrollView> :
             <View style={styles.loaderContainer}>
                 <ActivityIndicator color={"#00ff00"} size={"large"}/>
             </View>
    }, [isLoading])

    const memoTreeView = useMemo(() => {
        return <ScrollView style={styles.treeView}>{
                trees.map((states, index) => {
                    return (
                        <View key={index}>
                            <Text style={styles.textStyle}>{"Tree:\t\t"+(index+1)}</Text>
                            <View>
                                {states.map((state)=> {{
                                    return (
                                        <StateItem key={state.id} state={state}></StateItem>
                                    )
                                }
                                })}
                            </View>
                        </View>
                    )
                })
        }
        </ScrollView>
    }, [trees]);

    return (
        <ScrollView horizontal={true}>
            <View style={styles.chartContainer}>
                <View style={styles.sentenceLabel}>
                    <Text numberOfLines={0} style={styles.sentenceStyle}>{sentence.toString()}</Text>
                </View>
                {memoChartView}
            </View>
            <View style={styles.treeContainer}>
                <View style={styles.treeLabel}>
                    <Text style={{fontSize: 20, textAlign: "center"}}>
                        {"Derivation Tree for"}
                    </Text>
                    <Text style={{fontSize: 20, textAlign: "center", color: "#00ff00"}}>
                        {sentence.toString()}
                    </Text>
                </View>
                {memoTreeView}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    chartContainer: {
        flex: 1,
        width: Dimensions.get("window").width
    },
    treeContainer: {
        width: Dimensions.get("window").width,
        flex: 1,
    },
    sentenceLabel: {
        flex: 0.1,
        justifyContent: "center"
    },
    treeLabel: {
        flex: 0.2,
        justifyContent: "center"
    },
    chartView :{
        flex: 0.9,
        marginBottom: 20,
        marginHorizontal: 6
    },
    treeView: {
        flex: 0.8,
        marginBottom: 20,
        marginHorizontal: 6
    },
    loaderContainer:{
        flex: 0.9,
        justifyContent: "center",
    },
    sentenceStyle: {
        fontSize: 20,
        textAlign: "center",
    },
    textStyle: {
        textDecorationLine: "underline",
        textAlign: "center",
        fontSize: 25,
        marginTop: 10,
        color: "blue"
    }
});

export default ChartScreen;
