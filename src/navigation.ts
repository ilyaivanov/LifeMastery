import { Navigation } from "react-native-navigation";
import App, { SecondScreen } from "./App";

export const showSecondScreen = (id:string) => {
    Navigation.push(id, {
        component: {
            name: screens.seondScreen,
            options: {
                topBar: {
                    title: {
                        text: 'Pushed screen title'
                    }
                }
            }
        }
    })
}

export const goBack = (id:string) => {
    Navigation.pop(id);
}


export const registerScreens = () => {
    Navigation.registerComponent(screens.firstScreen, () => App);
    Navigation.registerComponent(screens.seondScreen, () => SecondScreen);

}

export const screens = {
    firstScreen: `navigation.playground.WelcomeScreen`,
    seondScreen: `navigation.playground.SecondScreen`,
}