import React, {Component} from 'react';
import {View, Text, StatusBar, ToastAndroid} from 'react-native';
// import {createStore, applyMiddleware, combineReducers} from 'redux';
import {ScreenStack,Tabs} from './router.js';

export default class MainScreen extends Component<{}> {

    render() {
        return (
            <View
                style={{flex: 1}}>
                <StatusBar backgroundColor="#393B40"
                           barStyle="light-content"/>
                <ScreenStack/>
            </View>
        );
    }
}