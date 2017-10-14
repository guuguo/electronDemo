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

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
const users = [
    {username: 'Jerry', age: 21, gender: 'male'},
    {username: 'Tomy', age: 22, gender: 'male'},
    {username: 'Lily', age: 19, gender: 'female'},
    {username: 'Lucy', age: 20, gender: 'female'}
]

export default class App extends Component<{}> {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds,
            data: users
        }
    }

    renderRow(rowData, rowId) {
        return (
            <View>
                <Image style={{height: 100}}
                       source={{uri: 'https://3-im.guokr.com/K1PDb1grObTa5cJGixvYJ5ZZaNICouqSBceOuiY7wQXtAAAAewAAAFBO.png'}}/>
                <Text>{rowData.username + '  ' + rowId}</Text>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView style={{marginTop: 20}}
                          dataSource={this.state.dataSource.cloneWithRows(this.state.data)}
                          renderRow={(rowData, sectionId, rowId) => this.renderRow(rowData, rowId)}
                          showsVerticalScrollIndicator={false}
                />
                <Button title="天气" onPress={(s) => ToastAndroid.show(s.title, ToastAndroid.LONG)
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
