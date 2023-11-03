import * as React from "react";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  Button,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import Checker from "./Checker";
import { AntDesign } from "@expo/vector-icons";

export default function RandomOptions({ selectedAlbum, allAlbumName }) {
  //randomly select three options from allAlbumName array
  // add selectedAlbum in to the array
  // randomize the arrary order
  //let optionAlbum = [];
  const [optionAlbum, setOptionAlbum] = useState([]);
  const [showRandomOptions, setShowRandomOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [buttonIcon, setButtonIcon] = useState();

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

  function getButtonIcon({ item }) {
    if (item === selectedAlbum) {
      setButtonIcon(<AntDesign name="checkcircle" size={16} color="green" />);
    }
    if (item !== selectedAlbum) {
      setButtonIcon(<AntDesign name="closecircle" size={16} color="red" />);
    }
  }

  const renderItem = ({ item }) => {
    return (
      <View style={{ justifyContent: "center" }}>
        <TouchableOpacity
          style={styles.option}
          onPress={() => {
            setSelectedOption(item);
            getButtonIcon(item);
          }}
        >
          <Text style={styles.btnText}>{item}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ justifyContent: "center" }}>
      {showRandomOptions && (
        <View>
          <View style={{ alignItems: "center", margin: 10 }}>
            <Checker answer={selectedAlbum} selectedOption={selectedOption} />
          </View>
          <View style={{ justifyContent: "space-evenly" }}>
            <FlatList
              numColumns={2}
              data={optionAlbum}
              renderItem={renderItem}
            />
          </View>
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
    height: 150,
    alignSelf: "center",
    borderRadius: 16,
  },
  option: {
    width: 150,
    height: 75,
    margin: 10,
    backgroundColor: "#EDEDF0",
    borderRadius: 12,
    borderColor: "#C5B9B9",
    borderWidth: 1,
    justifyContent: "center",
  },
  btnText: {
    fontSize: 16,

    padding: 10,
    textAlign: "center",
    color: "#3D30A2",
  },
});
