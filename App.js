import * as React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { Audio } from "expo-av";
import { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [album, SetAlbum] = useState("");
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
    async function fetchdata() {
      const options = {
        method: "GET",
        url: "https://spotify23.p.rapidapi.com/playlist_tracks/",
        params: {
          id: "2siMQsSv15yXBDdjmUSfJX",
          offset: "0",
          limit: "10",
        },
        headers: {
          "X-RapidAPI-Key":
            "64ce64b6e5msh65817e0e1e29fc9p1afae2jsnb989f18d4c59",
          "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
        },
      };
      try {
        const response = await axios.request(options);
        const albumName = response.data.items[1].track.album.name;
        //const songURL = response.data.items[1].track.preview_url;

        SetAlbum(albumName);
      } catch (error) {
        console.error(error);
      }
    }

    fetchdata();
  }, []);

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <Text>Song album: {album} </Text>

      <Button title="Play Sound" onPress={playSound} />
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
});
