/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image
} from 'react-native';

export const deviceWidth = Dimensions.get('window').width;      //设备的宽度
export const deviceHeight = Dimensions.get('window').height;    //设备的高度

export default class gankDailyScreen extends Component<{}> {


    constructor(props) {
        super(props);
        this.gankBean = this.props.navigation.state.params.gankBean;
        this.state = {
            width: 0,
            height: 0
        };
        Image.getSize(this.gankBean.url, (width, height) => {
            this.setState({width: width, height: height});
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Image resizeMode={'contain'}  source={{uri:this.gankBean.url}} style={{backgroundColor:'#333333',height: this.state.height*deviceWidth/this.state.width}}/>
                <Text style={{fontSize: 27, fontWeight: 'bold', textAlign: 'center'}}> { this.gankBean.desc}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: '#f2f2f2',
    },
});