import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";

export default class Header extends Component {
  render() {
    return (
      <View style={styles.header}>
        <Text style={{ fontSize: 19, color: "#ffffff" }}>
          Pocket Dictionary Online
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#81007E",
    padding: 25,
    marginTop: 10,
  },
});
