/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, {Component} from 'react';
import {
    StackNavigator
} from 'react-navigation';
const BasicApp = StackNavigator({
    Main: {screen: MainScreen},
    Profile: {screen: ProfileScreen},
});
// import { Card } from 'react-native-material-design';
import GankListComponent from './gankListScreen.js'

export default class Index extends Component<{}> {
    render() {

        let defaultName = '干货列表';
        let defaultComponent = GankListComponent;

        return (
            <Navigator
                initialRoute={{ name: defaultName, component: defaultComponent }}
                configureScene={(route) => {
                    return Navigator.SceneConfigs.FloatFromRight;
                }}
                renderScene={(route, navigator) => {
                    let Component = route.component;
                    return <Component {...route.params} navigator={navigator} />
                }}/>
        );
    }
}
