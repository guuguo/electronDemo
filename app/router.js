import React from 'react';
import {TabNavigator, StackNavigator, TabView, TabBarBottom} from 'react-navigation';
import {NavigationComponent} from 'react-native-material-bottom-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons';
import GankListScreen from './screens/gankListScreen.js'
import MainScreen from './screens/MainScreen.js'
import GankDailyScreen from './screens/gankDailyScreen.js'
import GankCategoryTabScreen from './screens/gankCategoryTabScreen.js'


export const ScreenStack = StackNavigator({
    GankDaily: {
        screen: GankDailyScreen,
    },

});

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
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    right: 0
                },
                backgroundColor: '#F2F2F2',
                // tabs: {
                //     GankList: {
                //         barBackgroundColor: '#F2F2F2'
                //     },
                //     GankCategoryTab: {
                //         barBackgroundColor: '#F2F2F2'
                //     },
                // }
            }
        }
    });