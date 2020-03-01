import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Image,
    View,
    Text,
} from 'react-native';
import HTMLView from 'react-native-htmlview';
// == 收藏基类
import BaseItem from '../../common/BaseItem';

class TrendingItem extends BaseItem {

    render() {
        const { item, onSelect } = this.props;
        if (!item) return null;
        return (
            <TouchableOpacity
                onPress={onSelect}
            >
                <View style={styles.container}>
                    <Text style={styles.fullname}>
                        {item.fullName}
                    </Text>
                    <HTMLView
                        value={'<p>' + item.description + '</p>'}
                        stylesheet={{
                            // == 对指定的 p 标签设置样式
                            p: styles.description,
                            a: styles.description,
                        }}
                    />
                    <Text style={styles.description}>
                        {item.meta}
                    </Text>
                    <View style={styles.row}>
                        <View style={styles.build}>
                            <Text>Build By:</Text>
                            {
                                item.contributors.map((result, i) => {
                                    return (
                                        <Image
                                            key={i}
                                            style={styles.avator}
                                            source={{uri: result}}
                                        />
                                    );
                                })
                            }
                            
                        </View>
                        <View style={styles.stars}>
                            <Text>Stars:</Text>
                            <Text>{item.starCount}</Text>
                        </View>
                        {this._favoriteIcon()}
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        marginVertical: 3,
        borderColor: '#dddddd',
        borderWidth: 0.5,
        borderRadius: 2,
        shadowColor: 'gray',
        shadowOffset: {
            width: 0.5,
            height: 0.5
        },
        shadowOpacity: 0.4,
        // 安卓设置阴影
        elevation: 2
    },
    fullname: {
        fontSize: 16,
        marginBottom: 2,
        color: '#212121'
    },
    description: {
        fontSize: 14,
        marginBottom: 2,
        color: '#757575'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    build: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: 200,
        overflow: 'scroll',
    },
    avator: {
        height: 22,
        width: 22,
        margin: 2,
    },
    stars: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    starBtn: {
        padding: 6
    }
});

export default TrendingItem;
