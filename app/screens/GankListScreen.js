/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    PixelRatio,
    View,
    Image,
    TouchableOpacity,
    ListView,
} from 'react-native';
import {Divider} from 'react-native-elements'

// import { Card } from 'react-native-material-design';
import LoadMoreFooter from '../components/loadMoreFooter.js'
import NetUtil from "../utils/NetUtil";
import StringUtil from "../utils/StringUtil";
import {Icon} from 'react-native-elements'


const gankType = {
    FuLi: "福利",
    Android: "Android",
    iOS: "iOS",
    rest: "休息视频",
    expand: "拓展资源",
    front: "前端",
    all: "all"
};
const FETCH_COUNT = 20;
const onePx = 1 / PixelRatio.get()

export default class gankListScreen extends Component<{}> {


    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.loadMoreEnd = false;
        this.page = 1;
        this.state = {
            dataSource: ds,
            data: [],
        };
        this._getGanks(this.page)
    }

    renderRow(rowData, rowId) {
        return (
            <TouchableOpacity activeOpacity={1} style={{alignItems: 'center', justifyContent: 'center', height: 220}}
                              onPress={() => {
                                  this.props.navigation.navigate('GankDaily', {gankBean: rowData})
                              }}>
                <View style={{
                    height: onePx, position: 'absolute', bottom: 0, right: 0, left: 0, backgroundColor: 'black'
                }}/>

                <Image style={{position: 'absolute', left: 0, top: 0, bottom: onePx, right: 0}}
                       source={{uri: rowData.url}}/>
                <View style={{
                    position: 'absolute', left: 0, right: 0, bottom: onePx, top: 0, backgroundColor: 'rgba(0,0,0,0.15)'
                }}/>
                <Text style={{
                    color: 'white', fontSize: 27, fontWeight: 'bold', textAlign: 'center'
                }}>{rowData.who + ' • ' + StringUtil.getPublishedTimeSpan(rowData.publishedAt)}</Text>
                <Text style={{
                    margin: 10, color: 'white', fontSize: 16, textAlign: 'center'
                }}>{rowData.desc}</Text>
            </TouchableOpacity>
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
                    renderFooter={this._renderFooter.bind(this)}
                />
            </View>
        );
    }

    _toEnd() {
        this.page++;
        this._getGanks(this.page)
    }

    _renderFooter() {
        return <LoadMoreFooter isLoadAll={this.loadMoreEnd}/>
    }

    _getGanks(page) {
        var p1 = this._getApiGanks(gankType.FuLi, page);
        var p2 = this._getApiGanks(gankType.rest, page);
        Promise.all([p1, p2])
            .then(
                lists => {
                    var list1 = JSON.parse(lists[0]).results;
                    var list2 = JSON.parse(lists[1]).results;
                    var listRes = [];
                    list1.forEach((v, i) => {
                        var p2Bean = list2[i];
                        v.desc = p2Bean.desc;
                        v.who = p2Bean.who;
                        listRes.push(v)
                    });
                    return list1
                })
            .then(
                list => {
                    if (page === 1)
                        this.setState.data = [];
                    var tempList = this.state.data.concat(list);
                    if (list.count < FETCH_COUNT)
                        this.loadMoreEnd = true
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(tempList),
                        data: tempList,
                    })
                })
            .done()
    }

    _getApiGanks(type, page) {
        return NetUtil.get('http://gank.io/api/data/' + type + '/' + FETCH_COUNT + '/' + page)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF',
    },
});