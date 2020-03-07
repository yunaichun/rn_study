import Octicons from 'react-native-vector-icons/Octicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export const MORE_MENU = {
    // == 顶部
    About: {name: '关于', Icons: Ionicons, icon: 'logo-github'},
    Tutorial: {name: '教程', Icons: Ionicons, icon: 'ios-bookmarks'},
    // == 趋势模块管理
    Custom_Language: {name: '自定义语言', Icons: Ionicons, icon: 'md-checkbox-outline'},
    Sort_Language: {name: '语言排序', Icons: MaterialCommunityIcons, icon: 'sort'},
    // == 最热模块管理
    Custom_Key: {name: '自定义标签', Icons: Ionicons, icon: 'md-checkbox-outline'},
    Sort_Key: {name: '标签排序', Icons: MaterialCommunityIcons, icon: 'sort'},
    Remove_Key: {name: '标签移除', Icons: Ionicons, icon: 'md-remove'},
    // == 设置
    Custom_Theme: {name: '自定义主题', Icons: Ionicons, icon: 'ios-color-palette'},
    About_Author: {name: '关于作者', Icons: Octicons, icon: 'smiley'},
    // == 底部
    Feedback: {name: '反馈', Icons: MaterialIcons, icon: 'feedback'},
    CodePush: {name: 'CodePush', Icons: Ionicons, icon: 'ios-planet'},
    Share: {name: '分享', Icons: Ionicons, icon: 'md-share'},
};
