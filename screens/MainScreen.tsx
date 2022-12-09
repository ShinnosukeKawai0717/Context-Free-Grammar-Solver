/*eslint-disable*/

import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Dimensions, FlatList, ListRenderItemInfo, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import SentenceItem from "../components/sentenceItem";
import GenerateButton from "../components/button";
import {NavigationProp} from "@react-navigation/native";
import {CFGrammar, Utility} from "../models/grammarModels/grammar";
import {Sentence} from "../models/grammarModels/sentence";
import {StaticStorage} from "./ChartScreen";
import TextField from "../components/textField";

const grammars = [
    {
        grammar: [
            "S -> NP VP",
            "NP -> NP PP | N",
            "PP -> P NP",
            "VP -> V NP | VP PP",
            "P -> with",
            "V -> saw",
            "N -> astronomers | ears | stars | telescopes"
        ],
        type: "Ambiguous"
    },
    {
        grammar: [
            "S -> A S A | B S B | C S C | A | B | C",
            "A -> a",
            "B -> b",
            "C -> c"
        ],
        type: "Unambiguous"
    }
]
const MainScreen = (props: { navigation: NavigationProp<object> }) => {
    const {
        navigation
    } = props
    const [isTapped, setIsTapped] = useState(false);
    const [grammar, setGrammar] = useState<string[]>(
        ["S -> A S A | B S B | C S C | A | B | C", "A -> a", "B -> b", "C -> c"]
    )
    const [userInput, setUserInput] = useState<string>("")

    const memorizedGrammar = useMemo(() => {
        console.log("Emorized grammar")
        return new CFGrammar(grammar)
    }, [grammar])

    const itemDidTap = (sentence: Sentence) => {
        StaticStorage.data.clear()
        const randomKey = Utility.randomID(10)
        StaticStorage.data.set(randomKey, memorizedGrammar)
        // @ts-ignore
        navigation.navigate("Chart", {
            sentence: sentence,
            key: randomKey
        })
    }

    const renderSentenceList = (data: ListRenderItemInfo<Sentence>) => {
        return <SentenceItem itemDidTap={itemDidTap} sentence={data.item} index={data.index+1}/>
    }

    const memorizedFlatList = useMemo(() => {
        if (memorizedGrammar){
            return (
                <FlatList
                    style={styles.list}
                    data={memorizedGrammar.sentences}
                    renderItem={renderSentenceList}/>
            )
        }
        return null
    }, [isTapped, memorizedGrammar.id])

    const memorizedOnPress = useCallback(() => {
        /*
        S -> NP VP | VP
        NP -> Det Nominal
        Nominal -> Noun
        VP -> Verb | Verb NP
        Det -> that | this | a | the
        Noun -> book | flight | meal | money
        Verb -> book | include | prefer
         */
        if (memorizedGrammar != null) setIsTapped(prevState => !prevState)
    }, [])

    const memorizedOnGrammarPicked = useCallback((grammar: string[]) => {
        setGrammar(grammar)
        setUserInput(grammar.join("\n"))
    }, []);

    const memorizedOnTextChange = useCallback((text: string) => {
        setUserInput(text)
    }, []);

    const grammarList = useMemo(() => {
        return (
            <View style={styles.grammars}>
                {
                    grammars.map((value, index) => {
                        return (
                            <TouchableOpacity onPress={()=>memorizedOnGrammarPicked(value.grammar)} key={index} style={styles.grammar}>
                                <Text style={{fontSize: 30, textAlign: "center"}}>{value.type+" Grammar"}</Text>
                            </TouchableOpacity >
                        )
                    })
                }
            </View>
        )
    }, []);
    return (
        <View style={styles.mainContainer}>
            <View style={styles.textField}>
                <TextField userInput={userInput} myOnTextChange={memorizedOnTextChange}></TextField>
            </View>
            {grammarList}
            {memorizedFlatList}
            <GenerateButton onPressFromParent={memorizedOnPress}/>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#dfe6e9",
        alignItems: "center",
        flexDirection: "column",
    },
    textField: {
        flex: 0.5,
    },
    grammars: {
        flex: 0.3,
        width: Dimensions.get("screen").width-100,
        alignItems: "center",
        justifyContent: "center"
    },
    grammar: {
        marginBottom: 10,
        width: Dimensions.get("screen").width-100,
    },
    list: {
        flex: 0.2,
        width: Dimensions.get("window").width,
        alignSelf: "center"
    },
});

export default MainScreen;
