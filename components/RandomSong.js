import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  FlatList,
  Image,
  SafeAreaView,
} from "react-native";
import { useState, useEffect } from "react";
import { Audio } from "expo-av";
import axios from "axios";
import RandomOptions from "./RandomOptions";

const fakeSong = [
  {
    track: {
      albumName: "ピースサイン",
      songUrl:
        "https://p.scdn.co/mp3-preview/e4ff9d81aaa848d09bb60899f4a0b818b42428fb?cid=d8a5ed958d274c2e8ee717e6a4b0971d",
    },
  },
  {
    track: {
      albumName: "The Hero! (One Punch Man)",
      songUrl:
        "https://p.scdn.co/mp3-preview/78bb89b5af202eca6a98bfc4383eb7805be6412d?cid=d8a5ed958d274c2e8ee717e6a4b0971d",
    },
  },
  {
    track: {
      albumName: "Shinzo wo Sasageyo! - TV Size",
      songUrl:
        "https://p.scdn.co/mp3-preview/3692e9178dddd07706471fdce5145c3d80d228d8?cid=d8a5ed958d274c2e8ee717e6a4b0971d",
    },
  },
  {
    track: {
      albumName: "Kaikai Kitan",
      songUrl:
        "https://p.scdn.co/mp3-preview/f8d3e24ffde4ff834976fd45a1f25970b3078cf4?cid=d8a5ed958d274c2e8ee717e6a4b0971d",
    },
  },
  {
    track: {
      albumName: "炎",
      songUrl:
        "https://p.scdn.co/mp3-preview/dac115f1d54820a7b1f7591f2cdd1576bf840b14?cid=d8a5ed958d274c2e8ee717e6a4b0971d",
    },
  },
];

export default function RandomSong() {
  const [album, SetAlbum] = useState("");
  const [sound, setSound] = useState("");
  let allAlbumName = [];

  /*  const getTrack =  async () => {
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
            EXPO_PUBLIC_API_KEY,
          "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
        },
      });
      const tracks = response.data.items; 
      SetAlbum(tracks); 
    } catch (err) {
      console.log(err.message);
    }
  } */ /*  useEffect(() => {
    getTrack();
  }, []); */

  /*   const renderItem = ({ item }) => {
    return (
      <View>
        <Text>Album: {item.track.albumName}</Text>
        source={{ uri: item.track.album.images[0].url }} 
      </View>
    );
  }; */

  const getRandomTrack = () => {
    const randomId = Math.floor(Math.random() * fakeSong.length);
    const selectedAlbum = fakeSong[randomId].track.albumName;
    const selectedSong = fakeSong[randomId].track.songUrl;
    SetAlbum(selectedAlbum);
    playSound(selectedSong);
  };

  function getAllAlbum() {
    allAlbumName = fakeSong.map((item) => item.track.albumName);
    return allAlbumName;
  }

  getAllAlbum();

  async function playSound(songUrl) {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync({
      uri: songUrl,
    });
    setSound(sound);

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
    <View style={styles.container}>
      <SafeAreaView>
        <Button
          title="random song"
          onPress={() => {
            getRandomTrack();
          }}
        />

        <RandomOptions selectedAlbum={album} allAlbumName={allAlbumName} />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 10,
    marginTop: 30,
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
    justifyContent: "center",
  },
});
