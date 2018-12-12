---
layout: post
title:  "Page Visibility API 以及应用"
date:   2018-11-20 14:40:31
image: 'https://store.skylinebin.com/JavaScript.jpg'
description: 'Basic knowledge of Page Visibility API'
tags:
- JavaScript
- FrontEnd
- CODE
- W3C
categories:
- SkylineBin
twitter_text: 'JavaScript控制标签title切换 '
---  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;之前看到一个页面根据用户是否定位当前标签来更改 title ，觉得有些意思，然后特意了解了一下实现原理，发现是和 Page Visibility API 相关的，并且在前端页面优化方面也能用到，就整理一下相关的知识。整体的思路是：  
js控制标签title的改变 -> 判断用户是否可见情况下 -> Page Visibility API -> 可以应用及可能优化的地方。

### Page Visibility API
Page Visibility API 是 W3C 制定的一个页面是否可见的草案(Page Visibility)， 截止到总结这部分知识点 Page Visibility 上一个更新的时间是 2018年10月17日。  
Page Visibility API 具有通用性，无论是移动端还是Web端均可适用。Page Visibility API 主要包括以下三个属性：  
- document.hidden  
- document.visibilityState  
- visibilitychange Event (document.onvisibilitychange)  

下面针对三个属性对应取值作出详细说明。

#### document.visibilityState 属性值  
document.visibilityState 属性 当前版本可以取以下三个值：  
- **"hidden"**:  The Document is not visible at all on any screen.  
- **"visible"**:  The Document is at least partially visible on at least one screen. This is the same condition under which the **document.hidden** attribute is set to **false**.  
- **"prerender"**: The Document is loaded in the prerender mode and is not yet visible.(not all browsers will necessarily support it)  
- **~~"unloaded"~~(abandoned)**:  if the document is to be unloaded (*VisibilityState.unloaded has been removed.*)  

```javascript
enum VisibilityState {
  "hidden", "visible", "prerender"
};
```
也就是说，现在常用的共有 三种值 **hidden**, **visible**, **prerender**。因为预渲染功能并非所有浏览器都支持，这个使用时需要注意兼容性。

document.visibilityState 属性取 **"hidden"** 值出现的情况有以下几种：  
- 浏览器最小化 (The user agent is minimized.)  
- 浏览器切换了背景页，即用户切换了浏览器当前显示的页面 (The user agent is not minimized, but doc is on a background tab.)  
- 浏览器即将卸载页面 (The user agent is to unload doc.)  
- 操作系统触发锁屏 (The Operating System lock screen is shown.)  

在页面关闭前，**document.visibilityState 属性值**一定会变成 **"hidden"**，需要注意的是，该属性只针对顶层窗口，并不影响内嵌页面的可见性。  

#### document.hidden 属性值  
该属性值是一个遗留的问题 *(Document.hidden **is historical**. **Use Document.visibilityState instead.**)*。  
只有在 **document.visibilityState** 为 **"visible"** 时，**document.hidden** 属性为 **"false"**，其他情况都是 **"true"**。  
>  Support for hidden attribute is maintained for historical reasons. Developers should use visibilityState where possible.  

所以啊，如果可能，尽量使用 document.visibilityState 这个属性。  

#### visibilitychange 事件  
当 **document.visibilityState** 属性值发生变化时，就会触发 **visibilitychange** 事件。可以使用添加事件监听器的方式(**document.addEventListener()**)，或者监听 **document.onvisibilitychange** 属性值的变化，来监听页面的变化。  
最常用的用法如下所示：  
```javascript
// page visibility API
document.addEventListener('visibilitychange', function () {
    // when user leaves this page
    if (document.visibilityState == 'hidden') {
        document.title = "Don't leave me alone~";
    }

    // when user comes back
    if (document.visibilityState == 'visible') {
        document.title = "JavaScript~";
    }
})
```  

[ruanyifeng博客](http://javascript.ruanyifeng.com/htmlapi/pagevisibility.html) 里面也给出了暂停播放视频的示例代码：  
```javascript
// Pause video play when visibilitychange

let vedioElement = document.getElementById('vedio');
document.addEventListener('visibilitychange', changeVedioState);

function changeVedioState() {
    if (document.visibilityState == 'hidden') {
        vedioElement.pause();
    } else if (document.visibilityState == 'visible') {
        vedioElement.play();
    }
}
```

此外，也可以使用 document.onvisibilitychange 来完成相应的监听：  
```javascript
document.onvisibilitychange = function (){
// when user leaves this page
    if (document.visibilityState == 'hidden') {
        document.title = "Don't leave me alone~(つд⊂)";
    }

// when user comes back
    if (document.visibilityState == 'visible') {
        document.title = "JavaScript~";
    }
}
```

对于针对浏览器兼容性，所给出的添加前缀的方法，也可以参考：  
```javascript
function getVisibilityState() {
    var prefixes = ['webkit', 'moz', 'ms', 'o'];
    // Chrome/Safari -> webkit
    // Firefox -> moz
    // IE -> ms
    // Opera -> o
    if ('visibilityState' in document) return 'visibilityState';
    for (var i = 0; i < prefixes.length; i++) {
        if ((prefixes[i] + 'VisibilityState') in document)
            return prefixes[i] + 'VisibilityState';
        }
        return null;
    }
}
```
即监听事件，再获取状态(添加特定前缀)，根据状态作出判断。  
此外我又查了 **visibilityState** 的兼容性，基本就剩 *IE* 旧版本 和 *Opera* 的没兼容了。  

![Can I Use visibilityState](https://store.skylinebin.com/image/blog/CanIUseVisibilityState.png)  

#### Upload Page  
页面卸载一般指的是：  
- 页面可见时，用户 关闭标签页或关闭浏览器窗口  
- 页面可见时，用户在当前页面前往另一个页面  
- 页面不可见时，用户或系统关闭浏览器窗口  

以上三种情况都可当作页面卸载。  
监听页面卸载之前常用的方法有监听 "pagehide"、"beforeunload"、"unload" 事件, 而监听 **visibilitychange 事件** 可以完全替代前面的方法。

### Page Visibility API可带来性能优化  
使用 Page Visibility API 可以给页面带来以下几方面的性能优化相关的好处：  
- 标签页隐藏时停止播放音乐或视频，节省资源的占用。  
- 标签页隐藏时停止一些不必要的轮询，可以节省服务器的开销。  
- 标签页隐藏时还可以停止一些诸如轮播等页面循环动画效果等等，节省本地的开销。  

所以，**JavaScript 监听标签页的切换Title** 主要是通过 使用 Page Visibility API 监听页面是否可见从而改变title 实现的。 过两天也给索引页加上这个，增强用户交互的体验~


### Reference Sites  
- [https://www.yduba.com/qianduan-1491588986.html](https://www.yduba.com/qianduan-1491588986.html)  
- [https://w3c.github.io/page-visibility/](https://w3c.github.io/page-visibility/)  
- [https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API)  
- [https://www.html5rocks.com/en/tutorials/pagevisibility/intro/](https://www.html5rocks.com/en/tutorials/pagevisibility/intro/)  
- [http://javascript.ruanyifeng.com/htmlapi/pagevisibility.html](http://javascript.ruanyifeng.com/htmlapi/pagevisibility.html)  
- [https://www.w3.org/TR/page-visibility/](https://www.w3.org/TR/page-visibility/)  
- [https://davidwalsh.name/page-visibility](https://davidwalsh.name/page-visibility)  

