import { Navigation } from "react-native-navigation";
import { registerScreens, screens } from './src/navigation';


registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
            stack: {
                id:'MyStack',
                children: [
                    {
                        component: {
                            name: screens.firstScreen,
                            options: {
                                topBar: {
                                  title: {
                                    text: 'Life Mastery'
                                  }
                                }
                              }
                        }
                    },
                ],
            }
        }
    });
});
