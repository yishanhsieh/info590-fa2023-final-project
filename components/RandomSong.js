import * as React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useState, useEffect } from "react";
import { Audio } from "expo-av";
import RandomOptions from "./RandomOptions";
import ImageBlurShadow from "./ImageBlurShadow";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { setDoc, doc, collection, getDocs } from "firebase/firestore";
import { db } from "./../firebaseConfig";

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
  const [album, setAlbum] = useState("");
  const [sound, setSound] = useState("");
  const [albumImg, setAlbumImg] = useState("");
  const [randomId, setRandomId] = useState();
  /* const [songs, setSongs] = useState(); //temp use for renew firebase field name */
  const [tracks, setTracks] = useState();
  //now `tracks` is gained from Firebase. If Firebase db should renew, uncomment out FetchData to get updated data from Rapid API.

  const [allAlbumName, setAllAlbumName] = useState();
  const [allAlbumImg, setAllAlbumImg] = useState();
  const [allAlbumUrl, setAllAlbumUrl] = useState();

  //getTrack from Rapid API
  const getTrack = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: "https://spotify23.p.rapidapi.com/playlist_tracks/",
        params: {
          id: "2siMQsSv15yXBDdjmUSfJX",
          offset: "0",
          limit: "50",
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
      setAllAlbumImg(items.map((item) => item.track.album.images[0].url));
      setAllAlbumUrl(items.map((item) => item.track.preview_url));
      setRandomId(Math.floor(Math.random() * items.length));
    } catch (err) {
      console.log(err.message);
    }
    addData();
  };

  //If spotify playlist changes, uncomment out the code.
  /*   useEffect(() => {
    getTrack();
  }, []); */

  //Save API data to firebase
  const addData = async () => {
    try {
      console.log("allAlbumName", allAlbumName);
      for (let i = 0; i < allAlbumName.length; i++) {
        await setDoc(doc(db, "songs", `${i}`), {
          albumName: allAlbumName[i],
          albumImg: allAlbumImg[i],
          albumUrl: allAlbumUrl[i],
        });
      }
      console.log("add data success");
    } catch (err) {
      console.log("fail add data", err);
    }
  };

  //fetch data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      const dbCol = collection(db, "songs"); //get collection `students`
      const dbDocs = await getDocs(dbCol); //get documents
      const trackData = [];
      dbDocs.forEach((doc) => {
        trackData.push(doc.data());
      });
      setTracks(trackData);
      setAllAlbumName(trackData.map((item) => item.albumName));
      setRandomId(Math.floor(Math.random() * trackData.length));
      console.log(trackData);
    };

    fetchData();
  }, []);

  function getRandomTrack() {
    id = Math.floor(Math.random() * tracks.length);
    if (id !== randomId) {
      setRandomId(id);
      const selectedAlbum = tracks[randomId].albumName;
      const selectedSong = tracks[randomId].albumUrl;
      const selectedAlbumImg = tracks[randomId].albumImg;
      setAlbum(selectedAlbum);
      setAlbumImg(selectedAlbumImg);
      playSound(selectedSong);
    }
  }

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
      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <Pressable
          style={{
            marginTop: 30,
            marginRight: 30,
          }}
          onPress={() => navigation.navigate("EntryPoint")}
        >
          <Image
            source={require("./../assets/home.png")}
            style={{ width: 26, height: 26 }}
          />
        </Pressable>
      </View>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <View style={{ margin: 12 }}>
          <Text style={styles.heading}>
            {!album ? "Pick up a song" : "What the song is?"}
          </Text>

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
          <TouchableOpacity
            style={[styles.button, styles.shadowProp]}
            onPress={handlePress}
          >
            <Text style={styles.text}>Random Song</Text>
          </TouchableOpacity>
        </View>
      </View>

      {album && (
        <View
          style={{
            flex: 0.2,
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
    color: "#3D30A2",
    fontSize: 24,
    textAlign: "center",
    fontWeight: "700",
  },
  button: {
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 39,
    width: 212,
    backgroundColor: "#FFA33C",
    marginBottom: 20,
  },
  text: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
    fontWeight: "400",
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
});
