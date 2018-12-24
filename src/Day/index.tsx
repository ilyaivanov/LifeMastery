import React, { Component } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { DailyItem } from "../types";
import { showCreateTaskScreen } from "../utils";
import DailyItemOverview from "./DailyItemOverview";
import _ from "lodash";
import DaySlider from "./DaySlider";
import { days, tasksPerDay } from "../state/tasks";
import { Day } from "../state/types";

interface Props {
  componentId: string;
}

interface State {
  tasks: DailyItem[];
}

export default class Index extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const selectedDay = days.find(d => !!d.isSelected);
    if (!selectedDay) throw new Error("No selected day");

    this.state = {
      tasks: tasksPerDay[selectedDay.day]
    };
  }

  createNewItem = () => {
    //TODO: state management is coming. Unit testing will deeply depend upon the way we manage state
    showCreateTaskScreen().then((task: DailyItem) => {
      const items = this.state.tasks as DailyItem[];
      items.push(task);
      const ordered = _.orderBy(items, i => i.time);
      this.setState({ tasks: ordered });
    });
  };

  onItemAction = (action: string, item: DailyItem) => {
    if (action === "done") {
      const newTasks = this.state.tasks.map(t =>
        t.id === item.id
          ? {
              ...item,
              isDone: !t.isDone,
              isFailed: false
            }
          : t
      );
      this.setState({ tasks: newTasks });
    } else if (action === "remove") {
      const newTasks = this.state.tasks.filter(t => t.id !== item.id);
      this.setState({ tasks: newTasks });
    } else if (action === "fail") {
      const newTasks = this.state.tasks.map(t =>
        t.id === item.id
          ? {
              ...item,
              isFailed: !t.isFailed,
              isDone: false
            }
          : t
      );
      this.setState({ tasks: newTasks });
    }
  };

  clear = () => {
    this.setState({ tasks: [] });
  };

  onDayChange = (day: Day) => {
    this.setState({
      tasks: tasksPerDay[day.day]
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <DaySlider onDayChange={this.onDayChange} />
        <Text>When changin days default tasks are being loaded</Text>
        <FlatList
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <DailyItemOverview item={item} onItemAction={this.onItemAction} />
          )}
          data={this.state.tasks}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
        <View style={styles.onPress}>
          <Button testID="Clear" onPress={this.clear} title="Clear" />
          <Button testID="GoNext" onPress={this.createNewItem} title="Add" />
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
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    justifyContent: "center",
    flexDirection: "row"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "gray",
    marginLeft: 10,
    marginRight: 10
  }
});
