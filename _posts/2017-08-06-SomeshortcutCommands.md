---
layout: post
title:  "Windows下的快捷指令操作"
image: ''
date:   2017-08-06 00:40:21
tags:
- Script
- Computer
- MicrosoftWindows
- Command
description: 'About Windows'
categories:
- SkylineBin
twitter_text: 'Some shortcut commands in Windows system'
---

<div style="margin: 0px auto;text-align: center;">
<embed src="//music.163.com/style/swf/widget.swf?sid=28875230&type=2&auto=1&width=320&height=66" width="380" height="96"  allowNetworking="all">
</div>

### 安装Windows系统的主机配置查询  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在Windows系统中，经常会遇到查询系统的属性以及主机的硬件配置问题，这是对软件运行环境的预测和评估的必要条件。Windows系统既然是一个系统，就必然带有硬件检测工具，来查看硬件的属性和状态。所以可以使用Windows系统自带可以识别的一些指令来查看系统状态和硬件环境。下面有几种详细程度不同的方法供大家参考<strong>：</strong>  

#### 命令提示符中简单系统信息查询  

1. 开始 → 运行 →CMD打开命令提示符(或者Win+R输入cmd)  
2. 在该窗口下输入<strong>systeminfo</strong>执行，即可看到几乎所有的系统信息，甚至包括机器上已安装的网卡及其IP。  
![systeminfo系统信息查询](https://store.skylinebin.com/image/png/systeminfo.png)  

#### 在运行中详细查询  

开始 → 运行(或者Win+R) → 输入<strong>msinfo32</strong>,可以打开系统信息进行查询  

![msinfo32系统信息查询](https://store.skylinebin.com/image/png/msinfo32.png)  

#### DirectX诊断查询信息  

开始 → 运行(或者Win+R) → 输入<strong>dxdiag</strong>,可以打开DirectX诊断信息进行系统信息查看  

![DirectX诊断查询信息](https://store.skylinebin.com/image/png/DirectX.png)  

#### 打开设备管理器查询设备信息  

开始 → 运行(或者Win+R) → 输入<strong>devmgmt.msc</strong>,可以打开设备管理器查看状态以及驱动情况  

![设备管理器查询设备信息](https://store.skylinebin.com/image/png/devmgmtmsc.png)  

#### 打开任务管理器查看当前运行的进程  
1. 开始 → 运行(或者Win+R) → 输入<strong>taskmgr</strong>,可以打开任务管理器在性能选项卡查看状态以及运行程序的情况  
2. <strong>Ctrl+Shift+Esc</strong>同样也可以打开任务管理器，相同查看方式  

![任务管理器查看信息](https://store.skylinebin.com/image/png/taskmgr.png)  

#### 打开操作系统版本描述  
开始 → 运行(或者Win+R) → 输入<strong>winver</strong>,可以当前Windows操作系统的版本  

![操作系统版本描述](https://store.skylinebin.com/image/png/winver.png)  

### 使用dos命令查看硬盘、内存、CPU信息  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;同样在Windows系统中，硬盘、内存、CPU和BIOS系统的信息在某些情况下也会被使用到。使用Windows系统可以识别的dos指令来查看硬盘、内存、CPU的信息，具体的指令如下所示(以下指令都是在命令提示符中使用)<strong>：</strong>  

#### dos指令查看磁盘信息  
开始 → 运行 → CMD(或者Win+R→CMD) → 输入<strong>wmic volume</strong>,可以查看主机硬盘信息，以及各个盘符的剩余容量  

![查看主机硬盘信息](https://store.skylinebin.com/image/png/wmicvolume2.png)  

#### dos指令查看CPU信息  
开始 → 运行 → CMD(或者Win+R→CMD) → 输入<strong>wmic cpu</strong>,可以查看主机CPU信息，以及CPU的具体信息  

![查看CPU信息](https://store.skylinebin.com/image/png/wmiccpu2.png)  

#### dos指令查看内存信息  
开始 → 运行 → CMD(或者Win+R→CMD → 输入<strong>wmic memorychip</strong>,可以查看内存信息，以及各个内存条的信息和容量  
![查看内存信息](https://store.skylinebin.com/image/png/wmicmemorychip.png)  

#### dos指令查看bios系统信息  
开始 → 运行 → CMD(或者Win+R→CMD) → 输入<strong>wmic bios</strong>,可以查看bios系统信息  

![查看bios系统信息](https://store.skylinebin.com/image/png/wmicbios.png)  


### 还有一个比较有用的  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在Windows系统中可以使用<strong>ConEmu</strong>软件代替系统的命令提示符，这个软件可以复制粘贴，并且界面比自带的好看很多，也算一个干货中的干货吧！继续加油！  

