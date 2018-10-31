---
layout: post
title:  "CSS垂直居中的几种实现形式"
date:   2018-10-31 21:08:31
image: 'https://store.skylinebin.com/CSS.jpg'
description: 'Basic knowledge of css style'
tags:
- CSS
- FrontEnd
- CODE
categories:
- SkylineBin
twitter_text: 'CSS垂直居中 '
---  


## CSS垂直居中解析  

垂直居中是前端页面排版中常常会用到的一种形式，因为应用场景普遍，但情况又比较多变，实现起来也就变的很诡异，所以，我就单独拿出来总结一遍。  

### CSS公共部分  
因为要对比不同的实现方法，所以给个调整CSS的公共部分。实现的 DOM 和 Style 分别如下所示：  
HTML 中的 DOM：
```html
    <div class="main container">
        <span>需要垂直居中的元素</span>
    </div>
```
CSS 定义的样式:  
```css
.main {
    height: 200px;
    width: 100%;
    background: #001589;
    color: white;
}
```
未进行垂直居中前的效果如下图所示：  
![未设置垂直居中时](https://store.skylinebin.com/image/css/original.png)  


### display:flex实现垂直居中  

实现 CSS 为：  
```css
.container {
    display: flex;
    justify-content: center;
    align-items: center;
}
```

实现原理：**Flex 布局** ，阮一峰有几篇博客特意介绍 [Flex布局](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html) 的使用，后面有机会可以总结提炼一下。这里实现垂直居中主要是利用 flex 布局里的 **justify-content** 属性 和 **align-items** 属性。justify-content 是定义项目在主轴(横向)上的对齐方式，取 center 是项目主轴居中；align-items 是定义项目在交叉轴(纵向)上的对齐方式，取 center 表示交叉轴的重点对齐。以此实现垂直居中的效果。具体效果如下：  

![use flex to be in center](https://store.skylinebin.com/image/css/flextocenter.png)  


### position:absolute 实现垂直居中  

这种绝对定位的方式实现垂直居中在很多地方都有应用，实现的 CSS 为：  
```css

.container span {
    width: 50%; 
    height: 50%; 
    background: #000;
    overflow: auto; 
    margin: auto; 
    position: absolute; 
    top: 0; left: 0; bottom: 0; right: 0; 
}

```
这里的 main里面设置的样式需要注释掉。  
另一种固定宽度和高度的绝对定位的写法如下：  
```css
.container  {
    position: absolute;
    top: calc(50% - 4em);
    left: calc(50% - 10em);
    /* 8/2 = 4 */
    /* 20/2 = 10 */
    width: 20em;
    height: 8em;
}

```
第二种的原理大概是通过移动元素的左上角到中心点，然后通过 margin 元素宽高的一半，实现居中的，重点是负边距。  


### translate 实现垂直居中  
这种方法实际上还是通过移位的形式实现居中，CSS 实现如下：  
```css
.container span {
    position: absolute; 
    top: 50%; 
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
}

```
这里的移动是通过在 transform 里使用 translate 相对自己的宽高移动。  

### display:flex 与 margin:auto 配合实现垂直居中  
在这里，父元素使用 flex 属性，子元素如果使用 margin:auto，即可实现垂直居中：  
```css
.container {
    display: flex;
    text-align: center;
}

.container span {
    margin: auto;
}

```  
看来，还是flex布局方式好用啊！这里没有指定宽度时，也可以居中，指定的宽度相当于 max-content .  


### display:inline-block 实现垂直居中  

将需要垂直居中的元素的 display 设置成 inline-block 并使用伪元素选择器来占位。CSS 样式如下：  
```css
.container {
    text-align: center;
}

.container span {
    vertical-align: middle;
    display: inline-block;
}

.container:after {
    content: '';
    width: 0;
    height: 100%;
    display: inline-block;
    vertical-align: middle;
}

```
display:inline-block 将对象呈递为内联对象，但是对象的内容作为块对象呈递。:after的伪元素来占位，并且搭配 vertical-align: middle; 实现内部的元素被充起来。  


### -webkit-box 实现垂直居中  
通过使用 -webkit-box 盒模型的几个属性，可以实现元素的垂直居中，CSS 样式如下:  
```css
.container {
    display: -webkit-box;
    -webkit-box-pack: center;
    -webkit-box-align: center;
    -webkit-box-orient: vertical;
    text-align: center;
}
```
其中  -webkit-box-pack: center 表示元素水平居中对齐，-webkit-box-orient: vertical; 表示子元素的排列以竖排的形式实现。这种实现垂直居中的效果也还不错。  


### 相对视窗实现 视窗的垂直居中  
这里的实现效果是，container 整体一直处于视窗的正中心，也有用处的。CSS实现样式为：
```css
.container {
    width: 20em;
    padding: 1em 1.5em;
    margin: 50vh auto 0;
    transform: translateY(-50%);
}
```
上面的 vh 是指相对于视窗高度的 1% , 视窗的中心用法有很多，后面如果有其他视窗的操作再尝试拓展吧~


上面的方法比较稳定不易出现 bug 的是 **display:flex** 和 **display: -webkit-box** 这两种，后面可以使用~如果遇到问题再及时补充吧！



## 参考文献  
1. [纯CSS实现垂直居中的几种方法](https://www.cnblogs.com/hutuzhu/p/4450850.html)  
2. [CSS秘密花园：垂直居中](https://www.w3cplus.com/css3/css-secrets/vertical-centering.html)  
3. [CSS权威指南(第三版)](https://www.amazon.cn/CSS%E6%9D%83%E5%A8%81%E6%8C%87%E5%8D%97-%E8%BF%88%E8%80%B6/dp/B0011F5SIC)  