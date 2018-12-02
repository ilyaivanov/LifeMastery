import React, { Component } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { showSecondScreen, goBack } from "./navigation";

interface Props {
  componentId: string
}

export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text testID="PageTitle" style={styles.welcome}>First Screen</Text>
        <Button testID="GoNext" onPress={() => showSecondScreen(this.props.componentId)} title="Go next!" />
      </View>
    );
  }
}

export class SecondScreen extends Component<Props> {
  render() {
    return (
      <View style={[styles.container, { backgroundColor: 'grey' }]}>
        <Text testID="PageTitle" style={styles.welcome}>Second Screen</Text>
        <Button testID="GoBack" onPress={() => goBack(this.props.componentId)} title="Go back!" />
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
});
