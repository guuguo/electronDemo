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
    View,
    Button,
    Image,
    ListView,
    ToastAndroid, log
} from 'react-native';
// import { Card } from 'react-native-material-design';
import NetUtil from './NetUtil.js'
// import Icon from 'react-native-vector-icons/dist/FontAwesome';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const gankType = {
    FuLi: "福利",
    Android: "Android",
    iOS: "iOS",
    rest: "休息视频",
    wxpand: "拓展资源",
    front: "前端",
    all: "all"
}
export default class App extends Component<{}> {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds,
            data: [],
            btnStr: "加载"
        }
        this.getGanks()
    }

    renderRow(rowData, rowId) {
        return (
            <View style={{alignItems: 'center', justifyContent: 'center', height: 220}}>
                <View style={{height: 1, position: 'absolute', top: 0, right: 0, left: 0, backgroundColor: 'black'}}/>
                <Image style={{position: 'absolute', left: 0, top: 1, bottom: 0, right: 0}}
                       source={{uri: rowData.url}}/>
                <View style={{
                    position: 'absolute',
                    left: 0,
                    top: 1,
                    bottom: 0,
                    right: 0,
                    backgroundColor: 'rgba(0,0,0,0.15)'
                }}/>
                <Text style={{
                    left: 0,
                    top: 0,
                    color: 'white',
                    fontSize: 33,
                    fontWeight: 'weight'
                }}>{rowData.who + '☼'}</Text>
            </View>
        )
    }

    render() {
        return (

            <View style={styles.container}>
                {/*<Button value={this.state.btnStr} onPress={()=> this.getGanks()} />*/}
                {/*<Button title={this.state.btnStr} style={{width: 60, margin: 40}} onPress={() => this.getGanks()}/>*/}
                <ListView
                    dataSource={this.state.dataSource.cloneWithRows(this.state.data)}
                    renderRow={(rowData, sectionId, rowId) => this.renderRow(rowData, rowId)}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        );
    }

    getGanks() {
        var p1 = this.getApiGanks(gankType.FuLi)
        var p2 = this.getApiGanks(gankType.rest)
        Promise.all([p1, p2])
            .then(
                lists => {
                    var list1 = JSON.parse(lists[0]).results
                    var list2 = JSON.parse(lists[1]).results
                    var listRes = []
                    list1.forEach((v, i) => {
                        var p2Bean = list2[i];
                        v.desc = p2Bean.desc;
                        v.who = p2Bean.who
                        listRes.push(v)
                    })
                })
            // .then(
            //     lists =>
            //         lists[0].map(v, i => {
            //             var p2Bean = lists[1][i];
            //             v.desc = p2Bean.desc;
            //             v.who = p2Bean.who
            //         }))
            .then(
                list => this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(list),
                    data: list,
                    btnStr: '完成'
                }))
            .done()
    }

    getApiGanks(type) {
        return NetUtil.get('http://gank.io/api/data/' + type + '/20/1')
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
        alignItems: 'stretch',
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
