import React, {Component} from "react";
import {Button, DatePickerIOS, Text, TextInput, View} from "react-native";
import {testIds} from "../utils";
import moment from "moment";
import {connect} from "react-redux";
import {addNewTask} from "../state/actions";

interface Props {
  onDone: () => void;
  onCancel: () => void;
  addNewTask: Function;
}

class CreateTaskModal extends Component<Props> {
  state = {
    text: "",
    chosenDate: new Date()
  };

  onDone = () => {
    this.props.addNewTask({
      title: this.state.text,
      date: moment(this.state.chosenDate)
    });
    this.props.onDone();
  };

  setDate = (newDate: Date) => {
    this.setState({chosenDate: newDate});
  };

  render() {
    return (
      <View testID="TasksModal" style={{padding: 10, paddingTop: 50}}>
        <Text>Title:</Text>
        <TextInput
          testID={testIds.textInput}
          onChangeText={text => this.setState({text})}
          placeholder="Enter your task title"
          value={this.state.text}
        />
        <Text style={{paddingTop: 20}}>Date:</Text>
        <DatePickerIOS
          minuteInterval={5}
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

const mapActions = {
  addNewTask
};

export default connect(undefined, mapActions)(CreateTaskModal);
