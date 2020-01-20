import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Image,
    View,
    Text,
} from 'react-native';
// == 收藏基类
import FavoriteItem from '../../common/FavoriteItem';

class HotItem extends FavoriteItem {

    render() {
        const { item, onSelect } = this.props;
        if (!item || !item.owner) return null;   
        return (
            <TouchableOpacity
                onPress={onSelect}
            >
                <View style={styles.container}>
                    <Text style={styles.fullname}>
                        {item.full_name}
                    </Text>
                    <Text style={styles.description}>
                        {item.description}
                    </Text>
                    <View style={styles.row}>
                        <View style={styles.row}>
                            <Text>Author:</Text>
                            <Image
                                style={styles.avator}
                                source={{uri: item.owner.avatar_url}}
                            />
                        </View>
                        <View style={styles.stars}>
                            <Text>Stars:</Text>
                            <Text>{item.stargazers_count}</Text>
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
    avator: {
        height: 22,
        width: 22,
    },
    stars: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    starBtn: {
        padding: 6
    }
});

export default HotItem;
