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

export default function RandomOptions({ selectedAlbum }) {
  return (
    <View>
      <Text>Song playing: {selectedAlbum}</Text>
    </View>
  );
}
