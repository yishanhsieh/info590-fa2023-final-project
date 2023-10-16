import * as React from "react";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  FlatList,
  Image,
  SafeAreaView,
} from "react-native";

export default function RandomOptions({ selectedAlbum, allAlbumName }) {
  //randomly select three options from allAlbumName array
  // add selectedAlbum in to the array
  // randomize the arrary order
  let optionAlbum = [];
  let finalOptions = [];
  const [finalRandomOptions, setFinalRandomOptions] = useState();

  useEffect(() => {
    function getRandomOptions() {
      while (optionAlbum.length < 3) {
        const randomId = Math.floor(Math.random() * allAlbumName.length);
        let randomAlbum = allAlbumName[randomId];
        if (!optionAlbum.includes(randomAlbum)) {
          optionAlbum.push(randomAlbum);
        }
      }
      optionAlbum.push(selectedAlbum); //add the correct answer into options

      while (finalOptions.length < 4) {
        const randomId = Math.floor(Math.random() * optionAlbum.length);
        const finalCandidates = optionAlbum[randomId];
        if (!finalOptions.includes(finalCandidates)) {
          finalOptions.push(finalCandidates);
        }
      }
      setFinalRandomOptions(finalOptions);
    }
    getRandomOptions();
  }, [selectedAlbum]);

  /*  function getRandomOptions() {
    while (optionAlbum.length < 3) {
      const randomId = Math.floor(Math.random() * allAlbumName.length);
      let randomAlbum = allAlbumName[randomId];
      if (!optionAlbum.includes(randomAlbum)) {
        optionAlbum.push(randomAlbum);
      }
    }
    optionAlbum.push(selectedAlbum);

    while (finalRandomOptions.length < 4) {
      const randomId = Math.floor(Math.random() * optionAlbum.length);
      const finalCandidates = optionAlbum[randomId];
      if (!finalRandomOptions.includes(finalCandidates)) {
        finalRandomOptions.push(finalCandidates);
      }
    }

    return finalRandomOptions;
  }
  getRandomOptions(); */

  /* /* function getfinalRandomOptions() {
    while (finalRandomOptions.length < 4) {
      const randomId = Math.floor(Math.random() * optionAlbum.length);
      const finalCandidates = optionAlbum[randomId];
      if (!finalRandomOptions.includes(finalCandidates)) {
        finalRandomOptions.push(finalCandidates);
      }
    }
    console.log("finalOptions are:", finalRandomOptions);
    return finalRandomOptions;
  } */

  /* getfinalRandomOptions();  */

  const renderItem = ({ item }) => {
    return (
      <View>
        <Text>Random options: {item} </Text>
      </View>
    );
  };

  return (
    <View>
      <Text>Song playing: {selectedAlbum}</Text>

      <View style={{ margin: 10 }}>
        <Text>All albumName: {allAlbumName}</Text>
      </View>

      <View style={{ margin: 10 }}>
        <FlatList data={finalRandomOptions} renderItem={renderItem} />
        {/* <FlatList data={optionAlbum} renderItem={renderItem} /> */}
      </View>

      {/* list four options by FlatList */}
    </View>
  );
}
