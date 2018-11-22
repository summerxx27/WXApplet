# WXApplet
一个简单的微信小程序demo

前言:  文中参照官方文档, 加入一些自己的理解.

 入门(一)
 基础(二)
 进阶(三)
 综合(四)


### 一.  微信小程序账号申请 
[https://mp.weixin.qq.com/wxopen/waregister?action=step1](https://mp.weixin.qq.com/wxopen/waregister?action=step1) 然后一步一步按照注册流程走就好了, 这里没有需要注意的点.
### 二. 登录
 [https://mp.weixin.qq.com](https://mp.weixin.qq.com/) 可以在菜单 “设置”-“开发设置” 看到小程序的 AppID 了.

![展示AppID所在位置](https://upload-images.jianshu.io/upload_images/1506501-55b52ef88cdc7cbf.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
### 三. 开发工具 
[https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html?t=18111420](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html?t=18111420) 这个根据自己的电脑的操作系统自行选择就好.

支持的系统: [Windows 64位](https://servicewechat.com/wxa-dev-logic/download_redirect?type=x64&from=mpwiki) / [Windows 32位](https://servicewechat.com/wxa-dev-logic/download_redirect?type=ia32&from=mpwiki) / [Mac OS](https://servicewechat.com/wxa-dev-logic/download_redirect?type=darwin&from=mpwiki)

还可以使用:  [*Visual* Studio *Code*](http://www.baidu.com/link?url=bdVS9jWRn1QzxPu0GDBdWEP8aF9H72F9SVV0qfE3_Wzm97ZchXazkGkD8Y_qlpU3), sublime Text等.


### 四. 文件解析

![样图 - 3](https://upload-images.jianshu.io/upload_images/1506501-1890f9b066ba477a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

- app.json : 是当前小程序的全局配置，包括了小程序的所有页面路径、界面表现、网络超时时间、底部 tab 等等
- xx.josn: 单页面配置

```
{
  /// 页面路径配置
  "pages":[
    "pages/index/index",
    "pages/logs/logs"
  ],
  "window":{
    /// 全局样式设置
    "backgroundTextStyle":"light",
    "navigationBarBackgroundColor": "#fff",
    "navigationBarTitleText": "WeChat",
    "navigationBarTextStyle":"black"
  }
},
"tabBar": {
    "selectedColor": "blue",
    "list": [
      {
        "pagePath": "pages/index/index",
        "iconPath": "pages/resource/2.png",
        "selectedIconPath": "pages/resource/1.png",
        "text": "首页"
      },
      {
        "pagePath": "pages/logs/logs",
        "iconPath": "pages/resource/2.png",
        "selectedIconPath": "pages/resource/1.png",
        "text": "日志"
      }
    ]
  }
```

> `pages`字段 —— 用于描述当前小程序所有页面路径，这是为了让微信客户端知道当前你的小程序页面定义在哪个目录。
`window`字段 —— 定义小程序所有页面的顶部背景颜色，文字颜色定义等。

备注 : 详情可以参照[这里](https://developers.weixin.qq.com/miniprogram/dev/framework/config.html#%E5%85%A8%E5%B1%80%E9%85%8D%E7%BD%AE)

> 小程序生命周期

|属性	|描述	|触发时机|
| ------ | ------ | ------ |
| [onLaunch](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/app.html#onlaunchobject)  | 生命周期回调—监听小程序初始化 | 小程序初始化完成时（全局只触发一次） |
| [onShow](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/app.html#onshowobject)  | 生命周期回调—监听小程序显示 | 小程序启动，或从后台进入前台显示时 |
| [onHide](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/app.html#onhide)  | 生命周期回调—监听小程序隐藏 | 小程序从前台进入后台时 |
| [onError](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/app.html#onerrorstring-error)  | 错误监听函数 | 小程序发生脚本错误，或者 api 调用失败时触发，会带上错误信息 |
| [onPageNotFound](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/app.html#onpagenotfoundobject) | 页面不存在监听函数 | 小程序要打开的页面不存在时触发，会带上页面信息回调该函数 |


- project.config.json: 通常大家在使用一个工具的时候，都会针对各自喜好做一些个性化配置，例如界面颜色、编译配置等等，当你换了另外一台电脑重新安装工具的时候，你还要重新配置。考虑到这点，小程序开发者工具在每个项目的根目录都会生成一个 project.config.json，你在工具上做的任何配置都会写入到这个文件，当你重新安装工具或者换电脑工作时，你只要载入同一个项目的代码包，开发者工具就自动会帮你恢复到当时你开发项目时的个性化配置，其中会包括编辑器的颜色、代码上传时自动压缩等等一系列选项。(这是之后新增的).

- WXML: 网页编程采用的是 HTML + CSS + JS 这样的组合，其中 HTML 是用来描述当前这个页面的结构布局，CSS 用来描述页面的样子，JS 通常是用来处理这个页面和用户的交互。微信小程序也类似, 其中 WXML 充当的就是类似 HTML 的角色, 代码结构大致如下:

```
<view class="container">
  <view class="userinfo">
    <button wx:if="{{!hasUserInfo && canIUse}}"> 获取头像昵称 </button>
    <block wx:else>
      <image src="{{userInfo.avatarUrl}}" background-size="cover"></image>
      <text class="userinfo-nickname">{{userInfo.nickName}}</text>
    </block>
  </view>
  <view class="usermotto">
    <text class="user-motto">{{motto}}</text>
  </view>
</view>
```

`HTML` 经常会用到的标签是 `div`, `p`,` span` , 而小程序使用的WXML 用的标签是 `view`,`button`, `text` 等等, 就是小程序给开发者包装好的基本能力. 

补充: 多了一些 `wx:if` 这样的属性以及 `{{ }}` 这样的表达式

> 小程序的框架也是用到了MMVM这个思路，如果你需要把一个 Hello World 的字符串显示在界面上, 你可以这样做 。
通过 {{ }} 的语法把一个变量绑定到界面上，我们称为数据绑定。仅仅通过数据绑定还不够完整的描述状态和界面的关系，还需要 if/else, for等控制能力，在小程序里边，这些控制能力都用 wx: 开头的属性来表达。

在WXML文件
```
<text>{{msg}}</text>
```
在xx.js文件
```
this.setData({ msg: "Hello World" })
```

具体演示代码
index.wxml
```
<view>{{ msg }}</view>
    <button bindtap="clickMe">点击我</button>
```
index.js 这里相应用户的点击并把夏天很暖传给view, 并显示出来
```
clickMe: function () {
    this.setData({ msg: "夏天很暖" })
  }
```

[详细可以看这里](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/index.html) 这里不做展开, 如果有下节, 可以继续深入研究.

- app.wxss: 全局样式
- xx.wxss: 单界面样式

>1. 新增了尺寸单位。在写 CSS 样式时，开发者需要考虑到手机设备的屏幕会有不同的宽度和设备像素比，采用一些技巧来换算一些像素单位。WXSS 在底层支持新的尺寸单位 rpx ，开发者可以免去换算的烦恼，只要交给小程序底层来换算即可，由于换算采用的浮点数运算，所以运算结果会和预期结果有一点点偏差。
> 2. 提供了全局的样式和局部样式。和前边 app.json, page.json 的概念相同，你可以写一个 app.wxss 作为全局样式，会作用于当前小程序的所有页面，局部页面样式 page.wxss 仅对当前页面生效。
> 3. 此外 WXSS 仅支持部分 CSS 选择器

备注说明: 全局样式与局部样式
> 定义在 app.wxss 中的样式为全局样式，作用于每一个页面。在 page 的 wxss 文件中定义的样式为局部样式，只作用在对应的页面，并会覆盖 app.wxss 中相同的选择器。

- JS交互: 界面展示为小程序的一部分, 同时也要有和用户的交互, 响应用户的点击、获取用户的位置等。在小程序里边，可以通过编写 JS 脚本文件来处理用户的操作。
[详细请看这里, 事件相关](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html)
>界面生命周期

| 属性 | 类型 | 描述 |
| --- | --- | --- |
| [data](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page.html#data) | Object | 页面的初始数据 |
| [onLoad](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page.html#onloadobject-query) | Function | 生命周期回调—监听页面加载 |
| [onShow](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page.html#onshow) | Function | 生命周期回调—监听页面显示 |
| [onReady](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page.html#onready) | Function | 生命周期回调—监听页面初次渲染完成 |
| [onHide](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page.html#onhide) | Function | 生命周期回调—监听页面隐藏 |
| [onUnload](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page.html#onunload) | Function | 生命周期回调—监听页面卸载 |
| [onPullDownRefresh](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page.html#onpulldownrefresh) | Function | 监听用户下拉动作 |
| [onReachBottom](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page.html#onreachbottom) | Function | 页面上拉触底事件的处理函数 |
| [onShareAppMessage](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page.html#onshareappmessageobject) | Function | 用户点击右上角转发 |
| [onPageScroll](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page.html#onpagescrollobject) | Function | 页面滚动触发事件的处理函数 |
| [onResize](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page.html#onresize) | Function | 页面尺寸改变时触发，详见 [响应显示区域变化](https://developers.weixin.qq.com/miniprogram/dev/framework/view/resizable.html#%E5%9C%A8%E6%89%8B%E6%9C%BA%E4%B8%8A%E5%90%AF%E7%94%A8%E5%B1%8F%E5%B9%95%E6%97%8B%E8%BD%AC%E6%94%AF%E6%8C%81) |
| [onTabItemTap](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page.html#ontabitemtapobject) | Function | 当前是 tab 页时，点击 tab 时触发 |
| 其他 | Any | 开发者可以添加任意的函数或数据到 `Object` 参数中，在页面的函数中用 `this` 可以访问 |

五. 其他

支持的运算: 基本运算(`+` `-` `*` `/` `%`), 位运算(`&`  `^`  ` !`  `<<` ` >>` ) , 比较运算 (`<`  `>` `<=` `>=` ), 一元运算, 二元运算, 三目运算等.

[详细可以看这里](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxs/04operator.html)

支持的语句: `if`, `switch`, ` for`, while, `do ... while`;

六. 一个列表代码示例
![屏幕快照 2018-11-20 上午12.53.52.png](https://upload-images.jianshu.io/upload_images/1506501-01904d9900ec180f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### test.js

```
var app = getApp()
Page({
  data: {
    userInfo: {},
    userListInfo: [{
      text: '我的订单',
      isunread: true,
      unreadNum: 2,
      icon: '../resource/jiantou.png',
      des: '夏天很暖111111111111'
    }, {
      text: '我的代金券',
      isunread: false,
      unreadNum: 2,
      des: '夏天很暖2222222222222'
    }, {
      text: '我的拼团',
      isunread: true,
      unreadNum: 1,
      des: '夏天很暖33333333'
    }, {
      text: '收货地址管理',
      isunread: true,
        unreadNum: 2
    }, {
      text: '联系客服',
      isunread: true,
        unreadNum: 2
    }, {
      text: '常见问题',
      isunread: true,
        unreadNum: 2
      }, {
        text: '收货地址管理',
        isunread: true,
        unreadNum: 2
      }, {
        text: '联系客服',
        isunread: true,
        unreadNum: 2
      }, {
        text: '常见问题',
        isunread: true,
        unreadNum: 2
      }, {
        text: '收货地址管理',
        isunread: true,
        unreadNum: 2
      }, {
        text: '联系客服',
        isunread: true,
        unreadNum: 2
      }, {
        text: '常见问题',
        isunread: true,
        unreadNum: 2
      }
    ]
  }
})
```
### test.wxml
```
<block wx:for="{{userListInfo}}" wx:for-item="item" wx:for-index="index">
	<view class="ui_cell">

		<view class="ui_cell_bd">
			<view class="ui_cell_bd_p"> {{item.text}} </view>
      <view class="ui_cell_title"> {{item.des}} </view>
		</view>
    
		<view wx:if="{{item.isunread}}" class="badge">{{item.unreadNum}}      </view>

		<view class="with_arrow">
      <image style="width: 20px; height: 15px"src="../resource/jiantou.png"></image>
    </view>

	</view>
</block>
```
### test.wxss
```
/* 

*** position: 属性规定元素的定位类型
*absolute: 生成绝对定位的元素，相对于 static 定位以外的第一个父元素进行定位。
元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。
*fixed: 生成绝对定位的元素，相对于浏览器窗口进行定位。
元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。
*relative: 生成相对定位的元素，相对于其正常位置进行定位。
因此，"left:20" 会向元素的 LEFT 位置添加 20 像素。

*** display: 属性规定元素应该生成的框的类型 * * *http://www.w3school.com.cn/cssref/pr_class_display.asp
*
*/

/*
** padding: 简写属性在一个声明中设置所有内边距属性
* padding:10px 5px 15px 20px; 上右下左
* padding:10px 5px 15px; 上右下
* padding:10px 5px; 上下10 左右5
* padding:10px; 四边
*/

.ui_cell {
	position: relative;
	display: flex;
	padding: 15px;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	border-bottom: 1px solid #dadada;
  background-color: #304457
}
.weui_cell_hd {
	display: inline-block;
	width: 20px;
	margin-right: 5px;
}
 
.ui_cell_hd {
	display: inline-block;
	width: 20px;
	margin-right: 5px;
  background-color: #2600ff
}

.ui_cell_bd_p {
    background-color: #dd0ecc41
}
 
.ui_cell_bd {
	display: inline-block;
  background-color: #dadada;
}

.badge {
	position: absolute;
	top: 18px;
	right: 40px;
	width: 15px;
	height: 15px;
	line-height: 15px;
	background: #ff0000;
	color: #fff;
	border-radius: 50%;
	text-align: center;
	font-size: 8px;
}
 
.with_arrow {
	position: absolute;
	top: 18px;
	right: 15px;
	width: 15px;
	height: 15px;
  background-color: #ff0000;
}
```
