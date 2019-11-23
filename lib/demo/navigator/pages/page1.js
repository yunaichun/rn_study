import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
} from 'react-native';

class Page1 extends React.Component {
    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to Page1</Text>
                <Button
                    title="返回上一页"
                    onPress={()=>{
                        // 跳转到上一页
                        navigation.goBack();
                    }}
                ></Button>
                <Button
                    title="跳转到 Page3"
                    onPress={()=>{
                        // 跳转到自定页面
                        navigation.navigate('Page3');
                    }}
                ></Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
});

export default Page1;
