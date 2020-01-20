import React from 'react';
import { 
    StyleSheet,
    Modal,
    TouchableOpacity,
    View,
    Text,
} from 'react-native';
import PropTypes from 'prop-types';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TimeSpans } from '../util/TimeSpan';
import { isIphoneX, isIphoneXR } from '../util/ScreenUtil';

class TrendingDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        }
    }

    // == 显示弹窗
    show() {
        this.setState({ visible: true });
    }

    // == 关闭弹窗
    dismiss() {
        this.setState({ visible: false });
    }

    render() {
        const { onClose, onSelect } = this.props;
        return (
            <Modal
                transparent={true}
                visible={this.state.visible}
                // == 弹窗 dismiss 调用的回调
                onRequestClose={() => onClose() }
            >
                <TouchableOpacity
                    // == 点击弹窗任意地方关闭弹窗
                    onPress={() => this.dismiss() }
                    style={styles.container}
                >
                    <MaterialIcons
                        name={'arrow-drop-up'}
                        size={36}
                        style={styles.arrow}
                    />
                    <View
                        style={styles.content}
                    >
                        {TimeSpans.map((result, i) => {
                            return (
                                <TouchableOpacity
                                    key={i}
                                    onPress={ () => onSelect(result) }
                                    underlayColor='transparent'
                                >
                                    <View style={styles.textContainer}>
                                        <Text style={styles.text}>{result.showText}</Text>
                                    </View>
                                    {
                                        i !== TimeSpans.length - 1 ? (
                                            <View style={styles.line}></View> 
                                        ) : null
                                    }
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </TouchableOpacity>
            </Modal>
        );
    }
}

// == 类型检查
TrendingDialog.propTypes = {
    // == 关闭弹窗
    onClose: PropTypes.func,
    // == item 被选择的回调函数
    onSelect: PropTypes.func,
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        flex: 1,
        alignItems: 'center',
        paddingTop: isIphoneX || isIphoneXR ? 30 : 0,
    },
    arrow: {
        color: 'white',
        padding: 0,
        margin: -15,
        marginTop: 40,
    },
    content: {
        backgroundColor: 'white',
        borderRadius: 3,
        paddingTop: 3,
        paddingBottom: 3,
        marginRight: 3,
    },
    textContainer: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    text: {
        fontSize: 16,
        color: 'black',
        fontWeight: '400',
        padding: 8,
        paddingLeft: 26,
        paddingRight: 26,
    },
    line: {
        height: 0.5,
        backgroundColor: 'darkgray',
    }
});

export default TrendingDialog;
