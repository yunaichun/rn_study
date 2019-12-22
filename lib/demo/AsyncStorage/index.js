import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  AsyncStorage
} from 'react-native';

const KEY = 'SAVE_KEY';
export default class FavoritePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showText: ''
        };
    }

    doSave() {
        console.log(KEY, this.value);
        AsyncStorage.setItem(KEY, this.value, (error, result) => {
            error && console.log(error.toString());
        });
    }

    doRemove() {
        AsyncStorage.removeItem(KEY, (error, result) => {
            error && console.log(error.toString());
        });
    }

    getData() {
        AsyncStorage.getItem(KEY, (error, result) => {
            if (!error) {
                this.setState({
                    showText: result
                });
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Fetch</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={ text => {
                        this.value = text;
                    }}
                />
                <View style={styles.inputContainer}>
                    <Text onPress={() => {
                        this.doSave();
                    }}>存储</Text>   
                    <Text onPress={() => {
                        this.doRemove();
                    }}>删除</Text>
                    <Text onPress={() => {
                        this.getData();
                    }}>获取</Text>   
                </View>
                <Text>{this.state.showText}</Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    input: {
        height: 30,
        borderColor: 'black',
        borderWidth: 1,
        marginRight: 10
    }
});
