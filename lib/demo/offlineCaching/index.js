import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput
} from 'react-native';
import DataStore from '../../src/service';

export default class FavoritePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showText: ''
        };

        this.dataStore = new DataStore();
    }

    loadData() {
        let url = `https://api.github.com/search/repositories?q=${this.searchKey}`
        this.dataStore.fetchData(url)
        .then(data => {
            console.log(data);
            let showText = `初次加载时间${new Date(data.timestamp)}\n${JSON.stringify(data.data)}`;
            this.setState({ showText });
        })
        .catch(e => {
            e && console.error(e);
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>离线缓存框架设计</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={ text => {
                        this.searchKey = text;
                    }}
                />
                <View style={styles.inputContainer}>
                    <Text onPress={() => {
                        this.loadData();
                    }}>获取数据</Text>    
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
