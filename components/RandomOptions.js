import * as React from "react";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

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
    setOptionAlbum(optionAlbumList);
    console.log("unShuffle array: ", optionAlbum);
    shuffleArray(optionAlbumList);
    console.log("shuffled array:", optionAlbum);
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const renderItem = ({ item: option }) => {
    return (
      <TouchableOpacity
        style={
          selectedOption === option ? styles.selectedOption : styles.option
        }
        onPress={() => {
          setSelectedOption(option);
        }}
      >
        <Text
          style={
            selectedOption === option ? styles.selectedBtnText : styles.btnText
          }
        >
          {selectedOption === selectedAlbum && selectedOption === option ? (
            <AntDesign name="checkcircle" size={16} color="#53E4B1" />
          ) : selectedOption !== selectedAlbum && selectedOption === option ? (
            <AntDesign name="closecircle" size={16} color="#FD8C8C" />
          ) : null}{" "}
          {option}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      {showRandomOptions && (
        <View style={{ marginTop: 10 }}>
          <FlatList numColumns={2} data={optionAlbum} renderItem={renderItem} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 20,
    alignSelf: "center",
  },
  image: {
    width: 150,
    alignSelf: "center",
    borderRadius: 16,
  },
  option: {
    width: 160,
    padding: 10,
    margin: 8,
    backgroundColor: "#EDEDF0",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedOption: {
    width: 160,
    padding: 8,
    margin: 10,
    backgroundColor: "#27232D",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontSize: 16,
    fontWeight: "500",
    padding: 5,
    textAlign: "center",
    color: "#3D30A2",
  },
  selectedBtnText: {
    fontSize: 16,
    fontWeight: "500",
    padding: 5,
    textAlign: "center",
    color: "white",
  },
});
