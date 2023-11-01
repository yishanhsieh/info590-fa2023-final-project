import * as React from "react";
import { useEffect, useState } from "react";
import { Text, View, FlatList, Button, StyleSheet } from "react-native";
import Checker from "./Checker";

export default function RandomOptions({
  selectedAlbum,
  selectedAlbumImg,
  allAlbumInfo,
}) {
  //randomly select three options from allAlbumName array
  // add selectedAlbum in to the array
  // randomize the arrary order
  //let optionAlbum = [];
  /* const [optionAlbum, setOptionAlbum] = useState([]); */
  const [showRandomOptions, setShowRandomOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [optionAlbumList, setOptionAlbumList] = useState([
    { optionAlbumName: selectedAlbum, optionAlbumImg: selectedAlbumImg },
  ]);

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
    while (optionAlbumList.length < 3) {
      const randomId = Math.floor(Math.random() * allAlbumInfo.length);
      let randomAlbum = allAlbumInfo[randomId].albumName; //allAlbumName[randomID].albumName
      let randomAlbumImg = allAlbumInfo[randomId].albumImg;
      let target = { albumName: { randomAlbum } };

      if (
        !optionAlbumList.some(
          (item) => item.optionAlbumName === target.albumName
        ) /* &&
        //the first three options cannot include the answer
        randomAlbum !== selectedAlbum */
      ) {
        /* optionAlbumList.push(randomAlbum); */
        let updatedOptionArray = [
          ...optionAlbumList,
          {
            optionAlbumName: randomAlbum,
            optionAlbumImg: randomAlbumImg,
          },
        ];

        setOptionAlbumList(updatedOptionArray);
      }
    }

    /*  optionAlbumList.push({
      optionAlbumName: selectedAlbum,
      optionAlbumImg: selectedAlbumImg,
    }); //add the correct albumName and image into options */

    console.log("unshuffled array: ", optionAlbumList);
    shuffleArray(optionAlbumList);
    console.log("shuffled array:", optionAlbumList);
    /* setOptionAlbum(optionAlbumList);  */
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
        <Image style={styles.image} source={{ url: item.optionAlbumImg }} />
        <Button
          title={item.optionAlbumName}
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
          <FlatList data={optionAlbumList} renderItem={renderItem} />
          <Checker answer={selectedAlbum} selectedOption={selectedOption} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    margin: 10,
    justifyContent: "center",
  },
});
