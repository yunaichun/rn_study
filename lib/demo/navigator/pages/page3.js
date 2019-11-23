import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Button,
} from 'react-native';

class Page3 extends React.Component {
    render() {
        const {navigation} = this.props;
        const {state, setParams} = navigation;
        const {params} = state;
        console.log(1111, params);
        const showText = params && params.mode === 'edit' ? '正在编辑' : '编辑完成';
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to Page3</Text>
                <Text style={styles.showText}>{showText}</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text=>{
                        // setParams 可以修改路由传递的参数
                        setParams({ title: text })
                    }}
                />
                <Button
                    title="Go Back"
                    onPress={() => {
                        // 返回上一级
                        navigation.goBack();
                    }}
                />
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
    },
    input: {
        height: 50,
        marginTop: 10,
        borderWidth: 1,
        borderColor: 'black',
    }
});

export default Page3;
