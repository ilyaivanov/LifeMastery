import React from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Day } from "../state/types";

interface Props {
  onDayChange: (day: Day) => void;
}

export default class DaySlider extends React.Component<Props> {
  state = {
    days: [
      { day: "Mon" },
      { day: "Tue" },
      { day: "Wed" },
      { day: "Thu", isSelected: true },
      { day: "Fri" },
      { day: "Sat" },
      { day: "Sun" }
    ]
  };

  selectDay = (day: Day) => {
    const days: Day[] = this.state.days.map(d => ({
      ...d,
      isSelected: d.day === day.day
    }));
    this.setState({ days });
    this.props.onDayChange(day);
  };

  render() {
    return (
      <View style={{ height: 90 }}>
        <FlatList
          data={this.state.days}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => (
            <DayView day={item} onPress={this.selectDay} />
          )}
          keyExtractor={item => item.day}
          horizontal
        />
      </View>
    );
  }
}

interface DayProps {
  day: Day;
  onPress: (day: Day) => void;
}

const DayView = ({ day, onPress }: DayProps) => (
  <TouchableOpacity
    onPress={() => onPress(day)}
    style={[styles.titleContainer]}
  >
    <Text style={[styles.title, day.isSelected && styles.selectedDay]}>
      {day.day}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  title: {
    fontSize: 23
  },
  titleContainer: {
    height: 90,
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("window").width / 5
  },
  selectedDay: {
    fontWeight: "bold",
    fontSize: 25
  },
  separator: {
    width: StyleSheet.hairlineWidth,
    backgroundColor: "grey",
    marginTop: 15,
    marginBottom: 15
  }
});
