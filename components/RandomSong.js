import * as React from "react";
import { View, StyleSheet, Button, SafeAreaView } from "react-native";
import { useState, useEffect } from "react";
import { Audio } from "expo-av";
import RandomOptions from "./RandomOptions";
import axios from "axios";

/* const fakeSong = [
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
]; */

export default function RandomSong() {
  const [album, setAlbum] = useState("");
  const [sound, setSound] = useState("");
  const [randomId, setRandomId] = useState(Math.floor(Math.random() * 7));
  const [tracks, setTracks] = useState([]);
  const [allAlbumName, setAllAlbumName] = useState(); /* 
  let allAlbumName = []; */

  const getTrack = async () => {
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
          "X-RapidAPI-Key": process.env.EXPO_PUBLIC_API_KEY,
          "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
        },
      });
      const items = response.data.items;
      console.log("items: ", items);
      setTracks(items);
      setAllAlbumName(items.map((item) => item.track.name));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getTrack();
  }, []);

  function getRandomTrack() {
    id = Math.floor(Math.random() * tracks.length);
    if (id != randomId) {
      setRandomId(id);
      const selectedAlbum = tracks[randomId].track.name;
      const selectedSong = tracks[randomId].track.preview_url;
      setAlbum(selectedAlbum);
      playSound(selectedSong);
    }
  }

  //if selected Item is correct, goRandomTrack();

  const handlePress = () => {
    getRandomTrack();
  };

  async function playSound(preview_url) {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync({
      uri: preview_url,
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
        <Button title="random song" onPress={handlePress} />
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
