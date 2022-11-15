/*eslint-disable*/

import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import MainScreen from "./screens/main";
import ChartScreen from "./screens/chart";

const Stack = createNativeStackNavigator();

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
