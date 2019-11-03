/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  View,
  Text,
} from 'react-native';


/* React Native中的FlexBox 和Web CSSS上FlexBox的不同之处：

    1、flexDirection: React Native中默认为flexDirection:'column'，在Web CSS中默认为flex-direction:'row'

    2、alignItems: React Native中默认为alignItems: 'stretch'， 在Web CSS中默认align-items: 'flex-start'

    3、flex: 相比Web CSS的flex接受多参数，如:flex: 2 2 10%;，但在 React Native中flex只接受一个参数

    4、不支持属性：
    父元素：
    align-content【多轴对齐】
    flex-flow【flex-direction、flex-wrap 的合写】

    子元素：
    order
    flex-grow、flex-shrink、flex-basis【flex 的合写】
 */
class App extends React.Component {
    render() {
        return (
            <View style={{
                /* 排列方式：
                    row: 从左向右依次排列
                    row-reverse: 从右向左依次排列
                    column(default): 默认的排列方式，从上向下排列
                    column-reverse: 从下向上排列
                */
                flexDirection: 'column',
                /* 主轴子元素超出是否换行：
                    nowrap flex的元素只排列在一行上，可能导致溢出。
                    wrap flex的元素在一行排列不下时，就进行多行排列。
                */
                flexWrap: 'nowrap',
                /* 主轴对齐方式：
                    flex-start(default) 从行首开始排列。每行第一个弹性元素与行首对齐，同时所有后续的弹性元素与前一个对齐。
                    flex-end 从行尾开始排列。每行最后一个弹性元素与行尾对齐，其他元素将与后一个对齐。
                    center 伸缩元素向每行中点排列。每行第一个元素到行首的距离将与每行最后一个元素到行尾的距离相同。
                    space-between 在每行上均匀分配弹性元素。相邻元素间距离相同。每行第一个元素与行首对齐，每行最后一个元素与行尾对齐。
                    space-around 在每行上均匀分配弹性元素。相邻元素间距离相同。每行第一个元素到行首的距离和每行最后一个元素到行尾的距离将会是相邻元素之间距离的一半。
                 */
                justifyContent: 'center',
                /* 副轴对齐方式：
                    flex-start 元素向侧轴起点对齐。
                    flex-end 元素向侧轴终点对齐。
                    center 元素在侧轴居中。如果元素在侧轴上的高度高于其容器，那么在两个方向上溢出距离相同。
                    stretch 弹性元素被在侧轴方向被拉伸到与容器相同的高度或宽度。
                */
                alignItems: 'center',
                backgroundColor: "darkgray", 
                marginTop: 20,
                height: 300,
            }}>
                <View style={{
                    /* alignSelf 属性可重写灵活容器的 alignItems 属性：
                        auto(default) 元素继承了它的父容器的 align-items 属性。如果没有父容器则为 “stretch”。
                        stretch 元素被拉伸以适应容器。
                        center 元素位于容器的中心。
                        flex-start 元素位于容器的开头。
                        flex-end 元素位于容器的结尾。
                    */
                    alignSelf: 'flex-start',
                    flex: 2,
                    width: 40,
                    height: 40,
                    backgroundColor: "darkcyan",
                    margin: 5
                }}>
                    <Text style={{ fontSize: 16 }}>1</Text>
                </View>
                <View style={{
                    width: 40,
                    height: 40,
                    backgroundColor: "darkcyan",
                    margin: 5
                }}>
                    <Text style={{ fontSize: 16 }}>2</Text>
                </View>
                <View style={{
                    width: 40,
                    height: 40,
                    backgroundColor: "darkcyan",
                    margin: 5
                }}>
                    <Text style={{ fontSize:16 }}>3</Text>
                </View>
                <View style={{
                    width: 40,
                    height: 40,
                    backgroundColor: "darkcyan",
                    margin: 5
                }}>
                    <Text style={{ fontSize: 16 }}>4</Text>
                </View>
            </View>
        );
    }
};

export default App;
