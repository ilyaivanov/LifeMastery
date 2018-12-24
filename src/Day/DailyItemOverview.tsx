import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { DailyItem } from "../types";

interface Props {
  item: DailyItem;
  onRemove: (item: DailyItem) => void;
}

export default class DailyItemOverview extends React.PureComponent<Props> {
  render() {
    const props = this.props;
    return (
      <View
        style={[
          s.container,
          props.item.isDone && s.doneContainer,
          props.item.isFailed && s.failContainer
        ]}
      >
        <Text
          style={[
            s.title,
            props.item.isDone && s.done,
            props.item.isFailed && s.fail
          ]}
        >
          {props.item.title}
        </Text>
        <Text style={s.time}>{props.item.dailyTime}</Text>
        <View style={s.buttonsContainer}>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <Button title="Remove" color="red" onPress={() => this.props.onRemove(this.props.item)} />
            <Button
              title={props.item.isFailed ? "Unfail" : "Fail"}
              onPress={() => 42}
            />
            <Button title="Edit" onPress={() => 42} />
          </View>
          <View>
            <Button
              title={props.item.isDone ? "Undone" : "Done"}
              onPress={() => 42}
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
  failContainer: {
    backgroundColor: "#ffc5b7"
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
    marginLeft: -8,
    marginRight: -8,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  done: {
    textDecorationLine: "line-through"
  },
  fail: {
    fontStyle: "italic"
  }
});
