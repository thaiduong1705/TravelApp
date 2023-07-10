import { SafeAreaView, StyleSheet, Text, View, StatusBar } from "react-native";
import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import Discover from "./screens/Discover";
import ItemScreen from "./screens/ItemScreen";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigation = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Discover" component={Discover} />
        </Tab.Navigator>
    );
};
export default function App() {
    return (
        <TailwindProvider>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{ tabBarVisible: false }}
                    />
                    <Stack.Screen name="Tab" component={TabNavigation} />
                    <Stack.Screen name="ItemScreen" component={ItemScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </TailwindProvider>
    );
}
