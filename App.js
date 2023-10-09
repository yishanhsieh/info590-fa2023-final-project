import * as React from "react";
import { Text, View, StyleSheet, Button, FlatList, Image } from "react-native";
import { Audio } from "expo-av";
import { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [album, SetAlbum] = useState([]);

  const getAlbum = async () => {
    try {
      const response = await axios({
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
      });
      const tracks = response.data.items;
      SetAlbum(tracks);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getAlbum();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <Image
        style={styles.image}
        source={{ uri: item.track.album.images[0].url }}
      ></Image>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList data={album} renderItem={renderItem} />
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
    width: 50,
    height: 50,
  },
});
