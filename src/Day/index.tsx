import React, {Component} from "react";
import {Button, FlatList, StyleSheet, View} from "react-native";
import {DailyItem} from "../types";
import {generateId, showCreateTaskScreen, createTask, fromTime} from "../utils";
import DailyItemOverview from "./DailyItemOverview";

interface Props {
  componentId: string
}

interface State {
  tasks: DailyItem[]
}

const initialTasks: DailyItem[] = [
  createTask('My Task Description 1', fromTime('12:30')),
  createTask('My Task Description 2', fromTime('13:30')),
  createTask('My Task Description 3', fromTime('14:30')),
  createTask('My Task Description 4', fromTime('15:30')),
];

export default class Index extends Component<Props, State> {
  state = {
    tasks: initialTasks
  };

  createNewItem = () => {
    showCreateTaskScreen()
      .then((task: DailyItem) => {
        const items = this.state.tasks as DailyItem[];
        items.push(task);
        this.setState({tasks: items})
      })
  };

  onItemAction = (action: string, item: DailyItem) => {
    if (action === 'done') {
      const newTasks = this.state.tasks.map(t => t.id === item.id ? ({...item, isDone: !t.isDone, isFailed: false}) : t);
      this.setState({tasks: newTasks});
    } else if (action === 'remove') {
      const newTasks = this.state.tasks.filter(t => t.id !== item.id);
      this.setState({tasks: newTasks});
    } else if (action === 'fail') {
      const newTasks = this.state.tasks.map(t => t.id === item.id ? ({...item, isFailed: !t.isFailed, isDone: false}) : t);
      this.setState({tasks: newTasks});
    }
  };

  clear = () => {
    this.setState({tasks: []})
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={(item) => item.id}
          renderItem={({item}) => <DailyItemOverview item={item} onItemAction={this.onItemAction}/>}
          data={this.state.tasks}
          ItemSeparatorComponent={() => <View style={{height: StyleSheet.hairlineWidth, backgroundColor: 'gray'}}/>}
        />
        <View style={styles.onPress}>
          <Button testID="Clear" onPress={this.clear} title="Clear"/>
          <Button testID="GoNext" onPress={this.createNewItem} title="Add"/>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  onPress: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
});
