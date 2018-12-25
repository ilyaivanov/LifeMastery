import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { DailyItem } from "../state/types";

interface Props {
  item: DailyItem;
  onRemove: (item: DailyItem) => void;
  onDone: (item: DailyItem) => void;
}

export default class DailyItemOverview extends React.PureComponent<Props> {
  render() {
    const props = this.props;
    return (
      <View style={[s.container, props.item.isDone && s.doneContainer]}>
        <Text style={[s.title, props.item.isDone && s.done]}>
          {props.item.title}
        </Text>
        <View style={s.buttonsContainer}>
          <Text style={s.time}>{props.item.dailyTime}</Text>
          <View style={s.buttonsGroup}>
            <Button
              title="Remove"
              color="red"
              onPress={() => this.props.onRemove(this.props.item)}
            />
            <Button
              title={props.item.isDone ? "Undone" : "Done"}
              onPress={() => this.props.onDone(this.props.item)}
            />
          </View>
        </View>
      </View>
    );
  }
}

const s = StyleSheet.create({
  container: {
    padding: 10,
    paddingBottom: 4
  },
  doneContainer: {
    backgroundColor: "#32e980"
  },
  title: {
    paddingBottom: 5,
    fontSize: 21,
    fontWeight: "bold"
  },
  time: {
    fontSize: 18
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  buttonsGroup: {
    flexDirection: "row"
  },
  done: {
    textDecorationLine: "line-through"
  }
});
