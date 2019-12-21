import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
} from 'react-native';


export default class FavoritePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showText: ''
        };
    }

    loadData() {
        let url = `https://api.github.com/search/repositories?q=${this.searchKey}`
        fetch(url)
        .then(response => response.text())
        .then(responseText => {
            this.setState({
                showText: responseText
            });
        });
    }

    loadData2() {
        let url = `https://api.github.com/search/repositories?q=${this.searchKey}`
        fetch(url)
        .then(response => {
            if (response.ok) {
                return response.text();
            }
            throw new Error('Network response was not ok');
        })
        .then(responseText => {
            this.setState({
                showText: responseText
            });
        })
        .catch(e => {
            this.setState({
                showText: e.toString()
            });
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Fetch</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={ text => {
                            this.searchKey = text;
                        }}
                    />
                    <Button
                        title="获取"
                        onPress={()=>{
                            this.loadData();
                        }}
                    />
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
        justifyContent: 'center',
    },
    input: {
        height: 30,
        flex: 1,
        borderColor: 'black',
        borderWidth: 1,
        marginRight: 10
    }
});
