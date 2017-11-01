/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default class gankDailyScreen extends Component<{}> {


    constructor(props) {
        super(props);
        this.loadMoreEnd = false;
        this.page = 1;
        this.state = {
            data: [],
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{fontSize: 27, fontWeight: 'bold', textAlign: 'center'}}> {'今日'}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#f2f2f2',
    },
});