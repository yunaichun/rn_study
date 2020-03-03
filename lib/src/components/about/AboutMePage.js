import React, {Component} from 'react';
import {
    View,
    Linking,
    Clipboard,
} from 'react-native';
import Toast from 'react-native-easy-toast'
import Ionicons from 'react-native-vector-icons/Ionicons';

import NavigationUtil from '../../routers/utils';
import ViewUtil from "../../util/ViewUtil";
import { THEME_COLOR, LINE_STYLE } from '../../util/Global';
import BaseAbout, { FLAG_ABOUT } from './BaseAbout';
import config from './config.json';

export default class AboutMePage extends Component {
    constructor(props) {
        super(props);
        // == 去除路由里面的参数
        this.params = this.props.navigation.state.params;
        // == 组装者模式，实例化 BaseAbout
        this.baseAbout = new BaseAbout({
                ...this.params,
                navigation: this.props.navigation,
                flagAbout: FLAG_ABOUT.flag_about_me,
            }, data => this.setState({...data})
        );
        // == 默认的 config 配置数据
        this.state = { 
            data: config,
            showTutorial: true,
            showBlog: false,
            showQQ: false,
            showContact: false
        };
    }

    // == 面板点击事件
    onClick(tab) {
        if (!tab) return;
        // == 带 url 的 tab
        if (tab.url) {
            NavigationUtil.goPage('WebViewPage', {
                title: tab.title,
                url: tab.url
            });
            return;
        }
        // == qq邮箱
        if (tab.account && tab.account.indexOf('@') > -1) {
            let url = 'mailto://' + tab.account;
            Linking.canOpenURL(url).then(supported => {
                if (!supported) {
                    console.log('Can\'t handle url: ' + url);
                } else {
                    return Linking.openURL(url);
                }
            }).catch(err => console.error('An error occurred', err));
            return;
        }
        // == 手机号
        if (tab.account) {
            Clipboard.setString(tab.account);
            this.toast.show(tab.title + tab.account + '已复制到剪切板。');
        }
    }

    // == 渲染折叠后的 item
    _renderFoldItem(menu, isShow, key) {
        return ViewUtil.getSettingItem(
            () => {
                // == 展开和折叠时候的状态修改
                this.setState({
                    [key]: !this.state[key]
                });
            },
            menu.name,
            Ionicons,
            menu.icon,
            THEME_COLOR,
            isShow ? 'ios-arrow-up' : 'ios-arrow-down'
        );
    }

    // == 渲染展开后的 item
    renderExpandItems(dic, isShowAccount) {
        if (!dic) return null;
        let views = [];
        for (let i in dic) {
            let title = isShowAccount ? dic[i].title + ':' + dic[i].account : dic[i].title;
            views.push(
                <View key={i}>
                    {ViewUtil.getSettingItem(() => this.onClick(dic[i]), title, THEME_COLOR)}
                    <View style={LINE_STYLE}/>
                </View>
            )
        }
        return views;
    }

    // == 渲染函数
    render() {
        const contentView = (
            <View>
                {this._renderFoldItem(this.state.data.aboutMe.Tutorial, this.state.showTutorial, 'showTutorial')}
                <View style={LINE_STYLE}/>
                {this.state.showTutorial ? this.renderExpandItems(this.state.data.aboutMe.Tutorial.items) : null}

                {this._renderFoldItem(this.state.data.aboutMe.Blog, this.state.showBlog, 'showBlog')}
                <View style={LINE_STYLE}/>
                {this.state.showBlog ? this.renderExpandItems(this.state.data.aboutMe.Blog.items) : null}

                {this._renderFoldItem(this.state.data.aboutMe.QQ, this.state.showQQ, 'showQQ')}
                <View style={LINE_STYLE}/>
                {this.state.showQQ ? this.renderExpandItems(this.state.data.aboutMe.QQ.items, true) : null}

                {this._renderFoldItem(this.state.data.aboutMe.Contact, this.state.showContact, 'showContact')}
                <View style={LINE_STYLE}/>
                {this.state.showContact ? this.renderExpandItems(this.state.data.aboutMe.Contact.items, true) : null}
            </View>
        );
        return (
            <View style={{flex: 1}}>
                {this.baseAbout.render(contentView, this.state.data.author)}
                <Toast ref={toast => this.toast = toast} position={'center'} />
            </View>
        );
    }
}

