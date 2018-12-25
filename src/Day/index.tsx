import React, {Component} from "react";
import {Button, FlatList, StyleSheet, Text, View} from "react-native";
import {showCreateTaskScreen} from "../utils";
import DailyItemOverview from "./DailyItemOverview";
import DaySlider from "./DaySlider";
import {ApplicationState, DailyItem, Day} from "../state/types";
import {connect} from "react-redux";
import {getDays, selectedTasks, weekDate, weekNumber} from "../state/selectors";
import {moveWeekBackward, moveWeekForward, removeItem, selectDay, toggleItem} from "../state/actions";

interface Props {
  componentId: string;
  weekDate: string;
  weekNumber: number;
  days: Day[];
  tasks: DailyItem[];
  removeItem: Function;
  selectDay: Function;
  toggleItem: Function;
}

class DayOverview extends Component<Props> {
  createNewItem = () => showCreateTaskScreen();

  onRemove = (item: DailyItem) => this.props.removeItem(item.id);

  onDone = (item: DailyItem) => this.props.toggleItem(item.id, "isDone");

  onDayChange = (day: Day) => this.props.selectDay(day.key);

  render() {
    return (
      <View testID="MainPage" style={styles.container}>
        <DaySlider
          days={this.props.days} onDayChange={this.onDayChange}
          onMoveWeekLeft={this.props.moveWeekBackward}
          onMoveWeekRight={this.props.moveWeekForward}
          title={`${this.props.weekDate} - Week ${this.props.weekNumber}`}
        />
        <FlatList
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <DailyItemOverview
              item={item}
              onRemove={this.onRemove}
              onDone={this.onDone}
            />
          )}
          data={this.props.tasks}
          ListEmptyComponent={() => <Text style={styles.emptyPageText}>Click 'Add' to add tasks to this day</Text>}
          ItemSeparatorComponent={() => <View style={styles.separator}/>}
        />
        <View style={styles.onPress}>
          <Button testID="AddTask" onPress={this.createNewItem} title="Add"/>
        </View>
      </View>
    );
  }
}

const mapState = (state: ApplicationState) => ({
  tasks: selectedTasks(state),
  days: getDays(state),
  weekNumber: weekNumber(state),
  weekDate: weekDate(state),
});

const mapActions = {
  selectDay,
  removeItem,
  toggleItem,
  moveWeekForward,
  moveWeekBackward,
};

export default connect(
  mapState,
  mapActions
)(DayOverview);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    paddingTop: 15,
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
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "gray",
    marginLeft: 10,
    marginRight: 10
  },
  emptyPageText: {
    color: 'gray',
    textAlign: 'center'
  }
});
