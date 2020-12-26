import React, { Component } from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
  Text,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Header from "./components/Header";

export class App extends Component {
  constructor() {
    super();
    this.state = {
      text: "",
      isSearchPressed: false,
      word: "",
      wordType: "",
      description: "",
    };
  }

  getWordData = async (word) => {
    var searchedWord = word.toLowerCase();
    var url = `https://rupinwhitehatjr.github.io/dictionary/${searchedWord}.json`;
    await fetch(url)
      .then((data) => {
        if (data.status === 200) {
          return data.json();
        } else {
          return null;
        }
      })
      .then((response) => {
        if (response) {
          this.setState({
            word: this.state.text,
            wordType: response.definitions[0].wordtype,
            description: response.definitions[0].description,
          });
        } else {
          this.setState({
            word: this.state.text,
            description: "No Data Found",
          });
        }
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Header />
        </View>
        <View style={styles.searchAndInput}>
          <TextInput
            value={this.state.text}
            onChangeText={(text) => {
              this.setState({
                text: text,
                isSearchPressed: false,
                word: "Loading...",
                wordType: "",
                description: "",
              });
            }}
            style={styles.TextInput}
          />

          <TouchableOpacity
            onPress={() => {
              if (this.state.text === "") {
                alert("Please Write a meaningful word in the Input Box");
              } else {
                this.setState({ isSearchPressed: true });
                this.getWordData(this.state.text);
              }
            }}
            style={styles.searchButton}
          >
            <Icon name="search" size={28} color="#000" />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 18, color: "#D9B002" }}>Word : </Text>
          <Text style={{ fontSize: 17 }}>{this.state.word}</Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 18, color: "#D9B002" }}>Type : </Text>
          <Text style={{ fontSize: 17 }}>{this.state.wordType}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Text style={{ fontSize: 18, color: "#D9B002" }}>Definition : </Text>
          <Text style={{ fontSize: 17 }}>{this.state.description}</Text>
        </View>
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchAndInput: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
  },
  TextInput: {
    borderWidth: 1,
    borderColor: "black",
    width: "70%",
    textAlign: "center",
    borderRadius: 5,
  },
  searchButton: {
    margin: 20,
  },
});
