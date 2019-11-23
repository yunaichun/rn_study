import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
} from 'react-native';

class HomePage extends React.Component {
    // createStackNavigator之外也可以配置navigationOptions
    static navigationOptions = {
         /* 导航上的标题，state.params.title获取 */
        title: 'Home',
        /* 这里设置返回此页面的返回按钮文案，有长度限制 */
        headerBackTitle: '返回哈哈'
    };
    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to HomePage</Text>
                <Button
                    title="跳转到 Page1"
                    onPress={()=>{
                        // 跳转到 Page1
                        navigation.navigate('Page1', { name: '动态标题' });
                    }}
                ></Button>
                <Button
                    title="跳转到 Page2"
                    onPress={()=>{
                        // 跳转到 Page2
                        navigation.navigate('Page2');
                    }}
                ></Button>
                <Button
                    title="跳转到 Page3"
                    onPress={()=>{
                        // 跳转到 Page3
                        navigation.navigate('Page3', { name: 'name 参数 Page3 没用到' });
                    }}
                ></Button>
                <Button
                    title="跳转到 Top"
                    onPress={()=>{
                        // 跳转到 Top
                        navigation.navigate('Top');
                    }}
                ></Button>
                <Button
                    title="跳转到 Bottom"
                    onPress={()=>{
                        // 跳转到 Bottom
                        navigation.navigate('Bottom');
                    }}
                ></Button>
                <Button
                    title="跳转到 Drawer"
                    onPress={()=>{
                        // 跳转到 Drawer
                        navigation.navigate('Drawer');
                    }}
                ></Button>
                <Button
                    title="跳转到 Switch"
                    onPress={()=>{
                        // 跳转到 Drawer
                        navigation.navigate('Switch');
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

export default HomePage;
