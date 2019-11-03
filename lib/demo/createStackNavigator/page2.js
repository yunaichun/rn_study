import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

class Page2 extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to Page2</Text>
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

export default Page2;
