---
layout: post
title:  "Web安全DDos原理--(二)反射攻击"
image: ''
date:   2018-09-09 21:50:32
tags:
- CyberSecurity
- DDoS
- Network
- WireShark
description: 'About principle of the DDoS attack '
categories:
- SkylineBin
twitter_text: 'Understand the principle of DDoS'
---  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;第一篇中讲了关于 DDoS 直接攻击的一些理论，这里 讲一些 DDoS 反射攻击的知识。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DDoS 反射攻击又称 DRDoS，攻击者 **伪装成受害人**，欺骗 **路由器或者服务器产生大量响应**，进而 **攻击受害者**。ACK 应答、DNS 响应数据、NTP 及 SNMP 等协议的响应数据等都可以成为攻击方式。  
反射攻击与直接攻击最大的区别是：不用傀儡网络，不用肉鸡。  
类似 DAVOSET 的一类脚本工具可以做到反射攻击，原理是：**利用合法的第三方身份实施攻击而做到自身的隐藏**,而且ProxyAttacks可利用的反射点众多.也使得这种攻击更加难以阻止。这类工具将 被攻击方的 服务器对应的域名 放在 反射点工具上，使用第三方可申请发包测试的网站。  


### 1.反射攻击 - NTP 反射型 DDoS 攻击原理  

NTP Reply Flood Attack （NTP型 DDoS 攻击）利用网络中 NTP服务器的脆弱性(无认证，不等价数据交换，UDP协议)，进行DDoS行为的攻击。  
**网络时间协议 (NTP)** 是通过因特网服务于计算机时钟的同步时间协议。其提供了一种 同步时间机制，能在庞大而复杂多样的网络中用光速调整时间分配。  

![NTP Server](https://store.skylinebin.com/image/ddos/NTPServer.png)  
上图中可选的为互联网 NTP 服务器，可用于网络同步时间。  


NTP攻击原理：**不等价交换的 DDoS利用**。  
NTP协议指令集：在Linux中可通过 ntpdc 进行 NTP 操作，比如 Monlist 指令可以获取与 目标 NTP Server进行过同步的 最后 600 个客户机IP 。就会有 一个很小的请求包，能获取到大量的活动IP地址组成的连续UDP包。  

在这里，通过伪造指定IP请求，可以让 NTP服务器向指定 的目标 回包，造成大量数据包的阻塞。  

**反射**：无论是基于 DNS 还是基于NTP，其最终都是基于UDP协议的。在UDP协议中正常情况下客户端发送请求包到杜武断，服务端返回响应包到客户端，但是UDP协议是面向无连接的，所以客户端发送请求包的源IP很容易进行伪造，**当把源IP修改为受害者的IP,最终服务端返回的响应包就会返回到受害者者的IP**。这就形成了一次反射攻击。  
**放大**：放大攻击就是一次小的请求包最终会收到一个或者多个多于请求包许多倍的响应包。  


### 2.反射攻击 - google 爬虫 DDoS 攻击原理  

2013前后出现的 利用 Google 爬虫的 Bug 可进行 DDoS 攻击。FeedFetcher 爬虫会将 spreadsheet 的 =image("link") 中的任意链接缓存。如果我们将=image("http://example.com/image.jpg")输入到任意一个 Google spreadsheet 中,Google 就会 "派出" FeedFetchert 爬虫去抓取这个图片并保存到缓存中以将其显示出来。  
但是,我们可以为文件名附加上随机参数，使 FeedFetcher 多次抓取同一文件。也就是说,如果一个网站有一个10MB的文件,要是将以下列表输入到 Google spreadsheet 中,那么 Google 的爬虫就会抓取该文件 1000 次。  

```
=image("http://example.com/file.pdf?r=0")
=image("http://example.com/file.pdf?r=1")
=image("http://example.com/file.pdf?r=2")
=image("http://example.com/file.pdf?r=3")
.......
=image("http://example.com/file.pdf?r=999")
```  
bug 主要是因为爬虫没有检测所传参数，阻塞带宽。  


### 3.反射攻击 - 视频 DDoS 原理  

若网站存在注入漏洞，被攻击者存储型的注入文件，例如视频评论中存在恶意代码，所有加载此视频的用户都加载评论，若恶意代码中包含执行某一链接的定时请求，所有的用户都会请求该链接，导致发生拥塞，拒绝正常请求的服务。  
用户访问量大，停留时间长，目标主机会收到大量攻击。  
之前 搜狐新闻 和 视频的评论系统就没有屏蔽代码规则，例如评论 js 弹出框就会真的弹出弹窗，像这种形式就可能被攻击者利用，注入一些请求被攻击者的服务器地址，造成占用带宽或者资源的情况，形成拒绝服务。  



### DDoS 攻击特征  
一般 DDoS 攻击的特征如下：  

![DDoS Feature](https://store.skylinebin.com/image/ddos/DDoSFeature.png)  

常用的可视化 DDoS 全球攻击地图监测有：  
- [DigitalAttackMap](http://www.digitalattackmap.com/)  
- [FireeyeCyberMap](https://www.fireeye.com/cyber-map/threat-map.html)  
- [RealTimeCyberAttack](https://geekflare.com/real-time-cyber-attacks/#2-Digital-Attack-Map/)  
- [RealTimeWebMonitor](https://www.akamai.com/us/en/solutions/intelligent-platform/visualizing-akamai/real-time-web-monitor.jsp)  


