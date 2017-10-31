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
    ToastAndroid,
    RefreshControl
} from 'react-native';
// import { Card } from 'react-native-material-design';
import NetUtil from './NetUtil.js'
// import LoadMoreFooter from './LoadMoreFooter.js'

// import Icon from 'react-native-vector-icons/dist/FontAwesome';

const gankType = {
    FuLi: "福利",
    Android: "Android",
    iOS: "iOS",
    rest: "休息视频",
    wxpand: "拓展资源",
    front: "前端",
    all: "all"
}
const datePattern = '2005-12-15T09:41:30.217Z'

export default class App extends Component<{}> {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            page: 1,
            dataSource: ds,
            data: [],
            btnStr: "加载"
        }
        this.setState.page = 1;
        this.getGanks(this.setState.page)
    }

    parseMyDate(str) {
        var st = "2005-12-15T09:41:30.217Z";
        var pattern = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).(\d{3})Z/;
        return str.replace(pattern, '$1/$2/$3 $4:$5:$6')
    }

    getTimeSpan(timeStamp): String {
        var timeSpan = new Date().getTime() - timeStamp
        timeSpan = timeSpan / 1000
        timeSpan = parseInt(timeSpan)
        if (timeSpan < 60)
            return timeSpan.toString() + "秒前"
        timeSpan /= 60
        timeSpan = parseInt(timeSpan)
        if (timeSpan < 60) {
            return timeSpan.toString() + "分钟前"
        }
        timeSpan /= 60
        timeSpan = parseInt(timeSpan)
        if (timeSpan < 24) {
            return timeSpan.toString() + "小时前"
        }
        timeSpan /= 24
        timeSpan = parseInt(timeSpan)
        if (timeSpan < 30) {
            return timeSpan.toString() + "天前"
        }
        timeSpan = timeSpan / 30.42
        timeSpan = parseInt(timeSpan)
        if (timeSpan < 12) {
            return timeSpan.toString() + "月前"
        }
        timeSpan /= 12
        timeSpan = parseInt(timeSpan)
        return timeSpan.toString() + "年前"
    }

    renderRow(rowData, rowId) {
        return (
            <View style={{alignItems: 'center', justifyContent: 'center', height: 220}}>
                <View style={{height: 1, position: 'absolute', top: 0, right: 0, left: 0, backgroundColor: 'black'}}/>
                <Image style={{position: 'absolute', left: 0, top: 1, bottom: 0, right: 0}}
                       source={{uri: rowData.url}}/>
                <View style={{
                    position: 'absolute', left: 0, right: 0, bottom: 0, top: 1, backgroundColor: 'rgba(0,0,0,0.15)'
                }}/>
                <Text style={{
                    color: 'white', fontSize: 27, fontWeight: 'bold'
                }}>{rowData.who + ' • ' + this.getTimeSpan(new Date(this.parseMyDate(rowData.publishedAt)).getTime())}</Text>
                <Text style={{
                    margin: 10, color: 'white', fontSize: 16
                }}>{rowData.desc}</Text>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource.cloneWithRows(this.state.data)}
                    renderRow={(rowData, sectionId, rowId) => this.renderRow(rowData, rowId)}
                    showsVerticalScrollIndicator={false}
                    enableEmptySections={true}
                    onEndReached={this._toEnd.bind(this)}
                    onEndReachedThreshold={20}
                    /* refreshControl={
                         <RefreshControl
                             refreshing={ reducer.isRefreshing }
                             onRefresh={ this._onRefresh.bind(this) }
                             tintColor="gray"
                             colors={['#ff0000', '#00ff00', '#0000ff']}
                             progressBackgroundColor="gray"/>
                     }*//>
                />
            </View>
        );
    }


    _toEnd() {
        ToastAndroid.show('到底部了', ToastAndroid.SHORT)
        this.setState.page++;
        this.getGanks(this.setState.page)
    }

    getGanks(page) {
        var p1 = this.getApiGanks(gankType.FuLi, page)
        var p2 = this.getApiGanks(gankType.rest, page)
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
                    return list1
                })
            .then(
                list => {
                    if (page === 1)
                        this.setState.data = [];
                    var tempList=this.state.data.concat(list);
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(tempList),
                        data: tempList,
                    })
                })
            .done()
    }

    getApiGanks(type, page) {
        return NetUtil.get('http://gank.io/api/data/' + type + '/20/' + page)
    }

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