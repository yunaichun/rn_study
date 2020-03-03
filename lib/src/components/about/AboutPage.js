import React, {Component} from 'react';
import {
    View,
    Linking,
} from 'react-native';
import NavigationUtil from '../../routers/utils';
import { MORE_MENU } from '../../common/MoreMenu';
import ViewUtil from "../../util/ViewUtil";
import { THEME_COLOR, LINE_STYLE } from '../../util/Global';
import BaseAbout, { FLAG_ABOUT } from './BaseAbout';
import config from '../../data/config.json';

export default class AboutPage extends Component {
    constructor(props) {
        super(props);
        // == 去除路由里面的参数
        this.params = this.props.navigation.state.params;
        // == 组装者模式，实例化 BaseAbout
        this.baseAbout = new BaseAbout({
                ...this.params,
                navigation: this.props.navigation,
                flagAbout: FLAG_ABOUT.flag_about,
            }, data => this.setState({...data})
        );
        // == 默认的 config 配置数据
        this.state = { data: config };
    }

    onClick(menu) {
        const { theme } = this.params;
        let RouteName, params = { theme };
        switch (menu) {
            case MORE_MENU.Tutorial:
                RouteName = 'WebViewPage';
                params.title = '教程';
                params.url = 'https://coding.m.imooc.com/classindex.html?cid=89';
                break;
            case MORE_MENU.About_Author:
                RouteName = 'AboutMePage';
                break;
            case MORE_MENU.Feedback:
                const url = 'mailto://naichun@aliyun.com';
                // == 判断 URL 是否可以打开
                Linking.canOpenURL(url)
                    .then(support => {
                        debugger;
                        if (!support) {
                            console.log('Can\'t handle url: ' + url);
                        } else {
                            // == 打开邮件 app
                            Linking.openURL(url);
                        }
                    })
                    .catch(e => {
                        console.error('An error occurred', e);
                    });
                break;
        }
        if (RouteName) {
            NavigationUtil.goPage(RouteName, params);
        }
    }

    // == 通过复用方法生成内部每一条
    getItem(menu) {
        return ViewUtil.getMenuItem(() => this.onClick(menu), menu, THEME_COLOR);
    }

    // == 渲染函数
    render() {
        const contentView = (
            <View>
                {this.getItem(MORE_MENU.Tutorial)}
                <View style={LINE_STYLE}/>
                {this.getItem(MORE_MENU.About_Author)}
                <View style={LINE_STYLE}/>
                {this.getItem(MORE_MENU.Feedback)}
            </View>
        );
        return this.baseAbout.render(contentView, this.state.data.app);
    }
}

