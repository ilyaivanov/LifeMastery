import React from "react";
import {Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Day} from "../state/types";

interface Props {
  days: Day[];
  onDayChange: (day: Day) => void;
}

type Predicate<T> = (item: T) => boolean;

export default class DaySlider extends React.Component<Props> {
  selectDay = (day: Day) => {
    this.scrollToDay(day);
    this.props.onDayChange(day);
  };

  // @ts-ignore
  list: FlatList<Day>;

  scrollToDay = (day: Day) =>
    this.scrollTo(d => d.key === day.key);


  scrollTo = (predicate: Predicate<Day>) =>
    this.list.scrollToIndex({index: this.getCenteredIndex(predicate)});


  getCenteredIndex = (predicate: Predicate<Day>) =>
    Math.max(this.props.days.findIndex(predicate) - 2, 0);


  render() {
    return (
      <View>
        <FlatList
          ref={(ref: any) => this.list = ref}
          initialScrollIndex={this.getCenteredIndex(d => !!d.isSelected)}
          data={this.props.days}
          ItemSeparatorComponent={() => <View style={styles.separator}/>}
          renderItem={({item}) => (
            <DayView day={item} onPress={this.selectDay}/>
          )}
          keyExtractor={item => item.key}
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
    testID={day.day}
    onPress={() => onPress(day)}
    style={[styles.titleContainer]}
  >
    <Text style={[styles.title, day.isSelected && styles.selectedDay]}>
      {day.dayOfWeek}
    </Text>
    <Text style={styles.date}>
      {day.dayOfMonth} {day.month}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  title: {
    fontSize: 23
  },
  date: {
    fontSize: 16,
    color: 'gray'
  },
  titleContainer: {
    paddingTop: 5,
    paddingBottom: 5,
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
    marginTop: 10,
    marginBottom: 10,
  }
});
