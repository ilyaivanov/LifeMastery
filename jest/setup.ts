import {View} from "react-native";

jest.mock('../src/navigation', () => ({
  showCreateTaskScreen: jest.fn()
}));

jest.mock('requireNativeComponent', () => () => View);
