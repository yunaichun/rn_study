import React from 'react';
import {
  BackHandler,
} from 'react-native';

export default class BackPress {
    constructor(props) {
        this._hardwareBackPress = this.onHardwareBackPress.bind(this);
        this.props = props;
    }

    componentDidMount() {
        if (this.props.backPress) BackHandler.addEventListener('hardwareBackPress', this._hardwareBackPress);
    }
    
    componentWillUnmount() {
        if (this.props.backPress) BackHandler.removeEventListener('hardwareBackPress', this._hardwareBackPress);
    }
    
    onHardwareBackPress = (e) => {
        // == 用户设置的返回监听
        let val = this.props.backPress(e);
        // == 默认返回 false，指的是会直接 kill 应用
        // == 返回 true，则不会 kill 应用
        return val;
    };
}