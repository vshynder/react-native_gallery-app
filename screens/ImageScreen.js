import React from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

const ImageScreen = ({ route }) => {
  return (
    <View style={styles.imageScreen}>
      <Image style={styles.image} source={{ uri: route.params.fullImage }} />
    </View>
  );
};

const styles = StyleSheet.create({
  imageScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width,
    height,
    resizeMode: "contain",
  },
});

export default ImageScreen;
