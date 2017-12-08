---
layout: post
title:  "How to install tensorflow-gpu in Ubuntu16.04"
date:   2017-12-08 23:25:31
description: 'About DeepLearning Environment'
tags:
- Ubuntu
- Tensorflow
- Python
- MachineLearning
categories:
- SkylineBin
twitter_text: 'How to install tensorflow-gpu in Ubuntu16.04? '
---

# Linux Tensorflow GPU 环境搭建


#### 本次安装硬件条件
* 硬盘大于100G（最少20G）
* 内存16G（最少8G）
* GPU:GTX1050Ti（1050及以上）
* CPU：i7-7700 3.6GHz
* （显示器使用HDMI线接GTX独立显卡的HDMI接口）

### 1.安装NVIDIA显卡驱动
&nbsp;&nbsp;&nbsp;&nbsp;安装好Ubuntu再安装NVIDIA显卡驱动（虽然之后安装CUDA会带上驱动，但建议先独自装好显卡驱动）。
&nbsp;&nbsp;&nbsp;&nbsp;安装前先看看Ubuntu的"关于这台计算机"里面,图形的位置后面是否仅有集成显卡的信息，而没有类似GeForce GTX 1050Ti这些信息。

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;先下载N卡驱动（http://www.nvidia.cn/Download/index.aspx?lang=cn）
选择如下图所示:
![NVIDIADriver](http://osaussnqu.bkt.clouddn.com/NVIDIADriver.png)
（下载得到NVIDIA-Linux-x86_64-384.98.run 文件）
&nbsp;&nbsp;&nbsp;&nbsp;记住文件存放所在目录(老问题，目录路径不要有中文！！)

&nbsp;&nbsp;&nbsp;&nbsp;Ctrl+Alt+T进入终端 ，卸载禁用自带的 nvidia*驱动并加入黑名单
```
sudo apt-get purge nvidia*  #卸载自带驱动

#禁用自带驱动创建黑名单

sudo vim /etc/modprobe.d/blacklist-nouveau.conf #未安装vim用vi ，不会用vim 用gedit

#内容如下:
blacklist nouveau
options nouveau modeset=0

#保存以上文件,更新一下
sudo update-initramfs -u

```
<strong>重启</strong>系统(稳妥重启大法)
Ubuntu窗口界面进入文本界面(Ctrl+Alt+F1),并登录账户
先关闭图形化界面支持(x-window)

```
sudo service lightdm stop #关闭x-window

#进入 NVIDIA-Linux-x86_64-384.98.run 文件目录
ls #文件列表
sudo sh ./NVIDIA-Linux-x86_64-384.98.run #安装显卡驱动

sudo service lightdm stop  #打开x-window支持

reboot #重启进入窗口界面

```
重启进入界面，查看驱动安装情况
```
nvidia-smi #N卡驱动列表
```
(之前因为没有独立显卡驱动，可能桌面分辨率很低，显示不全都有可能，安装驱动成功后明显分辨率自动更改为合适大小)

### 2.安装CUDA-8.0
&nbsp;&nbsp;&nbsp;&nbsp;(安装失败教训：不要下载最新的CUDA-9.0，因为tensorflow-gpu的配置文件中需要的库文件还是CUDA-8.0提供的，比如：libcublas.so.8.0、libcurand.so.8.0等等文件，都是CUDA-8.0里面的）

&nbsp;&nbsp;&nbsp;&nbsp;(官网的历史版本界面下载安装文件(https://developer.nvidia.com/cuda-80-ga2-download-archive)
![CUDAToolkit](http://osaussnqu.bkt.clouddn.com/CUDAToolkit.png)
(下载得到cuda_8.0.61_375.26_linux.run 文件)
与之前显卡驱动一样，进入文件目录
```
sudo sh ./cuda_8.0.61_375.26_linux.run
```
等待进入条款，0%，按回车键强行阅读条款，直到出现是否接受条款
```
accept

NVIDIA Driver    no
CUDA Toolkit8.0  yes
default /usr/local/cuda-8.0
CUDA Samples yes


Driver: Not Selected
Toolkit: Installed in /usr/local/cuda-8.0
Samples: Installed in /home/skylinebin

```
安装之后需要设置环境变量和动态链接库
在终端输入
```
sudo vim ~/.bashrc

#在末尾插入

export PATH=/usr/local/cuda-8.0/bin${PATH:+:${PATH}}
export LD_LIBRARY_PATH=/usr/local/cuda-8.0/lib64${LD_LIBRARY_PATH:+:${LD_LIBRARY_PATH}}

#结束当前用户的环境变量并激活
source ~/.bashrc


#同样加入系统的环境变量

sudo vim /etc/profile

#插入以下指令
export PATH=$PATH:/usr/local/cuba-8.0/bin
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/cuda-8.0/lib64
export LIBRARY_PATH=$LIBRARY_PATH:/usr/local/cuda-8.0/lib64

#结束系统环境变量及刷新

source /etc/profile

```

### 3.调整Python版本以及安装Tensorflow-gpu

##### 将默认Python2.7改成自带的Python3.5.2
ctrl+Alt+T 打开终端
```
python --version         #查当前默认Python版本

whereis python3         #查自带的Python3.5存放位置

sudo rm /usr/bin/python   #移除以及链接的默认Python版本

sudo ln -s /usr/bin/python3.5 /usr/bin/python   #建立新的链接默认Python改为Python3.5 若改回2.7同样操作

```
##### 安装Python3的pip
```
sudo apt-get install python3-pip
```
##### 安装Tensorflow-gpu
```
sudo python3 -m pip install tensorflow-gpu #若不确定默认Python的版本可使用
```
测试Tensorflow-gpu 是否安装好
终端输入python 逐条输入以下code
```
import tensorflow as tf
hello = tf.constant('Hello, TensorFlow!')
sess = tf.Session()
print(sess.run(hello))

```
第三句的时候应该会运行Tensorflow，如果不报错基本就可以了

安装keras
```
sudo python3 -m pip install keras
```


运行相关的程序时如果提示缺少"_tkinter"模块
```
sudo apt-get install python3-tk
```
### 4.安装Pycharm
&nbsp;&nbsp;&nbsp;&nbsp;Pycharm是比较受欢迎的Python编辑器，一般有添加源安装和下载手动编译安装，为了简单就直接添加源安装吧。
```
sudo add-apt-repository ppa:mystic-mirage/pycharm   #添加源

sudo apt update   #更新软件库

#安装社区版
sudo apt install pycharm-community

#安装专业版(需要激活)
sudo apt install pycharm

```
### 5.总结
&nbsp;&nbsp;&nbsp;&nbsp;这次配置环境是在一台裸机上，本来没有系统，进入WinPE分了100G来给Ubuntu用，做启动盘(rufus软件好评),然后就是装系统和装显卡驱动，默认下载的CUDA是9.0，可能Ubuntu的Tensorflow-gpu源还没有更新CUDA库文件，致使安装失败，发现问题并且解决。还是挺费时间，但是也学到了一些基本的底层驱动的操作，应该勉强可以吧。