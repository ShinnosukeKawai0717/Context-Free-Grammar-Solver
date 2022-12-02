/*eslint-disable*/

import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import MainScreen from "./screens/MainScreen";
import ChartScreen from "./screens/ChartScreen";
import {CFGrammar} from "./models/grammarModels/grammar";
import {EarleyParser} from "./models/grammarModels/parser";
import {Sentence} from "./models/grammarModels/sentence";

const Stack = createNativeStackNavigator();

// const HomeStack = createNativeStackNavigator();
//
// function HomeStackScreen() {
//     return (
//         <HomeStack.Navigator>
//             <HomeStack.Screen name="Home" component={MainScreen} />
//             <HomeStack.Screen name="Chart" component={ChartScreen} />
//         </HomeStack.Navigator>
//     );
// }

const App = () =>{
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={"Main"}>
                <Stack.Screen name={"Main"} component={MainScreen} />
                <Stack.Screen name={"Chart"} component={ChartScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}


export default App;
