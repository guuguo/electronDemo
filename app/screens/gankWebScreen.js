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
    ToolbarAndroid,
    View,
    WebView,
    Dimensions,
    Clipboard,
    ToastAndroid,
    ProgressBarAndroid,
    Linking
} from 'react-native';
// import {Icon, Divider} from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons'
import StringUtil from "../utils/StringUtil";
import NetUtil from "../utils/NetUtil.js";

export const deviceWidth = Dimensions.get('window').width;      //设备的宽度
export const deviceHeight = Dimensions.get('window').height;    //设备的高度
const onePx = 1 / PixelRatio.get()
const WEB_VIEW_REF = 'WEB_VIEW'
export default class gankDailyScreen extends Component<{}> {


    constructor(props) {
        super(props);
        this.gankBean = this.props.navigation.state.params.gankBean;
        this.state = {
            backIcon: null,
            overflowIcon: null,
            canGoBack: false,
            curUrl: this.gankBean.url,
            isLoading: true
        };
        Icon.getImageSource('arrow-back', 25, 'white').then((source) => this.setState({backIcon: source}));
        Icon.getImageSource('more-vert', 25, 'white').then((source) => this.setState({overflowIcon: source}));
    }

    onActionSelected(position) {
        switch (position) { // index of 'Settings'
            case 0:
                Linking.openURL(this.state.curUrl)
                break;
            case 1:
                Clipboard.setString(this.state.curUrl)
                ToastAndroid.show('已成功复制', ToastAndroid.SHORT)
                break;

        }
    }


    render() {
        var toolbarActions = [
            {title: '浏览器打开', show: 'never'},
            {title: '复制url', show: 'never'},
        ];

        return (
            <View style={{flex: 1, alignItems: 'stretch'}}>
                <ToolbarAndroid
                    style={{height: 56, backgroundColor: '#393B40'}}
                    navIcon={this.state.backIcon}
                    title={this.gankBean.desc}
                    titleColor="white"
                    onIconClicked={() => {
                        if (this.state.canGoBack)
                            this.refs [WEB_VIEW_REF].goBack();
                        else
                            this.props.navigation.goBack()
                    }}
                    overflowIcon={this.state.overflowIcon}
                    actions={toolbarActions}
                    onActionSelected={this.onActionSelected.bind(this)}

                />
                <WebView
                    ref={WEB_VIEW_REF}
                    source={{uri: this.gankBean.url}}
                    onNavigationStateChange=
                        {this.onNavigationStateChange.bind(this)}/>
                {this.state.isLoading ?
                    <ProgressBarAndroid style={{position: 'absolute', left: 0, top: 56, right: 0, height: 5}}
                                        styleAttr="Horizontal"
                                        indeterminate={false}
                                        color='yellow'

                    /> : <View/>
                }
            </View>
        );
    }

    onNavigationStateChange(navState) {
        this.setState({
            canGoBack: navState.canGoBack,
            curUrl: navState.url,
            isLoading: navState.loading
        });
    }
}

