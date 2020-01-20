### 简介
此项目是学习 React Native 的项目，记录学习的点滴，方便以后忘记可以从学习轨迹中迅速上手。

### 参考地址

##### 官网

- [React Native 官网](http://facebook.github.io/react-native/docs/getting-started.html)
- [React Native 中文网](https://reactnative.cn/docs/0.47/getting-started.html#content)

##### 布局

- [Flex 布局 - 阮一峰](ruanyifeng.com/blog/2015/07/flex-grammar.html)
- [React Native  布局 - Flex](http://www.devio.org/2016/08/01/Reac-Native%E5%B8%83%E5%B1%80%E8%AF%A6%E7%BB%86%E6%8C%87%E5%8D%97/)

##### 导航器

- [React Native 导航器 - NavigationActions、StackActions](http://www.devio.org/2018/12/15/react-navigation3x/)
- [React Native 导航器 - createStackNavigator](https://www.devio.org/2018/12/24/createStackNavigator/)
- [React Native 导航器 - createMaterialTopTabNavigator](http://www.devio.org/2019/01/03/createMaterialTopTabNavigator/)
- [React Native 导航器 - createBottomTabNavigator](https://www.devio.org/2018/12/30/createBottomNavigator/)
- [React Native 导航器 - createDrawerNavigator](https://www.devio.org/2019/01/20/createDrawerNavigator/)
- [React Native 导航器 - createSwitchNavigator](https://www.devio.org/2019/01/21/createSwitchNavigator/)

##### 高性能列表组件

- [React Native 高性能列表组件 - FlatList](https://www.devio.org/2019/05/19/flatlist/)
- [React Native 高性能列表组件 - SwipeablFlatList](https://medium.com/@rutvikbhatt9/how-to-use-swipeableflatlist-new-react-native-experimental-component-cb792b1c7b0a)，不过在 0.60 版本已经移除
- [React Native 高性能列表组件 - SectionList](https://facebook.github.io/react-native/docs/sectionlist)

##### 离线缓存策略

- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [React Native 缓存 - AsyncStorage](https://www.devio.org/2016/09/05/React-Native%E4%B9%8BAsyncStorage%E5%AD%98%E5%82%A8key%E7%AE%A1%E7%90%86%E5%B0%8F%E6%8A%80%E5%B7%A7/)

##### 视频教程

- [React Native 视频教程](https://coding.imooc.com/class/304.html)

### 项目结构

```
├── App.js                                         入口文件
├── lib
    ├── demo                                       学习demo
       ├── AsyncStorage                            本地缓存             
       ├── fetch                                   接口请求
       ├── flex                                    Flex布局
       ├── initinalApp.js                          初始化项目App.js文件
       ├── list
       │   ├── FlatList                            高性能列表组件
       │   ├── SectionList                         高性能列表组件
       │   └── StackNavigator
       └── navigator
       │   ├── createBottomTabNavigator            底部导航
       │   ├── createDrawerNavigator               抽屉导航
       │   ├── createMaterialTopTabNavigator       顶部导航
       │   ├── createStackNavigator                路由跳转
       │   ├── createSwitchNavigator               无法返回导航
       │   └── pages
       └── offlineCaching                          离线缓存策略
    ├── src                                        当前项目
       ├── actions                                 redux actions  
       ├── common                                  公用组件       
       ├── components                              页面组件
       ├── config                                  环境配置
       ├── reducers                                redux reducers         
       ├── routers                                 react-navigation 导航配置
       ├── service                                 接口请求
       ├── store                                   redux store
       └── util                                    通用方法
```

### 项目启动

```
// == 安装 npm 依赖
$ npm install

// == 卸载 react-native-vector-icons
$ npm uninstall react-native-vector-icons --save

// 安装 pod 依赖
$ cd ios
$ pod install

// == 重新安装 react-native-vector-icons
$ npm install react-native-vector-icons --save

// == 运行
$ npm run ios
```

### 注意事项

- `react-native link react-native-vector-icons` 出错，[参考地址](https://medium.com/@vimniky/how-to-use-vector-icons-in-your-react-native-project-8212ac6a8f06)
- `react-native link react-native-webview` 出错，[参考地址](https://www.cnblogs.com/allencelee/p/11218678.html)
- 因为 react-native-vector-icons 是手动 link 的，所以如果需要安装其他需要自动 link 的 npm 包【如 react-native-webview】，均需要卸载 react-native-vector-icons 包后，重新 pod install
