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
    ToastAndroid,
    Image,
    TouchableOpacity,
    ListView,
} from 'react-native';
import {SearchBar} from 'react-native-elements'

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
import makeCancelable from '../utils/Cancelable'


export default class GankListSearchScreen extends Component<{}> {

    componentDidMount() {
        this.props.navigation.setParams({
            header: <SearchBar
                ref={search => this.search = search}
                round
                clearIcon
                showLoadingIcon={this.state.isLoading}
                onChangeText={this._handleSearch.bind(this)}
                icon={{color: '#86939e', name: 'search'}}
                placeholder='搜索..'>{this.query}</SearchBar>
        })
    }

    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.loadMoreEnd = false;
        this.page = 1;
        this.gankType = gankType.Android
        this.query = ''
        this.cancelable = null
        this.search = null
        this.state = {
            dataSource: ds,
            isEmpty: true,
            data: [],
            isLoading: false
        };
    }

    _handleSearch(value) {
        this.query = value
        this.page = 1
        if (value === '' || value === null)
            this.setState({
                isEmpty: true,
            })
        else {
            this.setState({
                isLoading: true
            })
            this._getGanks(this.page)
        }
    }


    render() {
        return (
            <View style={styles.container}>

                {!this.state.isEmpty ?
                    <ListView
                        style={{flex: 1}}
                        dataSource={this.state.dataSource}
                        renderRow={(rowData, sectionId, rowId) => <GankItemRow navigation={this.props.navigation}
                                                                               gankBean={rowData}/>}
                        showsVerticalScrollIndicator={false}
                        enableEmptySections={true}
                        onEndReached={this._toEnd.bind(this)}
                        onEndReachedThreshold={50}
                        renderFooter={this._renderFooter.bind(this)}
                    /> :
                    <Text style={{flex: 1, textAlign: 'center', marginTop: 40}}>{'请输入搜索内容'}</Text>
                }
            </View>
        );
    }

    _toEnd() {
        this.page++;
        this._getGanks(this.page)
    }

    _renderFooter() {
        return <LoadMoreFooter isLoadAll={this.loadMoreEnd} loadMoreHint={this.state.loadMoreHint}/>
    }

    _getGanks(page) {
        if (this.cancelable !== undefined && this.cancelable !== null)
            this.cancelable.cancel();
        this.cancelable = makeCancelable(this._getApiGanks(this.query, page))
        this.cancelable.promise.then(res => JSON.parse(res).results)
            .then(
                list => {
                    this.setState({
                        isEmpty: false,
                        isLoading: false
                    })
                    this.search.showLoadingIcon = false

                    var tempList = []
                    if (page === 1)
                        tempList = list;
                    else tempList = this.state.data.concat(list);
                    if (list.count < FETCH_COUNT)
                        this.loadMoreEnd = true
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(tempList),
                        data: tempList,
                    })
                })
            .done()
    }

    _getApiGanks(query, page) {
        return NetUtil.get('http://gank.io/api/search/query/' + query + '/category/' + gankType.all + '/count/' + FETCH_COUNT + '/page/' + page)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF',
    },
});