---
layout: post
title:  "LISMS虚拟实验室网站借鉴"
date:   2018-12-07 15:45:31
image: 'https://sdns.skylinebin.com/Robotics.png'
description: 'Virtual panorama laboratory -- LISMS'
tags:
- Laboratory
- Application
- Panorama
categories:
- SkylineBin
twitter_text: 'LISMS虚拟实验室网站借鉴'
---  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;前段时间实验室读博的学长去新西兰参加国际会议(相关专业的顶会)，期间在微信群里分享了一个用全景照片做的虚拟实验室。整体包含了整个实验室的研究内容和主要成果，当时看了就觉得这个效果很不错，简单直接，就想尝试分析一下实现的技术细节。后面简单分析了一下就觉得，展示技术真的不是重点，更重要的是研究成果和研究思路，然后又细心整理了一遍整个实验室的概况(不是很深入，自己还是在学术上花费的精力太少了)，内容真的与核心，有挺多可以参考的地方。

# 优秀实验室网站借鉴---LISMS  

> by SkylineBin 2018.12.07  


虚拟实验室网址：[http://dibadata.com/lab.html](http://dibadata.com/lab.html)  
实验室：[Laboratory for Industry 4.0 Smart Manufacturing Systems (LISMS)](http://www.mech.auckland.ac.nz/en/about/ourresearch/research-facilities/LISMS.html)  
所在大学：[The University of Auckland](https://www.auckland.ac.nz/en/engineering/about-the-faculty/mechanical-engineering.html)  
实验室知名人员：[Professor Xun William Xu](https://unidirectory.auckland.ac.nz/people/xun-xu)  

制作者： Reza HZE(srhamzeh@gmail.com)  


虚拟实验室概况：  

![LISMS](https://sdns.skylinebin.com/Academic/LISMS/posters/LISMS.png)

## 站点内容解析  
主要特点：**汇聚研究领域主要内容与典型研究成果**  

### 图片展示部分  

- [Industry 4.0 Enabling Technologies](https://sdns.skylinebin.com/Academic/LISMS/posters/_i4_technologies.jpg)  

- [Smart AGV for Manufacturing in the Context of Industry 4.0](https://sdns.skylinebin.com/Academic/LISMS/posters/_2agv.jpg)  

- [Modular Industrial Realtime Augmented Graphic Engine](https://sdns.skylinebin.com/Academic/LISMS/posters/_3errol.jpg)  

- [UX-based Personalised Smart Wearable](https://sdns.skylinebin.com/Academic/LISMS/posters/_4pai.jpg)  

- [AR-assisted iWindow for CPMT](https://sdns.skylinebin.com/Academic/LISMS/posters/_5shane.jpg)  

- [Retro-fitting for data acquisition and analytics](https://sdns.skylinebin.com/Academic/LISMS/posters/_5shane.jpg)  

- [Assembly Validation in Virtual Reality](https://sdns.skylinebin.com/Academic/LISMS/posters/_7millinda.jpg)  

- [Model-based definition in Cloud Manufacturing](https://sdns.skylinebin.com/Academic/LISMS/posters/_8rivai.jpg)  

- [Cyber-twin Services for Machine Tools](https://sdns.skylinebin.com/Academic/LISMS/posters/_9khamdi.jpg)  

- [Support structures for Additive Manufacturing](https://sdns.skylinebin.com/Academic/LISMS/posters/_10jc.jpg)  

- [Automated Production Line](https://sdns.skylinebin.com/Academic/LISMS/posters/_11ehsan.jpg)  


下载链接：[posters](http://dibadata.com/posters/posters.zip)  


### 视频展示部分  

#### HoloLens AR Visualllisation 
(https://youtu.be/eXEBr5gC4AQ)  
理论：CPMT(Cyber-Physical Machine Tools)  
实时显示参数，就技术而言应该也不难  

#### AR Machining Simulation  
(https://www.youtube.com/watch?v=Pd0GWaOI9ko&feature=youtu.be)  
实时显示场景，是一个场，具体细节待确认  


#### KuKA Production Line - Gripper  
(https://youtu.be/lm4l0XKoduM)  
主要细节：流程化展示机器人产线对汽水瓶的一系列操作 
有完整的流程，重点突出，展示设计部分较好  

#### KUKA Production Line - Conveyer  
(https://youtu.be/QBR7MQTYi54)  
两台机器人协作完成一个产品的加工，工具切换直接旋转末端执行器  

#### KuKA Robot Digital Twin
(https://youtu.be/2o0l1V6QdgA)  
成果不深入，就展示部分是单个机器人实际控制虚拟机器人动，缺乏场景，但比较纯粹，简单直接。  

#### MIRRAGE User/Manufacturer
(https://www.youtube.com/embed/a56FkHu-P94?rel=0&autoplay=1)  
(https://www.youtube.com/watch?v=J8R-NZEqtiE&feature=youtu.be)  
内容没有看明白，但分为User部分 和 Manufacturer部分效果看起来不错(呈现出的效果与背后的运行管理机制分开展示)。  


#### Smart AGV(RFID Driven AGV Cooperated with KuKa)  
(https://www.youtube.com/watch?v=bUEP5uok6gI&feature=youtu.be)  
主要展示使用磁道航(实验室AGV研究的同学给出的科普)，主要实现将物品转移至指定地点。  
[该实验室AGV成果记录GooglePhotos](https://photos.google.com/share/AF1QipMW6lZFGaRJmqdbz-Tmca3wbrmdIZ6ryq0bbRtGKqNwWq7DpNSt7IeuRfktakjlBQ?key=LXVaV29LQmZtZ2d1RDF4Z1c4T0tjMUF5M3g0YzlR)  


#### MCloud  
(https://www.youtube.com/watch?v=1D7CbBjcEag&feature=youtu.be)  
通过上传本体模型来匹配服务供应商，并给出服务评估与完成时间的预测，筛选符合指定指标的制造服务。  
制造云管理系统，纯系统演示，图表与地图，突出重点。  

## 使用技术剖析  
主要使用技术：**全景照片嵌入** + **VR模式**(效果：视觉冲击，与设备联系紧密，内容简单直接)  
### 技术栈：  
- 域名：独立域名(dibadata.com)  
- 服务器：美国云服务厂商  
- Web服务器: Nginx  
- 全景模式页面：**Panotour Pro** 全景制作软件  
- 所需素材积累：**实验室360度全景图**+研究领域主体内容图(样式保持一致)+剪辑过在线媒体视频+图标素材  
- 场景技术：小行星视图+地面logo+自动旋转  
- 技术归类：所涉及的技术均为展示型的技术，重点在于 **内容和所做的成果的整理**  


### Demo 版的实验室概况：  

借鉴以上的 LISMS 实验室的模式，对 RSMLab(Robotics and Sustainable Manufacturing Laboratory) 的虚拟实验室进行构建。

RSM Laboratory Demo: [Demo](http://localhost:8899/lab.html)  
http://localhost:8899/lab.html
(粗略版的Demo，目前部署在本机的端口上，等后期完善后，再放在云服务器上)  

以下是Demo版的全景虚拟实验室的几个角落：

![RSMLabABB](https://sdns.skylinebin.com/Academic/RSM/RSMLabone.png)

![RSMLabAGV](https://sdns.skylinebin.com/Academic/RSM/RSMLabtwo.png)

Demo现存缺陷:   

- 全景照片来自小米5X,并非专业全景相机拍摄，不能达到360度，所以顶部和底部视角无法到达。  
- 素材积累不够，并且大多来自个人收集，未经过系统整理和处理  
- 站点部署在个人电脑上，只能在校园网内以ip+端口的方式访问  

后续可借鉴使用的地方：  

- 素材整理要更加规范，展板样式统一  
- 部分视频要精心剪辑，并上传至公网可在线播放，利于传播  
- 展示案例要挑选，重点突出  

### 实验室发展可借鉴的地方

环境：开放式的环境，**整洁**，区域划分明显   
成果演示：构建流程化的演示体系，提前录制好解说视频，可配套实时演示


&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;有一个开放式的研究环境应该会有更好的研究体验，做科研也是长路漫漫，学技术更是。这个虚拟实验室制作的成本其实很低，熟悉之后基本一个工作日就能弄一个比较好的出来。这个虚拟实验室可以与暑假带领团队做的 实验室网站，实验室设备管理系统、微信小程序预约系统一起构成一套实验室宣传与管理的系统。技术现在应该没有什么问题，体系的构建和使用还是需要大佬们的推广。希望RSML早日能够达到国际顶尖实验室的水准，无论是在学术上还是管理体系上。
