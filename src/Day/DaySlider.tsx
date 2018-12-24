import React from "react";
import {Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Day} from "../state/types";

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
      <View style={{height: 90}}>
        <FlatList
          data={this.props.days}
          ItemSeparatorComponent={() => <View style={styles.separator}/>}
          renderItem={({item}) => (
            <DayView day={item} onPress={this.selectDay}/>
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

const DayView = ({day, onPress}: DayProps) => (
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
