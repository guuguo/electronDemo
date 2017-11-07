/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, {Component} from 'react';
import {
    PixelRatio,
    StyleSheet,
    Text,
    ScrollView,
    View,
    Dimensions,
    Image,
    ToastAndroid,
    TouchableNativeFeedback
} from 'react-native';
import {Icon, Divider} from 'react-native-elements'
import StringUtil from "../utils/StringUtil";
import NetUtil from "../utils/NetUtil.js";
import GankItemRow from "../components/GankItemRow"


export const deviceWidth = Dimensions.get('window').width;      //设备的宽度
export const deviceHeight = Dimensions.get('window').height;    //设备的高度
const onePx = 1 / PixelRatio.get()
export default class GankDailyScreen extends Component<{}> {


    constructor(props) {
        super(props);
        this.gankBean = this.props.navigation.state.params.gankBean;
        this.state = {
            width: 0,
            height: 0,
            data: []
        };
        Image.getSize(this.gankBean.url, (width, height) => {
            this.setState({width: width, height: height});
        });
        this._getDailyGanks(StringUtil.parseRequestDate(this.gankBean.publishedAt))
    }

    _renderCategory(category) {
        return (
            <View key={category.name} style={styles.container}>
                <Text style={{
                    color: 'black', fontWeight: 'bold', fontSize: 23, margin: 10, backgroundColor: '#f2f2f2'
                }}>{category.name}</Text>
                <Divider style={{height: onePx, backgroundColor: '#cecece'}}/>
                {category.data.map(it => <GankItemRow gankBean={it} navigation={this.props.navigation}/>)}
            </View>
        )
    }
    render() {
        return (
            <View style={{flex: 1, alignItems: 'stretch'}}>
                <ScrollView>
                    <View style={styles.container}>
                        <Image source={{uri: this.gankBean.url}}
                               style={{height: this.state.height * deviceWidth / this.state.width}}/>

                        {this.state.data.map(it => this._renderCategory(it))}
                    </View>
                </ScrollView>
                <Icon
                    raised
                    underlayColor={'red'}
                    style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        borderRadius: 25,
                        padding: 6,
                        marginLeft: 12,
                        marginTop: 10,
                        position: 'absolute'
                    }} name="arrow-back" size={30}
                    color={'white'}
                    onPress={() => {
                        this.props.navigation.goBack()
                    }}/>
            </View>
        );
    }

    _getDailyGanks(date) {
        var p1 = this._getApiDailyGanks(date)
            .then(res => JSON.parse(res).results)
            .then(daily => {
                var categories = []
                this._pushData(daily.休息视频, '休息视频', categories)
                this._pushData(daily.Android, 'Android', categories)
                this._pushData(daily.前端, '前端', categories)
                this._pushData(daily.iOS, 'iOS', categories)
                this._pushData(daily.拓展资源, '拓展资源', categories)
                this.setState({
                    data: categories
                })
            })
            .done()
    }

    _pushData(date, name, array) {
        if (date !== undefined && date.length > 0)
            array.push({name: name, data: date})
    }

    _getApiDailyGanks(date) {
        return NetUtil.get('http://gank.io/api/day/' + date)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: '#f2f2f2',
    },
});