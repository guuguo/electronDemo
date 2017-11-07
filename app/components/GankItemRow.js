import React, {Component} from 'react';
import {
    TouchableNativeFeedback,
    View,
    Image,
    PixelRatio,
    Text,
} from 'react-native';
import { Divider} from 'react-native-elements'
import StringUtil from "../utils/StringUtil";

const onePx = 1 / PixelRatio.get()

class GankItemRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let gankBean = this.props.gankBean
        return (
            <TouchableNativeFeedback
                key={gankBean._id} background={TouchableNativeFeedback.SelectableBackground()}
                onPress={() => {
                    this.props.navigation.navigate('GankWeb', {gankBean: gankBean})
                }}>
                <View style={{backgroundColor: 'white'}}>
                    <View style={{flexDirection: 'row', justifyContent: 'center', height: 80}}>
                        <View style={{flex: 1, flexDirection: 'column', margin: 10}}>
                            <Text numberOfLines={2} style={{color: 'black', fontSize: 14}}>{gankBean.desc}</Text>
                            <Text style={{
                                flex: 2, color: '#808084', fontSize: 12, marginTop: 10
                            }}>{gankBean.who + ' • ' + StringUtil.getPublishedTimeSpan(gankBean.publishedAt)}</Text>
                        </View>
                        {
                            gankBean.images !== undefined && gankBean.images.length > 0 ?
                                <Image style={{margin: 8, width: 80}} source={{uri: gankBean.images[0]}}/> : <View/>
                        }
                    </View>
                    <Divider style={{height: onePx, backgroundColor: '#cecece'}}/>
                </View>
            </TouchableNativeFeedback>
        )
    }
}


export default GankItemRow