import React from "react";
import { View, Image, StyleSheet, Platform } from "react-native";

const ImageBlurShadow = (props) => {
  return (
    <View style={props.style}>
      <Image
        source={props.source}
        style={[
          {
            width: props.imageWidth,
            height: props.imageHeight,
            borderRadius: props.imageBorderRadius,
            marginBottom: props.shadowOffset,
            resizeMode: props.imageResizeMode,
          },
          styles.image,
        ]}
      />
      <View style={([{ width: props.imageWidth }], styles.shadow_container)}>
        <Image
          source={props.source}
          style={{
            resizeMode: "cover",
            width: props.imageWidth,
            height: props.imageHeight,
          }}
          blurRadius={props.shadowBlurRadius}
        />
        <Image
          source={require("../assets/blur.png")}
          resizeMethod="auto"
          tintColor={props.shadowBackgroundColor}
          style={{
            width: "100%",
            position: "absolute",
            height: Platform.OS === "web" ? "55%" : undefined,
            bottom: 0,
            left: 0,
            aspectRatio: 1.8,
            resizeMode: "cover",
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    zIndex: 1,
  },
  shadow_container: {
    position: "absolute",
    bottom: 0,
    zIndex: 0,
  },
});

ImageBlurShadow.defaultProps = {
  imageWidth: 200,
  imageHeight: 200,
  shadowBlurRadius: 38,
  shadowOffset: 52,
  shadowBackgroundColor: "#ffffff",
};

export default ImageBlurShadow;
