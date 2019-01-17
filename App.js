/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Linking, Platform, StyleSheet, Text, View, Button, Alert} from 'react-native';
import * as WeChat from 'react-native-wechat';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  componentDidMount() {
    WeChat.registerApp('appid');
  }

  wechatLogin() {
    
    console.log('btn wechatLogin clicked')

    let scope = 'snsapi_userinfo';
    let state = 'wechat_sdk_demo';
    //判断微信是否安装
    WeChat.isWXAppInstalled()
      .then((isInstalled) => {
        console.log('wechat installed: ', isInstalled)
        if (isInstalled) {
          //发送授权请求
          WeChat.sendAuthRequest(scope, state)
            .then(responseCode => {
              console.log('responseCode', responseCode)
              //返回code码，通过code获取access_token
              this.getAccessToken(responseCode.code);
            })
            .catch(err => {
              Alert.alert('登录授权发生错误：', err.message, [
                {text: '确定'}
              ]);
            })
        } else {
          Platform.OS == 'ios' ?
            Alert.alert('没有安装微信', '是否安装微信？', [
              {text: '取消'},
              {text: '确定', onPress: () => this.installWechat()}
            ]) :
            Alert.alert('没有安装微信', '请先安装微信客户端在进行登录', [
              {text: '确定'}
            ])
        }
      })




    // try {
    //   let result = await WeChat.shareToTimeline({
    //     type: 'text', 
    //     description: 'hello, wechat'
    //   });
    //   console.log('share text message to time line successful:', result);
    // } catch (e) {
    //   if (e instanceof WeChat.WechatError) {
    //     console.error(e.stack);
    //   } else {
    //     throw e;
    //   }
    // }

    // WeChat.shareToTimeline({
    //   type: 'imageUrl',
    //   title: 'web image',
    //   description: 'share web image to time line',
    //   mediaTagName: 'email signature',
    //   messageAction: undefined,
    //   messageExt: undefined,
    //   imageUrl: 'http://play.linwise.com/test1.png'
    // }).then(
    //   res => console.log(res),
    //   err => console.log(err)
    // );
  }

  openLink(url) {
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Button onPress={() => this.wechatLogin()} title="微信登录"><Text>微信登录</Text></Button>
        <Text>Link Example</Text>
        <Button onPress={() => this.openLink('http://maps.apple.com/?ll=37.484847,-122.148386')} title="Open Map"><Text>Open Map</Text></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
