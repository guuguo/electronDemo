/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    Button,
    View,
    ToastAndroid
} from 'react-native';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class App extends Component<{}> {
    constructor(height, width) {
        super();
        // this.getGanks()
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    你好啊!
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit App.js
                </Text>
                <Text style={styles.instructions}>
                    {instructions}
                </Text>
                <Button title="天气" onPress={(s)=>ToastAndroid.show(s.title, ToastAndroid.LONG)
                }/>
            </View>
        );
    }

    getGanks() {
        // this.login(str =>
        // this.setState({
        //     toastMessage: "厉害的",
        //     open: true,
        // })//)
    }

    _handleRequestClose() {
        this.setState({
            open: false,
        });
    };

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
