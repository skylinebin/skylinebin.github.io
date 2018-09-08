---
layout: post
title:  "Web安全DDos原理--(一)直接攻击"
image: ''
date:   2018-09-07 18:50:32
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

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;一直觉得，如果做 Web 开发，一定要了解 **Web 安全**相关的一些机制。所以最近学习了关于 **DDoS** 攻击的一些原理和具体实际中的攻防操作，在这里总结一下，以免后面又忘了。因为记录的比较详细，所以分开了几篇来总结，这一篇主要是针对DDos 中的 直接攻击的原理展示，其中包含了 计算机网络中 **TCP** 和 **ICMP** 的协议理论复现。  


### DDoS 原理及分类介绍  

**DDoS** (Distributing Deny of Service) 全称 **分布式拒绝服务攻击**。一般指的是：**攻击者通过控制大量的肉鸡向被攻击者发送大量的数据流，造成被攻击者链路拥塞、系统资源耗尽，从而无法向用户提供正常业务。**  
DDoS 特点是：攻击者是通过控制肉鸡攻击，而不直接参与攻击，真正发起攻击的是肉鸡。  
肉鸡是指被控制的网络设备，僵尸网络是由肉鸡群和控制者构成的网络群体。  

DDoS 可按照攻击产生的攻击流量分为 **流量型** 和 **业务型**：  
- **流量型**：主要依靠发送无状态协议的大包来阻塞被攻击者链路 例如：UDP FLOOD  ICMP FLOOD 等。  
- **业务型**：模拟正常用户反复请求的某项业务 HTTP FLOOD 、DNS FLOOD 。  

DDoS 可按照数据包处理能力存在上限，发送数据包的攻击形式分为 **直接攻击** 和 **反射攻击**：  
- **直接攻击**：使用大量受控主机直接向攻击目标发送大量数据包，达到拒绝服务的目的。常见 ICMP/IGMP FLOOD 与 UDP FLOOD (不易被发现)。  
- **反射攻击**：DRDoS，攻击者伪装成受害人，欺骗路由器或服务器产生大量响应，进而攻击受害者；(ACK应答，DNS响应数据，NTP及SNMP 等协议的响应数据都可被反射攻击利用)。  

反射攻击的成本更低，不需要控制僵尸网络。

本文主要列举常见的直接攻击的方式：**SYN FLOOD**、**UDP FLOOD**、**ICMP FLOOD**、**Connection FLOOD**、**UDP DNS Query FLOOD**、**HTTP GET** 。  


### 1.直接攻击 - SYN FLOOD攻击原理  

SYN-FLOOD 是最常见的DDoS攻击，最经典的拒绝服务攻击，利用 TCP协议实现的缺陷 ，实现过程是： **通过向网络服务所在端口发送大量的伪造源地址的攻击报文，就可能造成目标服务器中的半开连接队列被占满，从而阻止其他合法用户进行访问**。 

流程可以如下：  
- 1)攻击者首先伪造地址对服务器发起SYN请求(我可以建立连接吗?);  
- 2)服务器就会回应一个ACK+SYN〔可以+请确认);  
- 3)而真实的IP会认为,没有发送请求,不作回应;  
- 4)服务器没有收到回应,会重试3-5次，并等待一个 SYN Time (30s~120s)后丢弃这个连接  


如果攻击者大量发送这种伪造源地址的SYN请求，服务器端将会 **消耗非常多的资源来处理这种半连接**，非常消耗CPU和内存,并且要对列表中的IP进行SYN+ACK的重试。最后的结果是服务器不能处理正常的连接请求一拒绝服务。(并且，服务器每发一个网络连接会占用网络带宽，当IP列表里数量很多时，仅网络带宽就达到阻塞，服务器性能提升也很难解决)。  

实现的原理：(参考 TCP/IP详解卷一 : 协议 TCP部分)  
TCP 三次握手流程如下图：  
![Right TCP](https://store.skylinebin.com/image/ddos/RightTCP.png)  

TCP半开连接方式流程如下图：  
![Wrong TCP](https://store.skylinebin.com/image/ddos/WrongTCP.png)  

SYN FLOOD 是最经典的形式，通过短时间内产生大量的TCP半开连接，实现攻击。  

TCP 三次握手过程 使用软件 WireShark 原理分析 (抓包)
> 主机 192.168.20.1  
> 虚拟机 192.168.20.128  

在 虚拟机中 使用 WireShark 进行抓包 ，设置过滤规则 host 192.168.20.1, 
但在主机中 使用 telnet 失败了，所以改变为在 **虚拟机**中使用 telnet 连接 主机的 139 端口：  

```
telnet 192.168.20.1 139
```  
在主机和虚拟机中 都进行了抓包,这里分析一下对 **被连接的主机** 抓包得到的数据：  
![Full TCP Connection](https://store.skylinebin.com/image/ddos/TCPFull.png)  

连接前的 ARP 和 TCP 三次握手的过程很清晰。  
两条 ARP 中 首先 虚拟机(客户端连接方) 发送 广播 ARP ，询问 谁是 192.168.20.1 (服务器端IP)，Vmware 的网关将 192.168.20.1 的硬件地址 发送给 虚拟机。  
开始 TCP 三次连接过程，虚拟机 向 主机的 139端口 发起 TCP 连接：  
![TCP Connection One Time](https://store.skylinebin.com/image/ddos/TCPOne.png)  

上图 TCP 协议里的 Flags 里面 SYN 为 1。  
主机向虚拟机发送 ACK + SYN 确认收到的请求：  
![TCP Connection Two Time](https://store.skylinebin.com/image/ddos/TCPTwo.png)  

第二次握手里面 Ack 传的值 是 第一次握手发的 Seq + 1 (下图中第一条 Seq =0 )  
![TCP Connection Seq and Ack](https://store.skylinebin.com/image/ddos/TCPSeqAck.png)  

第二次 握手除了 回复 客户端的 Ack 外，也会发一个 服务器回复的 Seq 。  

第三次握手 是 客户端 向 服务器发送ACK ：  
![TCP Connection Third Time](https://store.skylinebin.com/image/ddos/TCPThree.png)  

这里 第三次 客户端向服务器发送 Ack 的值 是 第二次 服务器发给客户端 Seq + 1 。  **第三次返回的 Seq 与第二次 服务器发送的 Ack 值 相同**   

更直观的是下图中的 TCP 的三次握手:  
![All TCP Connection](https://store.skylinebin.com/image/ddos/TCPRealSA.png)  

正常的 TCP 三次握手过程中 ，可以看到 源IP 和 目的 IP 都是确定的  
![Source and Destination](https://store.skylinebin.com/image/ddos/TCPSource.png)  

在服务器上 可以使用 netstat -an 可以查看 SYN_RECV状态信息

网络上SYN FLOOD攻击模式图：  
![Net SYN FLOOD](https://store.skylinebin.com/image/ddos/NetSYNFlood.png)  

所以 SYN FLOOD 实现攻击的模式是：  
- 攻击者向服务器TCP端口发送大量的伪造源地址的攻击报文 （TCP三次握手中的第一次握手）  
- 服务器需要 发送大量 SYN, ACK 来回应这些IP 造成了对正常请求的 拒绝服务~  


当小型业务每秒 1000+ 的 SYN 的包，可能就遇到了 SYN FLOOD 攻击。



### 2.直接攻击 - UDP FLOOD攻击原理  

UDP Flood 是日渐猖厥的流量型DoS攻击,原理也很简单。常见的情况是利用 **大量UDP小包**冲击DNS服务器或Radius认证服务器、流媒体视频服务器等。  
由于UDP协议是一种无连接的服务,在UDP FLOOD攻击中,攻击者可 **发送大量伪造源IP地址的小UDP包**。  
正常应用情况下,UDP包双向流量会基本相等,而且大小和内容都是随机的,变化很大。
UDP FLOOD中，针对同一目标IP的UDP包 **在一侧大量出现,并且内容和大小都比较固定**。  
DDoS 网关设备中 攻击流量基本占满，并且主要是 UDP 连接，并且内容都很近似，可能遭到 UDP FLOOD 攻击。  


### 3.直接攻击 - ICMP FLOOD攻击原理  

ICMP FLOOD 的攻击属于流量型的攻击方式，也是利用大的流量给服务器带来较大的负载，影响服务器的正常服务。  
目前很多防火墙直接过滤ICMPF报文,ICMP FLOOD 出现的频度较低。  

ICMP通信过程 使用软件 WireShark 原理分析 (抓包)  
> 主机 192.168.20.1  
> 虚拟机 192.168.20.128  

从虚拟机 向主机 ping 指令：  
```
ping 192.168.20.1
```  

![ICMP Ping](https://store.skylinebin.com/image/ddos/pingICMP.png)  

在主机里面抓包 ，共获得 8条 ICMP 报文信息，对应 上图中四次请求。  
![Full ICMP Connection](https://store.skylinebin.com/image/ddos/ICMPFull.png)  

ICMP报文中 有 对应的 Type  和 Code :  
![ICMP Request](https://store.skylinebin.com/image/ddos/ICMPOne.png)  
Type: 8 Code：0 在 ICMP协议 表示 Ping请求回显，与 抓包软件显示结果一致

ICMP响应的 Type: 0 Code：0 也能对上 抓包中的数据格式  
![ICMP Reply](https://store.skylinebin.com/image/ddos/ICMPTwo.png)  

ICMP FLOOD 利用协议的机制 发送大量的请求，给服务器带来较大的负载，形成拒绝服务攻击。  


### 4.直接攻击 - Connection FLOOD攻击原理  

**Connection FLOOD** 是典型的并且非常的有效的 **利用小流量冲击大带宽网络服务**的攻击方式，这种攻击方式目前已经越来越猖獗。  
这种攻击的原理是利用真实的IP地址向服务起大量的连接，并且建立连接之后很长时间不释放，占用服务器的资源，造成服务器服务器上残余连接(WAIT状态)过多，效率降低，甚至资源耗尽，无法响应其他客户所发起的连接，造成拒绝服务。  
高校 开学之初的 **选课造成系统瘫痪**，应该就属于这种人工 Connection FLOOD。  


### 5.直接攻击 - UDP DNS Query FLOOD攻击原理  

**UDP DNS Query Flood** 攻击实质上是UDP Flood的一种,但是由于DNS服务器的不可替代的关键作用,一旦服务器瘫疾,影响会很大。  
UDP DNS Query Flood攻击采用的方法是 向被攻击的服务器发送大量的域名解析请求，通常请求解析的域名是随机生成或者是网络世界上不存在的域名...  

一台DNS服务器所能承受的动态域名查询的上限是每秒 9000 个请求。而一台性能较低的PC机上可以轻易地构造出每秒钟几万个域名解析请求,足以使一台硬件配置极高的DNS服务器瘫疾。  

> 消耗 **应用资源** 的DDos 逐渐成为 拒绝服务攻击的主要手段之一。  
> 由于 **DNS** 和 **Web 服务** 的 广泛性和重要性， 这两种服务也成为了消耗应用资源的分布式拒绝服务的最主要攻击目标。  


### 6.直接攻击 - HTTP GET攻击原理  

HTTP Get 是针对应用层应用消耗的一种攻击方式。  
这种攻击主要是针对存在ASP、JSP、PHP、CGI等脚本程序,并调用SQLServer、MySQLServer、Oracle等数据库的网站系统而设计的,特征是 **和服务器建立正常的TCP连接，并不断的向脚本程序提交查询、列表等大量耗费数据库资源的调用**。典型的 **以小博大**的攻击方法。  
一般来说,提交一个GET战POST指令对客户端的耗费及带宽的占用是几乎可以忽略的，而服务器为处理此请求却可能要从上万条记录中去查出某个记录,这种处理过程对资源的耗费是很大的。这种攻击的特点是可以完全绕过普通的防火墙防护。  

正常的服务请求如下图：  
![Right HTTP Request](https://store.skylinebin.com/image/ddos/RightHTTPRequest.png)  

遭受 HTTP Get 攻击的请求:  
![Wrong HTTP Request](https://store.skylinebin.com/image/ddos/WrongHTTPRequest.png)  

可以利用以上的异常请求达到 HTTP GET 攻击的目的。  
HTTP GET 攻击 在 DDoS 网关设备显示的特点： 攻击流量小，但是 CPU资源占用高。  



### 参考资料  

 [TCP/IP Illustrated, Volume 1: The Protocols (Second Edition)   ](https://www.amazon.cn/dp/B01HGINTJ2/ref=sr_1_1?s=books&ie=UTF8&qid=1536389644&sr=1-1&keywords=tcpip%E8%AF%A6%E8%A7%A3)  
 北风网Web安全系列讲解

