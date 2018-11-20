import React, { Component } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

interface State {
  counts: number;
}

export default class App extends Component<any, State> {
  state = {
    counts: 0
  };

  increment = () => {
    this.setState(s => ({ counts: s.counts + 1 }));
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions} testID="countLabel">{this.state.counts}</Text>
        <Button testID="incrementButton" onPress={this.increment} title="Increment" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
