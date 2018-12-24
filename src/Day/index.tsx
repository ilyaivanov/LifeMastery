import React, {Component} from "react";
import {Button, FlatList, StyleSheet, Text, View} from "react-native";
import {DailyItem} from "../types";
import {showCreateTaskScreen} from "../utils";
import DailyItemOverview from "./DailyItemOverview";
import DaySlider from "./DaySlider";
import {ApplicationState, Day} from "../state/types";
import {connect} from "react-redux";
import {getDays, selectedTasks} from "../state/selectors";
import {removeItem, selectDay} from "../state/actions";

interface Props {
  componentId: string;
  label: string;
  tasks: DailyItem[];
}

class DayOverview extends Component<Props> {
  createNewItem = () =>
    showCreateTaskScreen()

  onRemove = (item: DailyItem) =>
    this.props.removeItem(item.id);

  onDayChange = (day: Day) =>
    this.props.selectDay(day.day);

  render() {
    return (
      <View style={styles.container}>
        <DaySlider days={this.props.days} onDayChange={this.onDayChange}/>
        <Text>{this.props.label}</Text>
        <FlatList
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <DailyItemOverview item={item} onRemove={this.onRemove}/>
          )}
          data={this.props.tasks}
          ItemSeparatorComponent={() => <View style={styles.separator}/>}
        />
        <View style={styles.onPress}>
          <Button onPress={this.createNewItem} title="Add"/>
        </View>
      </View>
    );
  }
}

const mapState = (state: ApplicationState) => ({
  label: state.label,
  tasks: selectedTasks(state),
  days: getDays(state),
});

const mapActions = {
  selectDay,
  removeItem
};

export default connect(mapState, mapActions)(DayOverview);

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
