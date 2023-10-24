import * as React from "react";
import { useEffect, useState } from "react";
import { Text, View, FlatList, Button, Alert } from "react-native";
import Checker from "./Checker";

export default function RandomOptions({ selectedAlbum, allAlbumName }) {
  //randomly select three options from allAlbumName array
  // add selectedAlbum in to the array
  // randomize the arrary order
  //let optionAlbum = [];
  const [optionAlbum, setOptionAlbum] = useState([]);
  const [showRandomOptions, setShowRandomOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (selectedAlbum) {
      setShowRandomOptions(true);
      getRandomOptions();

      setSelectedOption(null);
    } else {
      setShowRandomOptions(false);
    }
    console.log("selectedAlbum:", selectedAlbum);
    console.log("showRandomOptions:", showRandomOptions);
  }, [selectedAlbum]);

  function getRandomOptions() {
    let optionAlbumList = [];
    while (optionAlbumList.length < 3) {
      const randomId = Math.floor(Math.random() * allAlbumName.length);
      let randomAlbum = allAlbumName[randomId];
      if (
        !optionAlbumList.includes(randomAlbum) &&
        randomAlbum !== selectedAlbum
      ) {
        optionAlbumList.push(randomAlbum);
      }
    }
    optionAlbumList.push(selectedAlbum); //add the correct answer into options

    console.log("unshuffled array: ", optionAlbumList);
    shuffleArray(optionAlbumList);
    console.log("shuffled array:", optionAlbumList);
    setOptionAlbum(optionAlbumList);
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const renderItem = ({ item }) => {
    return (
      <View style={{ margin: 5 }}>
        <Button
          title={item}
          onPress={() => {
            setSelectedOption(item);
          }}
        />
      </View>
    );
  };

  return (
    <View>
      {/*  <Text>Song playing: {selectedAlbum}</Text>

      <View style={{ margin: 10 }}>
        <Text>All albumName: {allAlbumName}</Text>
      </View> */}

      {showRandomOptions && (
        <View style={{ margin: 10 }}>
          <FlatList data={optionAlbum} renderItem={renderItem} />
          <Checker answer={selectedAlbum} selectedOption={selectedOption} />
        </View>
      )}
    </View>
  );
}
