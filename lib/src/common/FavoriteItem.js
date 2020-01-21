import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
  } from 'react-native';
import PropTypes from 'prop-types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class FavoriteItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFavorite: this.props.item.isFavorite,
        };
    }

    // == 新版本的 componentWillReceiveProps
    static getDerivedStateFromProps(nextProps, prevState) {
        const isFavorite = nextProps.item.isFavorite;
        if (prevState.isFavorite !== isFavorite) {
            return { isFavorite };
        }
        return null;
    }

    // ============
    onItemClick() {
        this.props.onSelect(isFavorite => {
            this.onPressFavorite();
        });
    }

    // == 生成收藏的 icon
    _favoriteIcon() {
        return (
            <TouchableOpacity
                style={styles.favorite}
                underlayColor='transparent'
                onPress={ () => this.onPressFavorite() }
            >
                <FontAwesome
                    name={this.state.isFavorite ? 'star' : 'star-o'}
                    size={26}
                    style={styles.icon}
                />
            </TouchableOpacity>
        );
    }

    // == 添加/取消收藏
    onPressFavorite() {
        // == 修改 props 中 item 状态
        this.props.item.isFavorite = !this.state.isFavorite;
        // == 修改当前组件的收藏状态
        this.setState({ isFavorite: !this.state.isFavorite });
        // == 回调 onFavorite 方法，将 item 和 isFavorite 带过去
        this.props.onFavorite(this.props.item, !this.state.isFavorite);
    }
}

// == 类型检查
FavoriteItem.propTypes = {
    // == 当前 item
    item: PropTypes.object,
    // == item 被点击的方法
    onSelect: PropTypes.func,
    // == item 被点击收藏
    onFavorite: PropTypes.func,
};

const styles = StyleSheet.create({
    favorite: {
        padding: 6,
    },
    icon: {
        color: '#678',
    }
});

export default FavoriteItem;
