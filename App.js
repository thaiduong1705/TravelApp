import { SafeAreaView, StyleSheet, Text, View, StatusBar } from "react-native";
import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import HomeScreen from "./screens/HomeScreen";
import Discover from "./screens/Discover";
import ItemScreen from "./screens/ItemScreen";
import Map from "./screens/Map";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    switch (route.name) {
                        default:
                            iconName = "home";
                            break;
                    }
                    return (
                        <FontAwesome
                            name={iconName}
                            size={24}
                            color="#A0C4C7"
                        />
                    );
                },
            })}
        >
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
                    <Stack.Screen name="Map" component={Map} />
                </Stack.Navigator>
            </NavigationContainer>
        </TailwindProvider>
    );
}
