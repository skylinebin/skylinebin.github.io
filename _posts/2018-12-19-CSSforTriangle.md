---
layout: post
title:  "用CSS画很多种三角形"
date:   2018-12-19 19:45:31
image: 'https://store.skylinebin.com/CSS.jpg'
description: 'Draw a triangle by CSS'
tags:
- CSS
- CODE
- FrontEnd
categories:
- SkylineBin
twitter_text: '用CSS画很多种三角形'
---  

&nbsp;&nbsp;&nbsp;&nbsp;最近在整理浏览器相关的东西，一时间也不能把握全局，整理不出比较系统的学习文章。正好在看前端优化相关的书籍时，看到了用 CSS 画三角形，之前我也整理过相关的笔记。这个算是 CSS 应用的基础，但又很常见，就顺带整理一篇比较完整一些的吧。  

### CSS 三角形的应用场景  
在前端页面中，有很多地方均能够看到三角形的应用。比如，Google 首页的应用下拉框的三角形：

![Google 首页的CSS三角形](https://store.skylinebin.com/image/css/triangle/usingTriangleinGoogle.png)  
其实现的样式如下所示：  
```css
.gb_wb {
    border-color: transparent;
    border-style: dashed dashed solid;
    border-width: 0 8.5px 8.5px;
    position: absolute;
    left: 6.5px;
    z-index: 1;
    height: 0;
    width: 0;
    animation: gb__a .2s;
    border-bottom-color: rgba(0,0,0,.2);
    top: 36px;
}
.gb_vb {
    border-color: transparent;
    border-bottom-color: #fff;
    border-style: dashed dashed solid;
    border-width: 0 8.5px 8.5px;
    position: absolute;
    left: 6.5px;
    top: 37px;
    z-index: 1;
    height: 0;
    width: 0;
    animation: gb__a .2s;
}
```  
上述代码中的两个三角形样式就是构成应用下拉框的指示三角形，也是后文会提到的 有边缘色的三角形。  
此外 segmentfault 里面支持与赞成的 tooltip 里面也有 CSS 三角形，如下图所示：
![segmentfault 的CSS三角形](https://store.skylinebin.com/image/css/triangle/usingTriangle.png)

上图中的button 里的三角形是用的 [svg 的图片](https://cdn.segmentfault.com/v-5c19e300/global/img/vote-bg.svg) 定位作为背景实现的，而 tooltip 三角形实现代码主要如下：
```css
.tooltip-arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid
}

.tooltip.top .tooltip-arrow {
    bottom: 0;
    left: 50%;
    margin-left: -5px;
    border-width: 5px 5px 0;
    border-top-color: #000
}
```  
除此之外，日常使用的 三角形还有通过 icon 实现的，例如 [bootstrap 图标](http://www.tutorialspoint.com/bootstrap/bootstrap_glyph_icons.htm) 中的 play 图标就是一个三角形 ".glyphicon .glyphicon-play"  
同样，[iconfont](http://www.css3china.com/wp-content/iconfont/demo.html) 中的 " arrowhead right" 与 " arrowhead left" 均为三角形的样子。  
但是，由于 CSS 实现的三角形不需要引入外部文件，并且兼容性强，用 CSS 画三角形一直应用广泛，经久不衰，值得好好总结。  

### 三角形的基本画法  

线上网站常见到的三角形原理基本都是 更改 div 元素的样式里的 border 属性，是用 border 画出来的。  
于是就有了一个 div 的演化之路：  
```html
<div class="triangle"></div>
```  
当样式为：  
```css
.triangle {
    border-top: 50px solid #000;
    border-right: 50px solid #333;
    border-bottom: 50px solid #666;
    border-left: 50px solid #999;
    width: 100px;
    height: 100px;
    background-color: #ccc;
}
```  
又是有了下图中的，有明显边框的正方形：  

![div with border](https://store.skylinebin.com/image/css/triangle/divtoTri_1.png)  
当 width 和 height 均变为 0 时，有：  
```css
.triangle {
    border-top: 50px solid #000;
    border-right: 50px solid #333;
    border-bottom: 50px solid #666;
    border-left: 50px solid #999;
    width: 0;
    height: 0;
    background-color: #ccc;
}
``` 
此时，div 变成了：  

![div with border2](https://store.skylinebin.com/image/css/triangle/divtoTri_2.png)  

此时，再将 border-top 去掉，即：  
```css
.triangle {
    border-right: 50px solid #333;
    border-bottom: 50px solid #666;
    border-left: 50px solid #999;
    width: 0;
    height: 0;
    background-color: #ccc;
}
``` 
此时 div 的形状为：  

![div with border3](https://store.skylinebin.com/image/css/triangle/divtoTri_3.png)  

在此情况下，将两侧的 border (border-left 与 border-right) 变透明，即：  
```css
.triangle {
    border-right: 50px solid transparent;
    border-bottom: 50px solid #666;
    border-left: 50px solid transparent;
    width: 0;
    height: 0;
    background-color: #fff;
}
```  
此时，就有了三角形：  

![triangle by css](https://store.skylinebin.com/image/css/triangle/divtoTri_4.png)  

注意，这里的 div 的背景应与 需要显示三角形的背景保持一致。  
同理，不设置对侧的 border，将两侧的 border 设置成透明，就有了不同形状的三角形，即：  
```css
.triangle-bottom {
    border-right: 50px solid transparent;
    border-bottom: 50px solid #666;
    border-left: 50px solid transparent;
    width: 0;
    height: 0;
    background-color: #fff;
}
.triangle-left {
    border-top: 50px solid transparent;
    border-bottom: 50px solid transparent;
    border-left: 50px solid #666;
    width: 0;
    height: 0;
    background-color: #fff;
}
.triangle-top {
    border-right: 50px solid transparent;
    border-top: 50px solid #666;
    border-left: 50px solid transparent;
    width: 0;
    height: 0;
    background-color: #fff;
}
.triangle-right {
    border-right: 50px solid #666;
    border-bottom: 50px solid transparent;
    border-top: 50px solid transparent;
    width: 0;
    height: 0;
    background-color: #fff;
}
```  
对应着下图中的各种角度的三角形：  

![four kinds of triangle by css](https://store.skylinebin.com/image/css/triangle/divtoTri_5.png)  

<br>

### 更改三角形角度的画法  

上述画法是通过平分一个正方形的内部实现的，得到的是一个直角三角形。日常使用中，更多的是用到 等边三角形。  
实现等边三角形的思路是，将 90 度 -> 60 度，可以通过保持两侧 border 宽度不变，加大底边这一侧 border-*-width 来实现。同样的实现思路，先实现一个更易理解的直角三角形，立起来的直角三角形。  
对于底边在下面的三角形，加大 border-left 的宽度，可以增加左侧边的长度，减小 border-right 的宽度，可以降低右侧边的长度。当右侧边长度为0时，就出现了立起来的直角，即：  
```css
.triangle {
    /* border-right: 0 solid transparent; */
    border-bottom: 40px solid #666;
    border-left: 60px solid transparent;
    width: 0;
    height: 0;
    background-color: #fff;
}
```  
此时，形状为：  

![triangle with 2 line css](https://store.skylinebin.com/image/css/triangle/divtoTri_6.png)  

border-left 决定了底边，border-bottom 决定了高。  
余弦定理，等边三角形的高是底边的 sqrt(3)/2 倍。  
立起来的三角形中，底边是由 border-left 和 border-right 加起来得到的，底边的高是 border-bottom 的宽度。  
当 border-bottom 为 50px 时，此时左右宽度均为： 50px / sqrt(3) -> 29px。
为了看起来比较圆润一些，也可是使用： 50px * sqrt(2) / 2 -> 35px;
```css
.triangle {
    border-right: 35px solid transparent;
    border-bottom: 50px solid #666;
    border-left: 35px solid transparent;
    width: 0;
    height: 0;
    background-color: #fff;
}
```  
即如下图所示的标准与改进版的三角形：  

![triangle with diff](https://store.skylinebin.com/image/css/triangle/divtoTri_7.png)  

上图中的标示是指的 底边与高的关系。  
这种方法有一个不可避免的问题，因为像素没有小数点，所以一般都是近似的赋值，绝对的等边三角形也要分大小才可实现。  

<br>

### 带边缘色的三角形画法  

tip 的提示框和其他聊天消息框一般都有一个边框色，如果想要一个三角形指示，就需要一个带边缘色的三角形。其实现原理是：  
先画一个深色的三角形，然后在画一个同样大小的白色三角形盖在它上面，两个三角形错开 2 个像素，此时，深色三角形的边缘正好可以露出一个像素，即有了带边缘色的三角形。  
先画一个深色的三角形附着在对话框上，有：  
```css
.msg {
    width: 300px;
    height: 100px;
    border: 1px solid #ccc;
    border-radius: 2px;
    position: relative;
}
.msg:before {
    content: "";
    position: absolute;
    left: -10px;
    top: 44px;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-right: 10px solid #ccc;
}
```  
此时只有一个 深色的三角形在对话框的左侧，如下图：  

![tip with triangle](https://store.skylinebin.com/image/css/triangle/divtoTri_8.png)  

之后再画一个白色的三角形覆盖上去，错开 2 个像素，即：
```css
.msg {
    width: 300px;
    height: 100px;
    border: 1px solid #ccc;
    border-radius: 2px;
    position: relative;
}
.msg:before {
    content: "";
    position: absolute;
    left: -10px;
    top: 44px;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-right: 10px solid #ccc;
}
.msg:after {
    content: "";
    position: absolute;
    left: -8px;
    top: 44px;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-right: 10px solid #fff;
}
```  
可得到较为使用的 边缘三角形：  

![tip with a border triangle](https://store.skylinebin.com/image/css/triangle/divtoTri_9.png)  

之所以要右移 2px ，可以按照下图的思路理解，30度对应的边相对垂直平移了 1px :  

![move with triangle](https://store.skylinebin.com/image/css/triangle/divtoTri_10.png)

若画出的框需要添加阴影，三角形的阴影会跟着 class="msg" 的 div 一起加：
```css
.msg {
    filter: drop-shadow(0 0 2px #999);
    background-color: #fff;
}
```
即加入阴影后的整体效果为:  

![tip with shadow](https://store.skylinebin.com/image/css/triangle/divtoTri_11.png)

至此，CSS 画三角形算是整理完了，以上情况可以应对大多数需要三角形的场景。
<br>

### CSS 画其他图形  

[CSS-Tricks](https://css-tricks.com/) 网站还展示了用 CSS 画其他形状的代码。  
其中，画爱心的代码用到了CSS 中的 transform，实现代码如下：  
```css
.heart {
    position: relative;
    width: 100px;
    height: 90px;
}
.heart:before,
.heart:after {
    position: absolute;
    content: "";
    left: 50px;
    top: 0;
    width: 50px;
    height: 80px;
    background: red;
    border-radius: 50px 50px 0 0;
    transform: rotate(-45deg);
    transform-origin: 0 100%;
}
.heart:after {
    left: 0;
    transform: rotate(45deg);
    transform-origin: 100% 100%;
}
```  
具体的效果如下：  

![div to heart](https://store.skylinebin.com/image/css/triangle/divtoheart.png)  

详细的实现过程，后面我再慢慢分析，CSS 的学习和积累是一个漫长的过程，慢慢来吧！ 


### References  
- [《高效前端：Web高效编程与优化实践》](https://www.amazon.cn/dp/B07BF854RT/ref=tmm_pap_swatch_0?_encoding=UTF8&qid=1545218431&sr=8-1)  
- [The Shapes of CSS](https://css-tricks.com/the-shapes-of-css/)

