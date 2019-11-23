import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
} from 'react-native';

class Page2 extends React.Component {
    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to Page2</Text>
                <Button
                    title="跳转至 Home"
                    onPress={()=>{
                        // 跳转到 Home
                        navigation.navigate('HomePage');
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

export default Page2;
