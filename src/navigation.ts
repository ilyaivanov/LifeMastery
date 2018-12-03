import { Navigation } from "react-native-navigation";
import Index from "./Day";
import CreateTask from "./createTask";
import { DailyItem } from "./types";

export const showCreateTaskScreen = (): Promise<DailyItem> => {
  return new Promise<DailyItem>((resolve) => {
    const modalId = "CreateItemModal";
    Navigation.showModal({
      component: {
        id: modalId,
        name: screens.createTask,
        passProps: {
          onDone: (item: DailyItem) => {
            Navigation.dismissModal(modalId);
            resolve(item);
          },
          onCancel: () => {
            Navigation.dismissModal(modalId);
          }
        }
      }
    });
  });
};

export const goBack = (id: string) => {
  Navigation.pop(id);
};

export const registerScreens = () => {
  Navigation.registerComponent(screens.firstScreen, () => Index);
  Navigation.registerComponent(screens.createTask, () => CreateTask);
};

export const screens = {
  firstScreen: `navigation.playground.WelcomeScreen`,
  createTask: `navigation.playground.CreateTask`
};
