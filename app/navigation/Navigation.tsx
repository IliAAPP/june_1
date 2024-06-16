import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Main from "../components/Main";
import Calendar from "../components/Calendar";
import Profile from "../components/Profile";
import DailyCheck from "../components/DailyCheck";
import Chertez from "../components/Chertez";
import Technika from "../components/Technika";
import MyMaterials from "../components/MyMaterials";
import ChatScreen from "../components/ChatScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} >
                <Stack.Screen name="Main" component={Main} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="Chats" component={ChatScreen} />
                <Stack.Screen name="Calendar" component={Calendar} />
                <Stack.Screen name="DailyCheck" component={DailyCheck} />
                <Stack.Screen name="Chertez" component={Chertez} />
                <Stack.Screen name="Technika" component={Technika} />
                <Stack.Screen name="MyMaterials" component={MyMaterials} />
                
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
