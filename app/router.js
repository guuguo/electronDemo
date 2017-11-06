import React, {Component} from 'react';
import {TouchableNativeFeedback,} from 'react-native';

import {TabNavigator, StackNavigator,} from 'react-navigation';
import {NavigationComponent} from 'react-native-material-bottom-navigation'
import {Icon} from 'react-native-elements'
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';

import GankListScreen from './screens/gankListScreen.js'
import GankDailyScreen from './screens/gankDailyScreen.js'
import GankCategoryTabScreen from './screens/gankCategoryTabScreen.js'
import GankWebScreen from './screens/gankWebScreen.js'

// import GankTabScreen from "./screens/mainTabScreen";


export const Tabs = TabNavigator(
    {
        GankList: {
            screen: GankListScreen, // Replaced Feed with FeedStack
            navigationOptions: {
                tabBarLabel: '每日',
                tabBarIcon: ({tintColor}) => <Icon name="home" size={25} color={tintColor}/>
            },
        },
        GankCategoryTab: {
            screen: GankCategoryTabScreen, // Replaced Feed with FeedStack
            navigationOptions: {
                tabBarLabel: '分类',
                tabBarIcon: ({tintColor}) => <Icon name="dashboard" size={23} color={tintColor}/>
            },
        }
    }, {
        // tabBarComponent:TabBarBottom,
        tabBarComponent: NavigationComponent,
        swipeEnabled: false,
        animationEnabled: false,
        tabBarPosition: 'bottom',
        tabBarOptions: {
            activeTintColor: '#3A3B40',
            inactiveTintColor: '#6F6F6F',
            bottomNavigationOptions: {
                style: {
                    borderTopWidth: 0,
                    height: 56,
                    elevation: 8,
                },
                backgroundColor: '#F2F2F2',
            }
        }
    });


export const ScreenStack = StackNavigator({
    TabScreen: {
        screen: Tabs,
        navigationOptions: {
            headerRight:
                <TouchableNativeFeedback
                    background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
                    onPress={() => {
                    }}>
                    <Icon name="search" style={{marginRight: 10, padding: 4}} size={25} color='white'/>
                </TouchableNativeFeedback>,
            headerTitle: 'Gank',
            headerStyle: {backgroundColor: '#393B40'},//导航栏的样式
            headerTitleStyle: {//导航栏文字的样式
                color: 'white',
                //设置标题的大小
                fontSize: 22,
                //居中显示
            },
        }
    },
    GankDaily: {
        screen: GankDailyScreen,
        navigationOptions: {
            header: null,
        }
    },
    GankWeb: {
        screen: GankWebScreen,
        navigationOptions: {
            header: null,
        }
    },
},);