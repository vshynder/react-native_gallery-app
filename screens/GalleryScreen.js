import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
const { width } = Dimensions.get("window");

import CONSTANTS from "../constants";

class GalleryScreen extends React.Component {
  state = {
    movies: [],
  };

  handleImagePress = (fullImage) => {
    this.props.navigation.navigate("Image", { fullImage });
  };

  fetchData = async () => {
    const data = await fetch(
      `https://api.unsplash.com/photos/?client_id=${CONSTANTS.ACCESS_KEY}`
    );
    const json = await data.json();
    this.setState({ movies: json });
  };

  componentDidMount() {
    this.fetchData();
  }

  renderMovies = ({ item }) => {
    let description = item.alt_description
      ? item.alt_description
      : item.description;
    if (!description) return;
    description =
      description.length > 70 ? description.substr(0, 70) + "..." : description;
    return (
      <TouchableOpacity
        onPress={() => this.handleImagePress(item.urls.regular)}
      >
        <View style={styles.imageContainer}>
          <View style={styles.imageBlock}>
            <Image style={styles.image} source={{ uri: item.urls.small }} />
          </View>
          <View style={styles.descBlock}>
            <Text style={styles.text}>description: {description}</Text>
            <Text style={styles.text}>author: {item.user.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View>
        <FlatList data={this.state.movies} renderItem={this.renderMovies} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  galleryScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    width,
    height: 300,
    borderBottomColor: "#8b8b8b",
    borderBottomWidth: 1,
    marginVertical: 5,
  },
  imageBlock: {
    flex: 4,
  },
  descBlock: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  text: {
    textAlign: "center",
    fontSize: 16,
  },
});

export default GalleryScreen;
