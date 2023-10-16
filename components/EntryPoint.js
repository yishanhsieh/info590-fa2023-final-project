import * as React from "react";
import { Text, View, StyleSheet, Image, Button } from "react-native";

export default function EntryPoint({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to</Text>
      <Text style={styles.secondheader}> Guess Song game</Text>
      <Image
        style={styles.image}
        source={require("../assets/musical-notes.png")}
      />
      <Button
        title={"Join the Game"}
        onPress={() => navigation.navigate("RandomSong")}
      />
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
  header: {
    fontWeight: "bold",
    fontSize: 30,
    color: "red",
    marginTop: 30,
    alignSelf: "center",
    justifyContent: "center",
  },
  secondheader: {
    fontWeight: "bold",
    fontSize: 30,
    color: "red",
    marginBottom: 30,
    alignSelf: "center",
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 40,
    alignSelf: "center",
  },
});
