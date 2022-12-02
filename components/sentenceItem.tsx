/*eslint-disable*/

import {Dimensions, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import {Sentence} from "../models/grammarModels/sentence";

const SentenceItem = (props: { sentence: Sentence, index: number, itemDidTap: (sentence: Sentence)=> void }) => {
    const {
        sentence,
        index,
        itemDidTap
    } = props

    return (
        <TouchableOpacity style={styles.container} onPress={() => itemDidTap(sentence)}>
            <View style={styles.numberLabel}>
                <Text style={styles.index}>{index}</Text>
            </View>
            <View style={styles.sentence}>
                <Text style={styles.text}>{sentence.getSentence()}</Text>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 10,
        marginTop: 10,
        backgroundColor: "white",
        width: Dimensions.get("window").width-20,
        shadowColor: "gray",
        shadowOpacity: 0.7,
        shadowOffset: {width: 5, height: 5},
        flexDirection: "row",
        alignSelf: "center"
    },
    text:{
        fontSize: 30,
        textAlign: "center",
        fontStyle: "italic",
    },
    index: {
        fontSize: 30,
        color: "red",
        textAlign: "center",
        fontStyle: "italic",
    },
    numberLabel: {
        flex: 0.2,
        alignItems: "center",
        justifyContent: "center",
    },
    sentence: {
        flex: 0.8,
        alignContent: "center",
        justifyContent: "center",
        padding: 5
    }
})

export default SentenceItem
