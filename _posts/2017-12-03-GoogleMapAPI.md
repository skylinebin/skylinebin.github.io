---
layout: post
title:  "GoogleMap API 使用总结"
image: ''
date:   2017-12-02 01:06:21
tags:
- Script
- FrontEnd
- GoogleMap
- Command
description: 'Some tips about GoogleMap API'
categories:
- SkylineBin
twitter_text: 'Some tips about GoogleMap API'
---

# GoogleMap API 学习

前提：在GoogleAPI开发者中心（https://console.developers.google.com/project）有创建过项目，在库中添加启用Google Maps JavaScript API，在凭据中获取密钥，并设置密钥的访问规则，完成以上工作后，才会有使用GoogleMapAPI的key，才能在页面中使用GoogleMap显示功能。
![MyGoogleMapAPIKey](https://store.skylinebin.com/image/blog/GoogleMapGoogleMapKey.png)


使用获得的官方key的方式只需要引入外部js一样，引入script标签。
官方给的API接口的小Demo如下所示：
```javascript
<!DOCTYPE html>
<html>
<head>
<script src="http://maps.googleapis.com/maps/api/js?key=AIzaSyAfXqW_NCcDT4xXIuM5osLZP0mO6BaWECc&sensor=false">
</script>

<script>
function initialize()
{
    var mapProp = {
        center:new google.maps.LatLng(1.347447,103.682663),
        zoom:13,
        mapTypeId:google.maps.MapTypeId.ROADMAP
    };
    var map=new google.maps.Map(document.getElementById("googleMap"), mapProp);
}

google.maps.event.addDomListener(window, 'load', initialize);
</script>
</head>

<body>
<div id="googleMap" style="width:800px;height:480px;"></div>

</body>
</html>


```
以上代码运行结果如下图所示：
![LittleGoogleMapDemo](https://store.skylinebin.com/image/blog/GoogleMapNYTU.png)

上图选取的地点是Nanyang Technological University（南洋理工大学），放大的倍数是13，显示的模式是街道模式，有了官方的key之后，调用起来很方便。

以上代码拆分及解析：
### 1.初始化标准
这里的初始化原本是指HTML&CSS的基本操作，即下面的这段代码:
```html
<!DOCTYPE html>
<style type="text/css">
html {height:100%}
body {height:100%;margin:0;padding:0}
#googleMap {height:100%}
</style>
<body>

</body>
</html>
```
上面的代码是标准规范的一些操作，在意识上，使用一个接口的时候，要先对这个接口的样式进行标准化一下，只是为了规范。这里想起了Vue.js里面在单个页面里面样式和DOM以及Script都能写在一起，确实在实现编码过程的时候，很随意，让人比较舒服。

### 2.添加GoogleMap API Key
像其他CDN的js文件的引入规则一样，需要将引入key的链接写在script标签中，
```javascript
<script src="http://maps.googleapis.com/maps/api/js?key=AIzaSyAfXqW_NCcDT4xXIuM5osLZP0mO6BaWECc&sensor=false"></script>
```
上面的key是开发者自己申请的，请求的链接为 http://maps.googleapis.com/maps/api/js，传递的参数有key和sensor两个：

* key:开发者申请的API key
* sensor:sensor参数是必须的，用来使能是否调用用户设备的传感器来定位用户的位置。可选参数为true和false

### 3.GoogleMap API 支持异步加载
GoogleMap API的异步加载，可以在整个页面其他内容全部加载完成后，再显示需要显示的地图数据。
若使用异步加载的javascript代码：
```javascript
function loadScript(){
     var script = document.createElement("script");
     script.type = "text/javascript";
      script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBzE9xAESye6Kde-3hT-6B90nfwUkcS8Yw&sensor=false&callback=initialize";
      document.body.appendChild(script);
}
window.onload = loadScript;

```
写在loadScript( )函数中的就是引入API的Script，在标签之后还加上了callback=initialize的参数，initialize( )函数会在整个API载入后执行。
使用window.onload来实现页面加载后再载入GoogleMap。

### 4.Map属性的确定
以下代码用来确定整个地图的某些属性：
```javascript
function initialize()
{
    var mapProp = {
        center:new google.maps.LatLng(1.347447,103.682663),
        zoom:13,
        mapTypeId:google.maps.MapTypeId.ROADMAP
    };
    var map=new google.maps.Map(document.getElementById("googleMap"), mapProp);
}

```
首先创建一个Map对象定义地图属性：
- center:指定地图的中心，使用经纬度来确定中心位置
- zoom:指定地图的缩放等级，当zoom=0时，显示的是整个地球未缩放的状态
- mapTypeId:指定地图的初始显示类型，共有四种可供选择

<strong>center</strong>属性可以直接使用经纬度坐标来作为中心点，一般可以用GoogleMap API中的方法定义一个位置变量，然后直接调用：
```javascript
var markerpoint = new google.maps.LatLng(30.512851,114.343816);

var mapProp = {
        center:markerpoint,
        zoom:13,
        mapTypeId:google.maps.MapTypeId.ROADMAP
    };

```
 以变量的形式调用和引用，应该更符合规范。

<strong>mapTypeId</strong>的四种类型有：

* 主要街道透明层（google.maps.MapTypeId.HYBRID）
* 普通的街道地图（google.maps.MapTypeId.ROADMAP）
* 卫星图像（google.maps.MapTypeId.SATELLITE）
* 有自然特征的地图（google.maps.MapTypeId.TERRAIN）

四种显示类型对比如下图所示：
![Four kinds of MapType](https://store.skylinebin.com/image/blog/GoogleMapNanYang.png)

在需要显示地图页面中创建一个id为googleMap的DOM，用于存放显示地图
```html

<div style="width:800px;height:480px;" id="googleMap"></div>


```
创建一个Map对象将定义的属性和DOM对象关联起来:
```javascript
var map=new google.maps.Map(document.getElementById("googleMap"), mapProp);
```
<strong>加载创建的Map地图对象</strong>
```javascript
google.maps.event.addDomListener(window, 'load', initialize);
```
页面完全载入后就能加载指定的Google地图。

### 5.Google地图叠加层处理
叠加层是地图上绑定到经纬度坐标的对象，会跟随地图放大缩小的移动而始终标记对应的地理坐标点。
在Google地图中加入标记，地图上的标记主要有以下几类：

* 地图上的点：使用标记来显示，可以通过GIcon类型的对象来自定义图标。
* 地图上的线使用折线（表示点的集合）来显示。线是类型为 GPolyline 的对象。
* 地图上的区域显示为多边形（如果是任意形状的区域）或底面叠加层（如果是矩形区域）。多边形类似于闭合的折线，因此可以是任何形状。地面叠加层通常用于地图上与图块有直接或间接关联的区域。
* 地图本身使用图块叠加层显示。如果您有自己的系列图块，可以使用 GTileLayerOverlay 类来改变地图上已有的图块，甚至可以使用 GMapType 来创建您自己的地图类型。
* 信息窗口是特殊的叠加层，会被自动添加入地图，且地图只能添加一个类型为GinfoWindow的对象。

在地图上添加标记点，一般通过 setMap() 方法:
```javascript
    var map4=new google.maps.Map(document.getElementById("googleMapfour"), mapPropfour);
    var marker = new google.maps.Marker({
	    position: markerpoint,
    });
    marker.setMap(map4);
```
使用以上方法可以在地图上的指定点添加标记位置。



#### 写在后面
今年八月的时候，我测试这个API的时候还不用科学上网，但是四个月过后的今天，获取API认证的时候，居然访问不了了，真的很心痛啊！封闭导致自嗨，自嗨导致自大，自大导致落后！惊人的相似！

GoogleMap API的资源加载如下图所示：
![LoadingGoogleMapResource](https://store.skylinebin.com/image/blog/GoogleMaptestNetwork.png)
