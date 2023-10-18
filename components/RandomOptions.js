import * as React from "react";
import { useEffect, useState } from "react";
import { Text, View, FlatList } from "react-native";

export default function RandomOptions({ selectedAlbum, allAlbumName }) {
  //randomly select three options from allAlbumName array
  // add selectedAlbum in to the array
  // randomize the arrary order
  let optionAlbum = [];
  const [showRandomOptions, setShowRandomOptions] = useState(false);

  useEffect(() => {
    if (selectedAlbum) {
      setShowRandomOptions(true);
      getRandomOptions();
    } else {
      setShowRandomOptions(false);
    }
    console.log("selectedAlbum:", selectedAlbum);
    console.log("showRandomOptions:", showRandomOptions);
  }, [selectedAlbum]);

  function getRandomOptions() {
    while (optionAlbum.length < 3) {
      const randomId = Math.floor(Math.random() * allAlbumName.length);
      let randomAlbum = allAlbumName[randomId];
      if (!optionAlbum.includes(randomAlbum) && randomAlbum !== selectedAlbum) {
        optionAlbum.push(randomAlbum);
      }
    }
    optionAlbum.push(selectedAlbum); //add the correct answer into options
    console.log("unShuffle array: ", optionAlbum);
    shuffleArray(optionAlbum);
    console.log("shuffled array:", optionAlbum);
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

      {showRandomOptions && (
        <View style={{ margin: 10 }}>
          <FlatList data={optionAlbum} renderItem={renderItem} />
        </View>
      )}
    </View>
  );
}
