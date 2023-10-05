import { StyleSheet, Text, View, Button } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { Audio } from "expo-av";

export default function APP() {
  const [album, SetAlbum] = useState("");
  const [sound, SetSound] = useState();

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
            "3d001a826cmsh0ce72ea4b147ddep1c33d3jsn2438668ea1ef",
          "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
        },
      };
      try {
        const response = await axios.request(options);
        const albumName = response.data.items[1].track.album.name;
        const songURL = response.data.items[1].track.preview_url;
        SetSound(songURL);
        SetAlbum(albumName);
      } catch (error) {
        console.error(error);
      }
    }

    fetchdata();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Animation music:</Text>
      <View>
        <Text>Song name: {album} </Text>
        <Text>Song name: {sound} </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
