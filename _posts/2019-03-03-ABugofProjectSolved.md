---
layout: post
title:  "记录一次解决log报错的怪异bug"
date:   2019-03-03 23:24:31
image: 'https://store.skylinebin.com/JavaScript.png'
description: 'Record a weird bug that in a project'
tags:
- Project
- Code
- Java
- Bugs
categories:
- SkylineBin
twitter_text: 'error: source is null for getProperty(null, "0") '
---  

###  ognl.OgnlException: source is null for getProperty(null, "0") 报错问题分析  

在上周的项目调试中，发现了一个程序bug，这个bug只在 配置好的 log4j 调试文件中输出，不在Tomcat 运行的 console 中报错，以至于在开发过程中一直没有发现，之前团队中的后端开发人员也没有使用 log 调试的习惯，好在这个 bug 没有影响功能。但是 log 中报错了肯定要解决的。  

因为只有一个列表页面请求接口时，会在 log 中写入 source is null for getProperty(null, "0") 这种错误，可以将 bug 定位到这一个功能的 前端接口请求 和 后端接口实现上，因为报错没有定位到具体的 代码文件，只能通过 分析可能出错的原因来尝试解决。  

整理报错的几句语句如下:  

```
WARN -Error setting expression 'order[0][column]' with value '[Ljava.lang.String;@620d7aa2'
ognl.OgnlException: source is null for getProperty(null, "0")

WARN -Error setting expression 'order[0][dir]' with value '[Ljava.lang.String;@1ee6490c'
ognl.OgnlException: source is null for getProperty(null, "0")
	at ognl.OgnlRuntime.getProperty(OgnlRuntime.java:2223)

WARN -Error setting expression 'search[value]' with value '[Ljava.lang.String;@4c6c8c78'
ognl.OgnlException: target is null for setProperty(null, "null", [Ljava.lang.String;@4c6c8c78)
	at ognl.OgnlRuntime.setProperty(OgnlRuntime.java:2239)
```
我们最开始以为是前后端请求接口发送的数据值的问题，因为这个功能是分页查表，需要前端传数据，'search[value]' 的值可能为空，但是特地请求不为空的接口，log 里面还是报错。  

因为这是一个 通用的 接口模版，实现形式是从上一个项目中移植过来的，抱着怀疑的目的，去翻了另一个项目的 log，果然也有这个错误。然后就不淡定了，因为这个通用的接口形式已经不能追溯到是当初是谁写的了，都以为不可能是通用接口的问题，现在发现之前的接口也有这个错误。只能检查一遍接口形式。  

这个项目的 前端的请求用的 jQuery 的 ajax，发送数据格式如下：  

```javascript
data: {
   "draw": 1,
   "start": 0,
   "length": 8,
   "search[value]": "",
   "order[0][column]": "0",
   "order[0][dir]": "asc",
}
```
后端代码理所应当的使用了 request 来获取发送的数据，大概形式如下：  
```java

HttpServletRequest request = ServletActionContext.getRequest();

String searchValue = request.getParameter("search[value]");
orderColumn = request.getParameter("order[0][column]");
orderDir = request.getParameter("order[0][dir]");
```

> **我们最开始并没有分析这几条报错的共性和差异**，这一点现在来看很关键。  

虽然我们开始都怀疑过是 "request.getParameter" 导致的错误，也检索到 与 Struts2 有关的报错的。所有的代码都是很常用的代码。  

分析报错的共性，传输的 key 里面都有 "[]" 符号，key中有 '[0]' 的都报的是 'source is null for getProperty(null, "0")'，key 中 有 'search[value]'  的报错是 'target is null for setProperty(null, "null")' 。  

知道这些，问题是什么就很明了了，从浅的来说，**这是变量名的问题** ，"[]"被 识别成了数组。我也不知道当初为什么会选这种作为变量名，现在猛一看为啥要用'[]'这么智障的命名方式。  深挖一些，这可能是 getParameter 这个方法的小bug(写这个方法的人肯定也没想过会被这么用吧)，做项目也能看到一切错误都有可能。

对于这篇文章来说，这可能才到问题的一半。  

发现问题后，将变量换成驼峰法方式命名，"searchValue", "orderColumn", "orderDir"，前后端统一改一下，测试，果然 log 里面没有问题。  

问题可能出现的原因分析：  

getParameter 是个很通用的方法，它读取的是字符串，读取到的也是字符串，它是 request 对象的一个方法，尝试找 getParameter 这个方法的源码。  
Java HttpServletRequest 的 [使用手册上](https://docs.oracle.com/javaee/6/api/javax/servlet/ServletRequest.html)，写的是：  

> getParameter (java.lang.String name)  
> Returns the value of a request parameter as a String, or null if the parameter does not exist.  
> For HTTP servlets, parameters are contained in the query string or posted form data.  

getParameter 方法 是从 HTTP servlets 的 传递的参数中获取值以字符串的形式返回。关于报错中的 getProperty 和 setProperty 是在 OgnlRuntime.java 里面抛出的 ，OgnlRuntime相关的 [解释文档](https://commons.apache.org/proper/commons-ognl/apidocs/org/apache/commons/ognl/OgnlRuntime.html) 里面有 getProperty，setProperty 对应的方法，并且异常时确实会抛出 ognl.OgnlException  

![getProperty&setProperty](https://store.skylinebin.com/bugs/OgnlException.png)  

可以猜测 在执行 request.getParameter("search[value]") 语句时，编译器针对 search[value]，尝试查找了 search 数组中的 value 值 对应 setProperty(null, "null")。

因为很久没有写 java 代码了，也没有第一反应能够觉察到可能出错的原因。  

#### 从这次解决 bug 中反映出来的问题  

1. 后端同学没有养成使用 log 调试的习惯  
2. 实验室的前后端编码规范迫切需要执行下去 
3. 基础还是要踏实，带同学的时候不能忽视基础  
