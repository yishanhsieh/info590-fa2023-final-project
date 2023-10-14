import * as React from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import EntryPoint from "./components/EntryPoint";
import RandomOption from "./components/RandomSong";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="EntryPoint">
          <Stack.Screen
            name="Welcome"
            component={EntryPoint}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="RandomOption" component={RandomOption} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
    justifyContent: "center",
  },
});
