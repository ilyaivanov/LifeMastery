import { Navigation } from "react-native-navigation";
import Index from "./Day";
import CreateTask from "./createTask";
import { createMyStore, Provider } from "./state/store";
import { DailyItem } from "./state/types";

export const showCreateTaskScreen = (): Promise<DailyItem> => {
  return new Promise<DailyItem>(resolve => {
    const modalId = "CreateItemModal";
    Navigation.showModal({
      component: {
        id: modalId,
        name: screens.createTask,
        passProps: {
          onDone: () => {
            Navigation.dismissModal(modalId);
            resolve();
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

const store = createMyStore();

export const registerScreens = () => {
  Navigation.registerComponentWithRedux(
    screens.firstScreen,
    () => Index,
    Provider,
    store
  );
  Navigation.registerComponentWithRedux(
    screens.createTask,
    () => CreateTask,
    Provider,
    store
  );
};

export const screens = {
  firstScreen: `navigation.playground.WelcomeScreen`,
  createTask: `navigation.playground.CreateTask`
};
