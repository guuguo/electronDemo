import React, {Component} from 'react';
import {TouchableNativeFeedback,} from 'react-native';

import {TabNavigator, StackNavigator,} from 'react-navigation';
import {NavigationComponent} from 'react-native-material-bottom-navigation'
import {Icon} from 'react-native-elements'

import GankListScreen from './screens/GankListScreen.js'
import GankDailyScreen from './screens/GankDailyScreen.js'
import GankWebScreen from './screens/GankWebScreen.js'

// import GankTabScreen from "./screens/mainTabScreen";

import GankListAndroidScreen from './screens/GankListAndroidScreen.js'
import GankListIOSScreen from './screens/GankListIOSScreen.js'
import GankListWebScreen from './screens/GankListWebScreen.js'
import GankListSearchScreen from './screens/GankListSearchScreen.js'

export const CategoryTabsScreen = TabNavigator(
    {
        Android: {
            screen: GankListAndroidScreen, // Replaced Feed with FeedStack
            navigationOptions: {
                tabBarLabel: 'Android',
            },
        },
        IOS: {
            screen: GankListIOSScreen, // Replaced Feed with FeedStack
            navigationOptions: {
                tabBarLabel: 'IOS',
            },
        },
        Web: {
            screen: GankListWebScreen, // Replaced Feed with FeedStack
            navigationOptions: {
                tabBarLabel: '前端',
            },
        }
    }, {
        tabBarPosition: 'top',
        animationEnabled: true,
        lazy: true,
        tabBarOptions: {
            activeTintColor: 'white',
            style: {
                backgroundColor: '#393B40',
            },
        },
    });


const getSearchVeiw = ({navigation}) => {
    let {navigate} = navigation;
    return <TouchableNativeFeedback
        background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
        onPress={() => {
            navigate('GankSearch')
        }}>
        <Icon name="search" style={{marginRight: 10, padding: 4}} size={25} color='white'/>
    </TouchableNativeFeedback>
}
const tabOptions = (navigation, headerElevation, titleName, iconName) => {
    return {
        tabBarLabel: titleName,
        tabBarIcon: ({tintColor}) => <Icon name={iconName} size={23} color={tintColor}/>,
        headerRight: getSearchVeiw(navigation),
        headerTitle: 'Gank',
        headerStyle: {
            backgroundColor: '#393B40',
            elevation: headerElevation
        }
        ,//导航栏的样式
        headerTitleStyle: {
            color: 'white',
            fontSize: 22,
        },
    }
}
export const Tabs = TabNavigator(
    {
        GankList: {
            screen: GankListScreen, // Replaced Feed with FeedStack
            navigationOptions: (navigation) => tabOptions(navigation, 8, '首页', 'home'),
        },
        CategoryTabs: {
            screen: CategoryTabsScreen, // Replaced Feed with FeedStack
            navigationOptions: (navigation) => tabOptions(navigation, 0, '分类', 'dashboard')
        }
    },
    {
        // tabBarComponent:TabBarBottom,
        tabBarComponent: NavigationComponent,
        swipeEnabled: false,
        animationEnabled: false,
        tabBarPosition: 'bottom',
        lazy: true,
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
    }
    )
;


export const ScreenStack = StackNavigator({
        TabScreen: {
            screen: Tabs,
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
        GankSearch: {
            screen: GankListSearchScreen,
            navigationOptions: ({navigation}) => {
                if (navigation.state.params !== undefined)
                    return {
                        header: navigation.state.params.header,
                    }
                else {
                    header:null
                }
            }
        },
    },
    {
        gesturesEnabled: true
    })
