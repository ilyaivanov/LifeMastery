import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Day } from "../state/types";

interface Props {
  days: Day[];
  onDayChange: (day: Day) => void;
}

export default class DaySlider extends React.Component<Props> {
  selectDay = (day: Day) => {
    this.props.onDayChange(day);
  };

  render() {
    return (
      <View>
        <Text
          style={{
            paddingTop: 5,
            fontWeight: "bold",
            paddingBottom: 5,
            textAlign: "center",
            fontSize: 16
          }}
        >
          2018 December - Week 55
        </Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => 42}>
            <Text style={styles.button}>{"<"}</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", flex: 1 }}>
            {this.props.days.map(d => (
              <DayView key={d.key} day={d} onPress={this.selectDay} />
            ))}
          </View>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => 42}>
            <Text style={styles.button}>{">"}</Text>
          </TouchableOpacity>
        </View>
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
    testID={day.day}
    onPress={() => onPress(day)}
    style={[styles.titleContainer, day.isSelected && styles.selectedDay]}
  >
    <Text style={styles.dayOfWeek}>{day.dayOfWeek}</Text>
    <Text style={styles.date}>{day.dayOfMonth}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  selectedDay: {
    backgroundColor: "#e2e2e2",
    borderRadius: 50
  },
  dayOfWeek: {
    fontSize: 12,
    textTransform: "uppercase",
    color: "gray"
  },
  date: {
    fontSize: 22,
    lineHeight: 24
  },
  titleContainer: {
    padding: 2,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  separator: {
    width: StyleSheet.hairlineWidth,
    backgroundColor: "grey",
    marginTop: 10,
    marginBottom: 10
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 20
  },
  button: {
    fontSize: 23,
    fontWeight: "bold",
    lineHeight: 23
  }
});
