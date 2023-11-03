import * as React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
  Button,
} from "react-native";
import { useState, useEffect } from "react";
import { Audio } from "expo-av";
import RandomOptions from "./RandomOptions";
import ImageBlurShadow from "./ImageBlurShadow";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";

/* const fakeSong = [
  {
    track: {
      albumName: "ピースサイン",
      albumImg:
        "https://i.scdn.co/image/ab67616d0000b2732b603ffe9f8493e96193e65b",
      songUrl:
        "https://p.scdn.co/mp3-preview/e4ff9d81aaa848d09bb60899f4a0b818b42428fb?cid=d8a5ed958d274c2e8ee717e6a4b0971d",
    },
  },
  {
    track: {
      albumName: "The Hero! (One Punch Man)",
      albumImg:
        "https://i.scdn.co/image/ab67616d0000b2732b603ffe9f8493e96193e65b",
      songUrl:
        "https://p.scdn.co/mp3-preview/78bb89b5af202eca6a98bfc4383eb7805be6412d?cid=d8a5ed958d274c2e8ee717e6a4b0971d",
    },
  },
  {
    track: {
      albumName: "Shinzo wo Sasageyo! - TV Size",
      albumImg:
        "https://i.scdn.co/image/ab67616d0000b2732b603ffe9f8493e96193e65b",
      songUrl:
        "https://p.scdn.co/mp3-preview/3692e9178dddd07706471fdce5145c3d80d228d8?cid=d8a5ed958d274c2e8ee717e6a4b0971d",
    },
  },
  {
    track: {
      albumName: "Kaikai Kitan",
      albumImg:
        "https://i.scdn.co/image/ab67616d0000b2732b603ffe9f8493e96193e65b",
      songUrl:
        "https://p.scdn.co/mp3-preview/f8d3e24ffde4ff834976fd45a1f25970b3078cf4?cid=d8a5ed958d274c2e8ee717e6a4b0971d",
    },
  },
  {
    track: {
      albumName: "炎",
      albumImg:
        "https://i.scdn.co/image/ab67616d0000b2732b603ffe9f8493e96193e65b",
      songUrl:
        "https://p.scdn.co/mp3-preview/dac115f1d54820a7b1f7591f2cdd1576bf840b14?cid=d8a5ed958d274c2e8ee717e6a4b0971d",
    },
  },
]; */

export default function RandomSong({ navigation }) {
  const [album, SetAlbum] = useState("");
  const [sound, setSound] = useState("");
  const [albumImg, setAlbumImg] = useState("");
  const [randomId, setRandomId] = useState();
  const [tracks, setTracks] = useState([]);
  const [allAlbumName, setAllAlbumName] = useState();

  const getTrack = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "https://spotify23.p.rapidapi.com/playlist_tracks/",
        params: {
          id: "2siMQsSv15yXBDdjmUSfJX",
          offset: "0",
          limit: "30",
        },
        headers: {
          "X-RapidAPI-Key": process.env.EXPO_PUBLIC_API_KEY,
          "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
        },
      });
      const items = response.data.items;
      console.log("items: ", items);
      setTracks(items);
      setAllAlbumName(items.map((item) => item.track.name)); //adjust to accomodate both name and image
      setRandomId(Math.floor(Math.random() * items.length));
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
      const selectedAlbumImg = tracks[randomId].track.album.images[0].url;
      SetAlbum(selectedAlbum);
      setAlbumImg(selectedAlbumImg);
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
      <View
        style={{
          flex: 0.7,
        }}
      >
        <View style={{ flex: 0.5 }}>
          <Pressable
            style={{ marginTop: 50, marginLeft: 30, alignSelf: "stretch" }}
            onPress={() => navigation.navigate("EntryPoint")}
          >
            <Ionicons name="arrow-back-circle" size={40} color="#3D30A2" />
          </Pressable>
        </View>

        <View style={{ margin: 8 }}>
          <Text style={styles.heading}>Guess Song</Text>
        </View>
        <View>
          {albumImg && (
            <ImageBlurShadow
              style={styles.albumImg}
              source={{ uri: albumImg }}
              imageWidth={220}
              imageHeight={220}
              imageBorderRadius={22}
              shadowBackgroundColor="#FFF6DE"
            />
          )}
        </View>

        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.text}>Random Song</Text>
          </TouchableOpacity>
        </View>
      </View>

      {album && (
        <View
          style={{
            flex: 0.3,
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
          <RandomOptions selectedAlbum={album} allAlbumName={allAlbumName} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF6DE",
  },
  albumImg: {
    marginTop: 20,
    alignSelf: "center",
    elevation: 4,
  },
  heading: {
    marginTop: 20,
    color: "#3D30A2",
    fontSize: 24,
    textAlign: "center",
  },
  button: {
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 39,
    width: 212,
    backgroundColor: "#FFA33C",
  },
  text: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
    fontWeight: "400",
  },
});
