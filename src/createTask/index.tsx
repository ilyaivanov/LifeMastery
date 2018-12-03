import React, {Component} from "react";
import {Button, DatePickerIOS, Text, TextInput, View} from "react-native";
import {DailyItem} from "../types";
import {createTask, testIds} from "../utils";
import moment from "moment";

interface Props {
  onDone: (item: DailyItem) => void;
  onCancel: () => void;
}

export default class App extends Component<Props> {
  state = {
    text: "",
    chosenDate: new Date()
  };

  onDone = () => {
    this.props.onDone(createTask(this.state.text, moment(this.state.chosenDate)));
  };

  setDate = (newDate: Date) => {
    this.setState({chosenDate: newDate});
  };

  render() {
    return (
      <View style={{padding: 10, paddingTop: 50}}>
        <Text>Title:</Text>
        <TextInput
          testID={testIds.textInput}
          onChangeText={text => this.setState({text})}
          placeholder="Enter your task title"
          value={this.state.text}
        />
        <Text style={{paddingTop: 20}}>Date:</Text>
        <DatePickerIOS
          testID="CreateTask.DateInputiOS"
          mode="time"
          date={this.state.chosenDate}
          onDateChange={this.setDate}
        />
        <Button
          onPress={this.props.onCancel}
          title="Cancel"
          testID="OnCancel"
        />
        <Button onPress={this.onDone} title="Done" testID="OnDone"/>
      </View>
    );
  }
}
