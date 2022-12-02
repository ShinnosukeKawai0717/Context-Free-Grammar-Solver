/*eslint-disable*/

import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Text, StyleSheet, View, Dimensions, FlatList, ListRenderItemInfo} from 'react-native';
import SentenceItem from "../components/sentenceItem";
import InputField from "../components/textField";
import GenerateButton from "../components/button";
import {
    NavigationProp
} from "@react-navigation/native";
import {CFGrammar, Grammar} from "../models/grammarModels/grammar";
import {Sentence} from "../models/grammarModels/sentence";
import {StaticStorage} from "./ChartScreen";

const MainScreen = (props: { navigation: NavigationProp<object> }) => {
    const {
        navigation
    } = props
    const [sentences, setSentences] = useState<Sentence[]>([])
    const [userInput, setUserInput] = useState<string>('')
    const prevInput = useRef<string>("")
    const myGrammar = useMemo(() => {
        const productions1 = [
            "S -> NP VP",
            "NP -> NP PP | N",
            "PP -> P NP",
            "VP -> V NP | VP PP",

            "P -> with",
            "V -> saw",
            "N -> astronomers | ears | stars | telescopes"
        ]

        const palindrome = [
            "S -> A S A | B S B | C S C | A | B | C",
            "A -> a",
            "B -> b",
            "C -> c"
        ]

        return new CFGrammar(productions1);
    }, []);

    useEffect(() => {
        setSentences(myGrammar.sentences)
    }, [])

    const itemDidTap = (sentence: Sentence) => {
        StaticStorage.data.set("grammar", myGrammar)
        // @ts-ignore
        navigation.navigate("Chart", {
            sentence: sentence,
            key: "grammar"
        })
    }

    const renderSentenceList = (data: ListRenderItemInfo<Sentence>) => {
        return <SentenceItem itemDidTap={itemDidTap} sentence={data.item} index={data.index+1}/>
    }

    const memorizedFlatList = useMemo(() => {
        return (
            <FlatList
                style={styles.list}
                data={sentences}
                renderItem={renderSentenceList}/>
        )
    }, [sentences])

    const memorizedOnPress = useCallback(() => {
        setSentences(myGrammar.sentences)
        if (userInput.trim().length === 0 || prevInput.current === userInput) return
        console.log(userInput)
        setUserInput("")
    }, [userInput])

    const memorizedOnTextChange = useCallback((text: string) => {
        prevInput.current = userInput
        setUserInput(text)
    }, []);

    return (
        <View style={styles.container}>
            <InputField
                myOnTextChange={memorizedOnTextChange}
                userInput={userInput}></InputField>
            {memorizedFlatList}
            <GenerateButton onPressFromParent={memorizedOnPress}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#dfe6e9",
        alignItems: "center",
        flexDirection: "column",
    },
    list: {
        flex: 0.9,
        width: Dimensions.get("window").width,
        alignSelf: "center",
    }
});

export default MainScreen;
