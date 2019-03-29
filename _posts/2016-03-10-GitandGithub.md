---
layout: post
title:  "Git简介及日常使用"
image: ''
date:   2016-03-10 00:06:31
tags:
- Github
- Git
- Projects
- 
description: 'Using git tools'
categories:
- SkylineBin
---

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Git 协同工具也用了很久了，一直没有给出一个系统点儿的总结。乘着这次返修blog的机会，理一理常用的Git指令和需要注意的细节部分吧。  


## Git可被了解的部分  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;我最开始使用 Git 的时候，看过挺多介绍如何使用的博客，包括 [阮一峰](http://www.ruanyifeng.com/blog/2015/12/git-workflow.html) 和 [廖雪峰](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000), 还有 [图解Git](http://marklodato.github.io/visual-git-guide/index-zh-cn.html) 等博客。每种博客都有自己的特点，简单介绍原理时会用到几张图解Git里面的图来解释，如果详细了解，还是看大佬们的博客吧。除了上面几篇博客，还有更系统的Git使用手册：  
	1.[Git官方使用手册英文版](https://git-scm.com/book/en/v2) 和 [中文版](https://git-scm.com/book/zh/v2)  
	2.[Git社区手册](http://gitbook.liuhui998.com/)  
有了上面的资料，遇到大部分Git使用问题，都能得到解决，还有的就是搜索了。  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Git 的安装就不说了，可以去 **[Git官网](https://git-scm.com/)**下载安装，截止整理修改的时间，版本是2.18.0，我记得后面 Github 需要2.16.0 之后的 Git 支持，以后可以找找相关资料补充进来。此外，看看 Git 官网的使用 Git 的企业，真的可以用功不可没来形容 Git 工具对科技公司发展中开发速度和管理效率提供的帮助了。  

![Companies Using Git](https://store.skylinebin.com/image/git/GitCompanies.png)  

这里不提其他版本管理工具，下面是 Git 最基本的原理部分了。  


下面这张图是 [图解Git](http://marklodato.github.io/visual-git-guide/index-zh-cn.html) 里面介绍 Git用法的一张图：  

![Git基本原理](https://store.skylinebin.com/image/git/basic-git.svg)  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;版本控制，顾名思义，就是有一份文档或者一个项目有很多个版本，如何管理这里版本以及如何处理版本与版本之间的联系是个很重要的问题。Git里面使用的原理，我理解为 一种类似时间线的管理方式：四维空间里面时间是每时每刻都在动的，所以每个时刻也是唯一的，于是有了 History , 版本与版本之间是有区别的，不能每修改一个字符就切换一个版本吧，所以需要在时间线上打节点，每一个新版本都是基于上一个版本变化，所以使用暂存区域 Stage 来为整个项目中上一个版本打节点，只需要在 Working Directory 里面对比 Stage 里存储的上一个版本产生的变化。每次有了变化想要提交一个新版本，就要先把工作空间里的变化添加到 Stage 里，并且可以做好标记变化的东西是为了什么。如果想要同步到这条时间线上，就需要把 Stage 里的变化 提交到 History 里，并且成为 History 里面的一个版本。下一个版本就要基于这个版本来修改，这个是最简单的 Git 使用类比了。当然有了不同版本和标记，就可以有版本回退，有了一条时间线 就有了分支，还有在协同开发里有了线上仓库和本地仓库，多个不同的本地仓库分支相互同步，就可能产生冲突，也有了 merge 。这些都是应用基础。  

## Git常用指令介绍  


上述原理部分的解释对应以下指令：  
```shell
git clone https://github.com/tensorflow/tensorflow.git

git pull

git status

git add .

git commit -m "why did I do this?"

git push

```

其中 git clone 是把线上的项目 clone 到本地， git pull 是把线上版本的 History 拉去下来 更新 本地版本的 History 和 Stage, 所以如果 现有的 Stage 里面出现对应线上刚刚更新 的修改，可能会产生冲突。一般在修改本地 仓库时，先使用 git pull 把线上的版本拉取下来。可以使用 git status 查看本地仓库的状态，如果有修改，使用 git add . 将全部修改添加到 Stage , git commit -m 是将 Stage 里修改的部分 提交到本地仓库的 History , 使用 git push ，将本地的修改提交到线上仓库。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;以上指令，可以实现版本同步的需求。但是日常开发中 **分支** 的概念使用的也很多。分支的概率就像是他的名字，它是项目时间线的枝叶，从分出去的那一刻，它就携带了主分支(那一刻对应的时间线)上的项目内容和状态，当然也可以将分支的内容同步到主分支上。主要代码如下：  
先创建 新分支 new-branch
```shell

PS E:\StartVue\VuejsProject\Travel> git pull
From https://gitee.com/skylinebin/Travel
* [new branch]      new-branch -> origin/new-branch
Already up to date.
PS E:\StartVue\VuejsProject\Travel> git checkout new-branch
Switched to a new branch 'new-branch'
Branch 'new-branch' set up to track remote branch 'new-branch' from 'origin'.

```
以上代码用于切换到新分支 new-branch，接下来所有的操作都被记录在新分支上，修改完一个版本，可以使用:  

```shell
git add .
git commit -m 'finish new-branch'
git push
```
如果想要合并新分支到主分支上，需要使用：  

```shell
git checkout master
git merge origin/new-branch
git push
```  
可以将 new-branch 上的内容同步到 主分支 master 上。  
一个项目可以新建很多分支，用于记录完成不同的功能。如下图所示，每个分支都对应一小部分功能：  

![git分支演示](https://store.skylinebin.com/image/git/GitBranch.png)  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;上面基本就是经常使用的 Git 命令，上面图片是使用 [码云](https://gitee.com/) 完成的，当然经常使用的自然少不了 [Github](https://github.com/) ，自从 Github 被微软收购后，又不少人转用了 [GitLab](https://gitlab.com/)。  
除此之外，安装官方Git后一般会默认安装 Git Bash， Git Bash 是类似 Terminal 的终端( 也像 Windows 里的 PowerShell ) 一般都使用它完成 git 项目的同步。 [小乌龟](https://tortoisegit.org/) 也很好用，Windows 版本会在 Git 项目文件夹上给出修改和未修改的标记，这个对核对文件很有帮助。  


## Github使用相关  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;虽然 **Github** 随着微软收购后，知道的人越来越多，也越来越乱。但还是不可否认开源项目在 Github 上散发的生机。特别是像 React, Vue, Tensorflow 等热门开源框架的应用场景越来越多，生态系统越来越多样，有必要好好学习在 Github 上找资源，不管是学术还是技术，只要搜索关键词，都能找到比较相关的资源。  

这里还是推荐一下这个Chrome浏览器插件 [Octotree](https://github.com/buunguyen/octotree) ，可以在 Github 里不打开多级目录的情况下，看到项目文件结构,对于在大型项目里查阅单个文件夹或文件十分有帮助。  

![Octotree演示](https://store.skylinebin.com/image/git/Octotree.png)  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;此外，Github Pages 也为静态网页的实现提供了 方便快捷的服务，先在项目创建项目是就可以选择打开 Github Pages , 使开源项目的展示变得更直接，可以使用 CNAME 绑定域名，实现域名跳转，这个也是值得尝试的。  


## Git问题处理  

在日常使用 Git 过程中，总是会遇到各种各样的问题，问题解决方案基本都能 Google 或者 StackOverflow 上找到。下面列出一下在项目中遇到的问题。  

1.在执行git push &pull时遇到“fatal: Out of memory, malloc failed (tried to allocate 524288000 bytes)”  
进入 git 项目目录，执行：  
```shell

git config --global pack.windowMemory 1024m

```
即可继续同步项目。

2.当线上项目的项目名改变后，同步本地项目就提示找不到原线上项目地址  
这时可以选择重新 clone 一遍，也可选择修改 git 配置文件。配置文件一般是在 被隐藏的 .git 文件夹下，把 目录中的 config 文件 中的 url 修改为新项目的 url 地址即可。  

## 本地Git服务器  

在某些情况下，可能组织内部有服务器，或者团队项目涉及保密级别较高需要使用自己的 版本控制平台，如果选择 Git ，这里有几种可以选择。可以使用 [Gogs](https://gogs.io/) 实验室 Git 平台就是使用这个搭建的，需要 MySQL 数据库的支持，简单易用；也可以选择使用 Git 原生的代码 结合管理公钥的插件也可以完成；此外还可以使用 [Gitbli](http://www.gitblit.com/),相关的资料很多，可以尝试使用。  


