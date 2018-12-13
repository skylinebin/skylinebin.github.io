---
layout: post
title:  "首页修复及js使用"
date:   2017-05-04 22:23:31
image: '/assets/img/mengg.jsp'
description: 'about JavaScript'
tags:
- CODE
- JavaScript
categories:
- SkylineBin
twitter_text: 'How to use JavaScript to uncheck '
---

### 写EPC标签完成后学习到的东西

记录一下新浪的图标被修复了之前出现  


#### 在首页修复之前
<img src="../assets/img/shareEPC/repairsina.png" alt="主页之前的bug">  

### 首页修复之后  

<img src="../assets/img/shareEPC/rightsina.png" alt="主页之后的bug">  

修复该bug的代码如下：  
注释掉 svg-icons.html 里面 icon-sina-weibo 的图标的默认颜色 'fill="#5d4d7a"'    
bug 出现原因分析: svg使用了fill默认的颜色后,再对其操作的css样式就不能起作用。

#### 输入框取消选中的代码  

在回车触发事件后，需要将输入框的状态变为不被选中,以下为实现代码  
> $(this).blur();

上述代码，可将文本框失去选中状态。

```html
<!-- 具体例子如下 -->
<div class="my_input">
<input  type="text" 
	placeholder="要输入的搜索内容." 
	onkeydown="if(event.keyCode==13) {getSearchVal();$(this).blur();}" 
	style="padding-left: 15px;" 
	id="filtertxt">
</div>
//该例子可实现对输入框内容进行回车搜索,回车后取消后不再选中该搜索框
```

```javascript
function getSearchVal(){
	var search= $("#filtertxt").val();
}
```
使用 jQuery将当前的选中框取消。
