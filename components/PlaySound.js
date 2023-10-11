import * as React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { Audio } from "expo-av";
import { useState, useEffect } from "react";

export default function PlaySound() {
  const [sound, setSound] = useState();

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync({
      uri: "https://p.scdn.co/mp3-preview/b07586c201cd3fbd336c84fb14d433c75edf52a3?cid=d8a5ed958d274c2e8ee717e6a4b0971d",
    });
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View>
      <Text>Guess Song</Text>
      <Button title="Play Sound" onPress={playSound} />
    </View>
  );
}
