---
layout: post
title:  "正则表达式学习总结"
date:   2018-12-12 19:40:31
image: 'https://store.skylinebin.com/TensorflowLearning/tensorflow.png'
description: 'Basic knowledge of regular expression'
tags:
- RegExp
- Code
- FrontEnd
categories:
- SkylineBin
twitter_text: '正则表达式学习总结 '
---  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;接触正则表达式是在一年半前，当时做项目要用字符串替换功能，只知道用 replace 方法，不过因为需求也不算复杂，基本能用。最近在搜资料的时候才想起自己应该抽时间系统整理一下正则了。之前学 java 的时候打印过正则表达式相关的语法规则，也做过相关的笔记，这次主要在之前笔记的基础上整理一下日常开发中用到的正则表达式。  


### 巩固基础
最开始了解正则表达式就要弄明白为什么要用正则表达式，我觉得 deerchao 同学的 [正则表达式30分钟入门教程](https://deerchao.net/tutorials/regex/regex.htm)这篇文章里对这一点讲的很好。即，**正则表达式是用于描述查找符合某些复杂规则的字符串需要的工具**，其中操作对象是 "字符串"，目的是符合某些复杂规则，通俗些讲就是 用来筛选查找你想要的字符串。  

#### 基础字符  
以下的这些字符都是正则表达式中常用的基础，像是英语中的字母(简单的单词)一样，正则表达式是由这些基础字符组装配合起来一起实现筛选查找功能的。  
表1. 正则表达式的基础字符

| 编号 | 字符 | 说明 | 类别 | 备注 |
| :---: | :---: | :---: | :---: | :---: |
| 1 | . | 匹配除换行符以外的任意字符 | 元字符 | |
| 2 | \w | 匹配字母或数字或下划线或汉字 | 元字符 | |
| 3 | \d | 匹配数字 | 元字符 | |
| 4 | \s | 匹配任意的空白符 | 元字符 | |
| 5 | \b | 匹配单词的开始或结束 | 元字符 | |
| 6 | ^ | 匹配字符串的开始 | 元字符 | |
| 7 | $ | 匹配字符串的结束 | 元字符 | |
| 8 | \ | 对元字符进行转义 | 转义字符 | |
| 9 | * | 重复零次或很多次 | 重复字符 | |
| 10 | + | 重复一次或很多次 | 重复字符 | |
| 11 | ? | 重复零次或一次 | 重复字符 | |
| 12 | {n} | 重复 n 次 | 重复字符 | |
| 13 | {n,} | 重复 n 次或很多次 | 重复字符 | |
| 14 | {n,m} | 重复 n~m 次 | 重复字符 | |
| 15 | [] | 匹配其中一个 | 自定义字符 | |

针对以上基础字符，现给出部分示例，便于理解：
- "0\d{2}-\d{8}" 可以匹配以0开头重复出现2位数字，接上"-",再出现8位数字的字符串，例如"027-87850365" 这种字符串
- "\ba\w*\b" 可以匹配以字母 a 开头的单词，例如匹配一段英文中的以a开头的单词，如下图所示:  
![](https://store.skylinebin.com/image/regexp/regexforstra.png)  
- "\b\w{6}\b" 即可用来匹配6个字母的单词，如 "unique"，"common"等等  
- "^\d{5,12}$" 用来匹配 5~12 位的数字，注意这里有 **"^"** 就表示是针对**整个待检验的字符串**，不是值在字符串里面查找，这个和前面几个不一样，只要字符串本身是5~12位的数字才可以，例如字符串""此功能可以用来匹配 QQ 号  
- "http[s]?:\/\/(\w*\.)?google\.com" 用来匹配 所有 "google.com"下的子域名"google.com"，并且能够筛选出来，如下图所示：  
![google.com](https://store.skylinebin.com/image/regexp/regGoogle.png)
- "[aeiou]" 可以匹配任意一个元音字母，可用"-"来控制范围，"[0-9]" 与 "\d" 的作用相同，"[a-z0-9A-Z]"等同与"\w"  
- "\(?0\d{2}[)-]?\d{8}" 可以用来匹配几种格式的座机号码，解析过程如下图所示：  
![RegExp_Num](https://store.skylinebin.com/image/regexp/regstr_num.png)  

以上为正则表达式的基础字符的使用，其实大多都是元字符的简单逻辑组合，挺容易理解。

#### 正则表达式的检验测试  
有了以上的基础字符，其实就可以写简单的正则表达式了，为了能够**更清晰地理解正则表达式**，很多正则的检验工具就诞生了，这里推荐两款工具如下：  
- [regexr网站](https://regexr.com/)  如下图所示，该正则测试网站可针对自己所给的字符串，检验写的正则表达式是否正确，并且会给出字符解析，比较好用，效果如下：  
![regexp](https://store.skylinebin.com/image/regexp/regexr.png)  
- [Regester 工具](https://deerchao.net/tools/regester/index.htm) 此工具为 deerchao 同学自己写的 windows 系统下的可执行软件，可以使用免安装版本，有助于离线测试，效果如下:  
![Regester](https://store.skylinebin.com/image/regexp/Regester.png)  

同类型的网站还有：
- 功能丰富的 [Reg101](https://regex101.com/)，此网站支持不同编程语言的切换也有字符解释
- [regexper](https://regexper.com/) 针对 JavaScript 正则表达式的节点图语义解析，在分析复杂表达式时也比较好用  

#### 正则表达式的语法详解  
##### 分支条件  
正则表达式中的分支条件是指，**用 "|" 把不同的规则分隔开**，只要**满足其中任意一种规则**都应当匹配。例如，
- "0\d{2}-\d{8}|0\d{3}-\d{7}" 满足两种连字号中的一种均可以，即可匹配3位区号和4位区号  
- "\(0\d{2}\)[- ]?\d{8}|0\d{2}[- ]?\d{8}" 匹配区号有无括号的两种写法，满足任意一种即可
- "\d{5}-\d{4}|\d{5}" 匹配美国邮政编码(5位数字或者5位-4位数字)，使用分支条件时，要**注意各个分支条件的顺序**。

##### 分组(子表达式)  
正则表达式中可以**使用小括号"()"来指定子表达式**或进行其他操作，具体实现过程如下：  
- "(\d{1,3}\.){3}\d{1,3}" 可用于初步筛选 IP 地址，此表达式是 该(\d{1,3}\.)分组重复了3次，是针对 IP 地址的特点设置的。  
- "((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)" 为正确的 IP 匹配的正则表达式。效果如下：
![IP正则表达式](https://store.skylinebin.com/image/regexp/regx_ip.png)  
上图中 "(2[0-4]\d|25[0-5]|[01]?\d\d?)" 出现了4次，只是为了精准匹配 0~255之间的数，然后结合 IP 地址的特点进行分组拼接。**以后写正则表达式时，应该和检索问题一样，先分析问题，分析待匹配的字符串的特点，再按照需求写表达式**。  


##### 反义  
正则表达式中的反义是**用于查找不属于某个能简单定义的字符类的字符**。用于反义的字符主要有：  
| 编号 | 字符 | 说明 | 类别 | 备注 |
| :---: | :---: | :---: | :---: | :---: |
| 1 | \W | 匹配任意不是字母，数字，下划线，汉字的字符 | 反义字符 | |
| 2 | \S | 匹配任意不是空白符的字符 | 反义字符 | |
| 3 | \D | 匹配任意非数字的字符 | 反义字符 | |
| 4 | [^x] | 匹配除了x以外的任意字符 | 反义字符 | |
| 5 | ^abcde | 匹配除了abcde以外的任意字符 | 反义字符 | |

例如，以下字符都使用到了反义：  
- "\S+"匹配不包含空白符的字符串。如下图，可以用此语句来以空格拆分字符串：  
![Space Key](https://store.skylinebin.com/image/regexp/regx_space.png)  
- "<div[^>]+>" 可用于匹配有其他属性设置的 div ,如下图： 
![Reg for div](https://store.skylinebin.com/image/regexp/regx_div.png)  


##### 后向引用  
正则表达式会给所有的子表达式(用小括号括起来的表达式)分组，从左向右，以分组左括号为标志，每个分组会自动拥有一个组号，第一个分组组号为1，后面持续增加。分组0对应整个正则表达式。正则表达式中的后向引用主要是指，**用于重复搜索前面某个分组匹配的文本**。例如，**用 "\1" 代表分组1匹配的文本**。  
例如，匹配重复的单词可以用到后向引用，即：
- "\b(\w+)\b\s+\1\b" 来匹配重复的单词
![Reg Repeat words](https://store.skylinebin.com/image/regexp/regx_double.png)  

在写子表达式的时候，也可以自己指定组名，可以用 "(?<Name>\w+)" 或者 "(?'Name'\w+)"，即可把 "\w+" 的组名指定为 Name,后向引用时可以使用"\k<Name>"引用，即上述例子可改写为："\b(?<Wordone>\w+)\b\s+\k<Wordone>\b"

分组语法如下表所示:  
| 编号 | 字符 | 说明 | 类别 | 备注 |
| :---: | :---: | :---: | :---: | :---: |
| 1 | (expression) | 匹配expression，并捕获文本到自动命名的组里 | 捕获字符 | |
| 2 | (?<name>expression) | 匹配expression,并捕获文本到名称为name的组里，也可写作(?'name'expression) | 捕获字符 | |
| 3 | (?:expression) | 匹配expression,不捕获匹配的文本，也不给此分组分配组号 | 捕获字符 |有点儿意思 |
| 4 | (?=expression) | 匹配expression前的位置 | 零宽断言 | |
| 5 | (?<=expression) | 匹配expression后的位置 | 零宽断言 | |
| 6 | (?!expression) | 匹配后面不是跟expression的位置 | 零宽断言 | |
| 7 | (?<!expression) | 匹配前面不是expression的位置 | 零宽断言 | |
| 8 | (?#comment) | 不对正则表达式产生影响，仅供注释时用 | 注释 | | 


##### 零宽断言  
正则表达式中的零宽断言是 用于查找某些内容之前或者之后东西，但并不包括这些内容，用于指定一个位置，像"\b","^","$"表示位置，这些位置应满足一定条件(断言)，例如上表中的几个零宽断言可以详细解释为：  
- "(?=expression)" 也叫 **零宽度正预测先行断言**,MDN 中也叫 **正向肯定查找**，其断言自己出现位置后面能够匹配表达式expression代表的内容，例如 "\b\w+(?=ing\b)"，可用于匹配单词里带有"ing"的单词前面的部分,
![find the word](https://store.skylinebin.com/image/regexp/regx_ing.png)  
- "(?<=expression)" 也叫 **零宽度正回顾后发断言**，MDN里面没找到叫啥，其断言自己出现位置前面能够匹配表达式expression代表的内容，例如 "(?<=\bre)\w+\b"会匹配以 re 开头的单词的剩余部分，例如 "Please refresh this page." 可以匹配 "fresh"
- "((?<=\d)\d{3})+\b" 可以查找需要在前面和里面添加逗号的部分。  
- "(?<=\s)\d+(?=\s)" 可用于匹配以空白间隔的数字。


### JavaScript中的正则表达式  





### 应用实例  
#### 国内手机号码正则匹配  
Github 上有一个国内手机号码的正则表达式项目 [ChinaMobilePhoneNumberRegex](https://github.com/VincentSit/ChinaMobilePhoneNumberRegex)，有1000+的 Star，主要功能就是用于匹配中国联通移动电信和网络号段的手机号，主要正则表达式如下：
"^(?:\+?86)?1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7[^29\D](?(?<=4)(?:0\d|1[0-2]|9\d)|\d{2})|9[189]\d{2}|6[567]\d{2}|4(?:[14]0\d{3}|[68]\d{4}|[579]\d{2}))\d{6}$" 解析过程如下：


### 参考资源  

关于正则表达式的学习资料很多，除了单纯讲解正则表达式的通用操作外，本次整理主要参考了 JavaScript 中正则表达式的使用，详细参考资料如下：  
- [正则表达式30分钟入门教程](https://deerchao.net/tutorials/regex/regex.htm)  
- [MDN正则表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions)  
- [廖雪峰的JavaScript教程](https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001434499503920bb7b42ff6627420da2ceae4babf6c4f2000)  
- [正则表达式的陷阱](https://zhuanlan.zhihu.com/p/38278481)  
- [《JavaScript权威指南(第6版)》第10章](https://www.amazon.cn/dp/B007VISQ1Y/ref=sr_1_1?ie=UTF8&qid=1546997671&sr=8-1&keywords=JavaScript%E6%9D%83%E5%A8%81%E6%8C%87%E5%8D%97%28%E7%AC%AC6%E7%89%88%29)  
- [《JavaScript高级程序设计(第3版)》第5.4节](https://www.amazon.cn/dp/B007OQQVMY/ref=sr_1_1?ie=UTF8&qid=1546997809&sr=8-1&keywords=JavaScript%E9%AB%98%E7%BA%A7%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%28%E7%AC%AC3%E7%89%88%29) 




