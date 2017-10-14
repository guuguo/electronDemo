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
    Image,
    ListView,
    ToastAndroid
} from 'react-native';

import NetUtil from './NetUtil.js'

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds,
            data: [],
            btnStr: "加载"
        }
    }

    renderRow(rowData, rowId) {
        return (
            <View>
                {/*<Image style={{height: 100}}*/}
                {/*source={{uri: rowData.images[0]}}/>*/}
                <Text>{rowData.desc + '  ' + rowData.who}</Text>
            </View>
        )
    }

    render() {
        return (

            <View style={styles.container}>
                <Button  title={this.state.btnStr} style={{width:60,marginTop: 40}} onPress={() => this.getGanks()}/>
                <ListView style={{marginTop: 20}}
                          dataSource={this.state.dataSource.cloneWithRows(this.state.data)}
                          renderRow={(rowData, sectionId, rowId) => this.renderRow(rowData, rowId)}
                          showsVerticalScrollIndicator={false}
                />
            </View>
        );
    }

    getGanks() {
        NetUtil.get('http://gank.io/api/data/Android/10/1', obj => this.setState({
            dataSource: this.state.dataSource.cloneWithRows(obj.results),
            data: obj.results,
            btnStr: '完成'
        }))
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
