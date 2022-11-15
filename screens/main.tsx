/*eslint-disable*/

import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Text, StyleSheet, View, Dimensions, FlatList, Button, GestureResponderEvent} from 'react-native';
import {TernaryTree, TSNode} from "../models/TernaryTree";
import {Grammar, Symbol} from "../models/grammar";
import Item from "../components/item";
import InputField from "../components/textField";
import GenerateButton from "../components/button";
import {
    NavigationProp
} from "@react-navigation/native";

function getRandomNumber() {
    return Math.random() * 20;
}

const MainScreen = (props: {navigation: NavigationProp<object>}) => {
    const {
        navigation
    } = props
    const [strings, setStrings] = useState<string[]>([])
    const [userInput, setUserInput] = useState<string>('')
    const prevInput = useRef<string>("")
    const myGrammar = useMemo(() => {
        const myTree = new TernaryTree(new TSNode(new Symbol("S")))
        myTree.insert(["NP", "VP"])
        myTree.insert(["PN"])
        myTree.insert(["she"])
        myTree.insert(["VP", "PP"])
        myTree.insert(["V", "NP"])
        myTree.insert(["eats"])
        myTree.insert(["NP"])
        myTree.insert(["Det", "N"])
        myTree.insert(["a"])
        myTree.insert(["fish"])
        myTree.insert(["P", "NP"])
        myTree.insert(["P"])
        myTree.insert(["with"])
        myTree.insert(["Det", "N"])
        myTree.insert(["a"])
        myTree.insert(["fork"])
        const palindrome = [
            "S -> aa A | A | lam",
            "A -> A b | lam"
        ]

        return new Grammar(palindrome);
    }, []);

    useEffect(() => {
        setStrings(myGrammar.getStrings(getRandomNumber()))
    }, [])

    const itemDidTap = (sentence: string) => {
        // @ts-ignore
        navigation.navigate("Chart", {
            string: sentence,
            grammar: myGrammar
        })
    }

    const renderStringList = (data: { item: string; index: number; }) => {
        const {item, index} = data
        return <Item itemDidTap={itemDidTap} string={item} index={index+1}/>
    }

    const memorizedFlatList = useMemo(() => {
        return (
            <FlatList
                style={styles.list}
                data={strings}
                renderItem={renderStringList}/>
        )
    }, [strings])

    const memorizedOnPress = useCallback(() => {
        setStrings(myGrammar.getStrings(getRandomNumber()))
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
