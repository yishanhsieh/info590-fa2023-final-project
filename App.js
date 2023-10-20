import * as React from "react";
import { Button, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RandomSong from "./components/RandomSong";
import EntryPoint from "./components/EntryPoint";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="EntryPoint">
        <Stack.Screen name="RandomSong" component={RandomSong} />
        <Stack.Screen
          name="EntryPoint"
          component={EntryPoint}
          d
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
