import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

export default function EntryPoint({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/background.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.contentContainer}>
          <View style={{ flex: 0.6 }}></View>
          <View style={{ flex: 0.4 }}>
            <View style={{ flex: 0.3 }}>
              <Text style={styles.header}>Anime Song Guess</Text>
            </View>
            <View style={{ flex: 0.3, alignItems: "center" }}>
              <Text style={styles.description}>
                Enjoy the worldwide popular anime songs
              </Text>
            </View>
            <View style={{ flex: 0.4, alignItems: "center" }}>
              <TouchableOpacity
                style={[styles.Button, styles.shadowProp]}
                onPress={() => navigation.navigate("RandomSong")}
              >
                <Text style={styles.text}>Join the Game</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    alignItems: "center",
    flex: 1,
  },
  header: {
    color: "#3D30A2",
    fontSize: 36,
    textAlign: "center",
    fontWeight: "600",
    textShadowColor: "black",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 1,
    alignItems: "center",
  },
  description: {
    color: "#3D30A2",
    fontSize: 20,
    textAlign: "center",
    width: 303,
  },
  image: {
    flex: 1,
  },
  Button: {
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 39,
    width: 212,
    backgroundColor: "#FFA33C",
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
