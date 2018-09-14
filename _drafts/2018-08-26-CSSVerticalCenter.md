---
layout: post
title:  "CSS垂直居中的几种实现形式"
date:   2018-08-20 19:40:31
image: 'https://store.skylinebin.com/CSS.jpg'
description: 'Basic knowledge of css style'
tags:
- JavaScript
- FrontEnd
- CODE
categories:
- SkylineBin
twitter_text: 'CSS垂直居中 '
---  


## CSS垂直居中与原理解析  

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






## 参考文献  
1. [纯CSS实现垂直居中的几种方法](https://www.cnblogs.com/hutuzhu/p/4450850.html)  
2. [CSS秘密花园：垂直居中](https://www.w3cplus.com/css3/css-secrets/vertical-centering.html)  
3. [CSS权威指南(第三版)](https://www.amazon.cn/CSS%E6%9D%83%E5%A8%81%E6%8C%87%E5%8D%97-%E8%BF%88%E8%80%B6/dp/B0011F5SIC)  