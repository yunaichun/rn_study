import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
} from 'react-native';

class HomePage extends React.Component {

    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to HomePage</Text>
                <Button
                    title="跳转到 FlatListDemo"
                    onPress={()=>{
                        // 跳转到 FlatListDemo
                        navigation.navigate('FlatListDemo');
                    }}
                ></Button>
                <Button
                    title="跳转到 SectionListDemo"
                    onPress={()=>{
                        // 跳转到 SectionListDemo
                        navigation.navigate('SectionListDemo');
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
