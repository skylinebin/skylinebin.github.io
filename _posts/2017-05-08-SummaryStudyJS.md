---
layout: post
title:  "JavaScript处理数据总结(一)"
date:   2017-05-08 17:37:31
image: '/assets/img/singledog.png'
description: 'About JavaScript'
tags:
- JavaScript
- FrontEnd
- Summary
categories:
- SkylineBin
twitter_text: 'What new things I had learned '
---



### 关于Echarts的使用  

使用Echarts画柱状图或者折线图时，有时候需要在页面上显示每一条数据的具体数量，但是默认是关闭的，只有当鼠标移到指定列的时候才会显示具体的值。  
以下是打开并显示的方法:  
在 **option** 中的 *series* 属性中添加描述为 *itemStyle* 的参数,可以设置显示位置(position) 以及显示颜色(fontColor),显示代码如下:  

```javascript
    itemStyle: {
        normal: {
            label: {
                show: true,
                position: "top"
            }
        }
    }
```

具体效果如下图所示:  

<img src="../assets/img/SummaryThinking/showtopnum.png">
以上是Echarts部分

### 在项目中使用的一些JavaScript  

在有时候前端需要对后台发来的 json 数据进行排序显示,在不把 json 数据对象化时，后台按顺序存入到一个 json 时，在一个对象内,各种键 **key** 是随机排列的,所以每次前端请求 action 得到的结果可能是不同。而可能需要对键值排序,这就需要对 ajax 返回的数据进行处理，也就是对 json 数据进行排序，这里的实现方式是用新建一个 list 来保存获取的 json 数据。然后使用 sort() 函数对 list 进行排序。具体实现代码如下:  

```javascript
    var thosemonthlist = new Array();
    var belists = objects.result;

    function YearList(months,ouput){
        this.months = months;
        this.ouput = ouput;
    }
    /**以下是将json中的数据取出来转存至list里**/
    for (var wolist in belists )
    {
        thosemonthlist.push(new YearList(String(wolist.slice(0, -1)),String(belists[wolist])));
    }
/****以下为实现排序函数 ******/
    thosemonthlist.sort(function(a,b){
        return a.months-b.months;
    })
```

代码分析:  
定义一个 **thosemonthlist** 关联数组,再定义一个赋属性的函数 **YearList**,稍后可将包含这两个属性的对象push入定义的关联数组中。
其中 *wolist.slice(0, -1)* 语句是截取字符串语句,即取得字符串里第一个到倒数第一个字符(这里是为了除去字符串里的最后一个"日"或者"月")，以便于获取数值用于排序。  
后面的排序函数就是 sort(),直接使用

```javascript
    thosemonthlist.sort(function(a,b){
        return a.months-b.months;
    })
```

传入两个"对象",按照months的大小进行排序降序排列，虽说是两个参数，但使用于关联数组可以对数组里的所有"对象"按照months的大小进行排序。此外，如果是想要降序,使用(return b.months-a.months;)  
另外在查相关资料的时候，看到过有对json里多个对象进行直接排序的,简化代码如下:  

```javascript
/***json数据如下**/
"result":[
        {
            "cid":1,
            "name":"aaa",
            "price":1000
        },{
            "cid":2,
            "name":"bbb",
            "price":150
        },{
            "cid":3,
            "name":"ccc",
            "price":200
        },{
            "cid":4,
            "name":"ddd",
            "price":1500
        },{
            "cid":5,
            "name":"eee",
            "price":1100
        }
    ],
    "totalCount":5
}

function sortJ(a,b){
    return a.price-b.price;
};
var data=ajson.result.sort(sortJ);
```

以上程序大概也可以直接对 json 对象排序,贴出来以防之后用到了需要再查。

### 关于控制情绪的总结  

急躁的时候总会无意间伤害到别人，别人也能一眼看出，  
不如以后烦躁的时候就少说话多做事，让自己静一静，自己一个人专心做事情其实效率比玩玩乐乐地做事情高很多，其他人看到你情绪低落也不会轻易打扰你，效率也自然上去了。不过也要注意，不要动怒啊，情绪是会传染的。  
