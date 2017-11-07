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
import GankItemRow from "../components/GankItemRow"

export default class GankListAndroidScreen extends Component<{}> {


    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.loadMoreEnd = false;
        this.page = 1;
        this.gankType = gankType.Android

        this.state = {
            dataSource: ds,
            data: [],
        };
        this._getGanks(this.page)
    }

    render() {
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource.cloneWithRows(this.state.data)}
                    renderRow={(rowData, sectionId, rowId) => <GankItemRow navigation={this.props.navigation} gankBean={rowData}/>}
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
        var p1 = this._getApiGanks(this.gankType, page).then(res => JSON.parse(res).results)
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