---
layout: post
title:  "操作系统--磁盘调度算法"
date:   2018-01-19 19:51:31
image: '../assets/img/singledog.png'
description: 'Basic skills'
tags:
- System
- Algorithm
- DiskScheduling
- Work
categories:
- SkylineBin
twitter_text: '磁盘调度算法总结 '
---


&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;这篇文章是参考好几篇博客而整理的关于磁盘I/O调度算法的内容，都比较基础，应该也挺重要。文中涉及到的代码的**完整源码**都放在了我的Github[关于算法部分](https://github.com/skylinebin/AlgorithmPractice/tree/master/Disk%20Scheduling%20Algorithm)当中了。

## 磁盘调度算法  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在操作系统中，各个进程可能会不断提出不同的对磁盘进行读/写操作的请求，有时候这些进程的发送请求的速度比磁盘响应的还要快，所以需要为每个磁盘设备建立一个等待队列，这就是磁盘调度。磁盘调度的目的是减少磁盘访问延迟，磁盘访问延迟可以定义为：  
> 磁盘访问延迟 = 队列时间 + 控制器时间 + 寻道时间 + 旋转时间 + 传输时间  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;磁盘调度的目的是减小延迟，前两项可以忽略，寻道时间是磁盘访问延迟的主要考虑部分。因此，使用**磁盘调度算法**来尽可能减少磁盘寻道时间。  

### 一、磁盘调度算法
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;常用的磁盘调度算法通常有以下四种：FCFS(先来先服务算法)、SSTF(最短寻道时间优先算法)、SCAN(电梯扫描算法)、CSCAN(循环电梯扫描算法)。  
#### 1.先来先服务算法（FCFS, First Come First Serve）  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;先来先服务算法是一种最简单的磁盘调度算法，它**根据进程请求访问磁盘的先后次序进行调度**。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;例如：当前磁道磁头位于地址为42的磁道，现有6条访问磁道请求。(模拟地址为0~99的磁盘磁道)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Current Location：42  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Access Request:   

    0  |  1 | 2 |  3 |  4 |  5
    ---|----|---|----|----|----
    29 | 84 | 1 | 89 | 51 | 94   

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;使用FCFS算法对磁盘磁道访问请求进行处理：
```java  
//@author SkylineBin
public static void fcfssort(int[] dataA, int current){
//        dataA是按请求顺序排列的磁道访问请求，current是当前磁道磁头位置
    System.out.println("开始先来先服务(FCFS)算法:");
    int processlen = dataA.length;
    int allcount=0;
    int step;
    step = Math.abs(current - dataA[0]);
    System.out.println("1:  "+ current+"---->"+dataA[0]+"  移动"+step+"次");
    allcount = allcount+step;
    for(int i=0;i<processlen-1;i++){
        step = Math.abs(dataA[i] - dataA[i+1]);
        System.out.println(i+2+":  "+ dataA[i]+"---->"+dataA[i+1]+"  移动"+step+"次");
        allcount+= step;
    }
    System.out.println();
    System.out.println("磁道磁头总移动:"+allcount+"次");
    System.out.println("-------------------------");
}
```  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;传入的参数是访问请求序列和当前磁头位置，运行以上程序，可以得到以下结果：  
```java  
-------------------------
开始先来先服务(FCFS)算法:
1:  42---->29  移动13次
2:  29---->84  移动55次
3:  84---->1  移动83次
4:  1---->89  移动88次
5:  89---->51  移动38次
6:  51---->94  移动43次

磁道磁头总移动:320次
-------------------------
```  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;先来先服务(FCFS)算法的优点是公平、简单，且每个进程的请求都能依次地得到处理，不会出现某一进程的请求长期得不到满足的情况。但此算法由于未对寻道进行优化，致使平均寻道时间可能较长。  

#### 2.最短寻道时间优先算法（SSTF, Shortest Seek Time First）  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;最短寻道时间优先算法的思想是，**磁头总是先访问距离当前磁道最近的磁道**。这种算法的本质是利用贪心算法来实现，假设当前磁道在某一位置，接下来处理的是距离当前磁道最近的磁道号的请求，处理完成之后再处理离这个磁道号最近的磁道号，直到所有的磁道号的请求都处理完。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;现使用相同的初始值和磁道访问请求数据：  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Current Location：42  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Access Request:   

    0  |  1 | 2 |  3 |  4 |  5
    ---|----|---|----|----|----
    29 | 84 | 1 | 89 | 51 | 94   

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;使用SSTF算法对磁盘磁道访问请求进行处理：  
```java  
//@author SkylineBin
public static void sstfsort(int[] dataA, int current){
    //dataA是按请求顺序排列的磁道访问请求，current是当前磁道磁头位置
    System.out.println("开始最短寻道时间优先(SSTF)算法:");
    int processlen = dataA.length;
    int[] accessList = new int[processlen];
    int allcount=0;
    int step=0;
//        int tempmove= 200;
    int tempmove= 1000;//用于把第一个值赋值
    int ChosedIndex =0;    //用于缓存当前移动位置
    for(int i=0;i<processlen;i++){
        for(int j=0;j<processlen;j++){
            if(dataA[j]!=-1){
                if(Math.abs(tempmove-current)> Math.abs(dataA[j]-current)){
                    tempmove = dataA[j];
                    ChosedIndex = j;
                }
            }
        }
        accessList[i] = tempmove;
        step = Math.abs(tempmove - current);
        System.out.println(i+1+":  "+ current+"---->"+tempmove+"  移动"+step+"次");
        allcount+= step;
        dataA[ChosedIndex] = -1;
        current = tempmove;
        tempmove = 1000;
    }
    System.out.println();
    System.out.println("磁道磁头总移动:"+allcount+"次");
    System.out.println("-------------------------");
}
```  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;传入的参数同样是访问请求序列和当前磁头位置，运行以上程序，可以得到以下结果：  
```java  
-------------------------
开始最短寻道时间优先(SSTF)算法:
1:  42---->51  移动9次
2:  51---->29  移动22次
3:  29---->1  移动28次
4:  1---->84  移动83次
5:  84---->89  移动5次
6:  89---->94  移动5次
磁道磁头总移动:152次
-------------------------
```  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;最短寻道时间优先（SSTF）算法性能会优于FCFS算法，但是会使距离当前磁道较远的磁道号长期得不到服务，也就是“饥饿”现象，因为要求访问的服务的序列号是动态产生的，即各个应用程序可能不断地提出访问不同的磁道号的请求。故不能保证平均寻道时间最短。   

#### 3.电梯扫描算法（SCAN）  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;电梯扫描算法其基本思想与电梯工作原理类似：最开始时，磁头向访问请求的方向A扫描，在磁头移动过程中，如果经过的磁道有访问请求，则为其服务。接着判断A方向是否仍有请求，有则向A移动处理，否则调转方向向B移动。电梯扫描算法流程如下图所示：  

![SCAN Algorithm](http://osaussnqu.bkt.clouddn.com/image/system/scanAlgo.png)  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;现使用相同的初始值和磁道访问请求数据：  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Current Location：42  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Access Request:   

    0  |  1 | 2 |  3 |  4 |  5
    ---|----|---|----|----|----
    29 | 84 | 1 | 89 | 51 | 94   

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;使用SCAN算法对磁盘磁道访问请求进行处理：  

![SCAN Algorithm Program](http://osaussnqu.bkt.clouddn.com/image/system/scan.png)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;传入的参数同样是访问请求序列和当前磁头位置，运行以上程序，可以得到以下结果：  
```java  
-------------------------
开始电梯扫描(SCAN)算法:
1:  42---->29  移动13次
2:  29---->8  移动21次
3:  8---->1  移动7次
4:  1---->84  移动83次
5:  84---->89  移动5次
6:  89---->94  移动5次

磁道磁头总移动:134次
-------------------------
```  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;以上算法设计过程中要考虑当前磁头所在位置可能在所有请求的两侧，选取先扫描的方向是A或者是B对最终的结果也有影响。如下图所示，是选择先向高再向低的电梯扫描算法：  
```java  
-------------------------
开始电梯扫描(SCAN)算法:
1:  42---->84  移动42次
2:  84---->89  移动5次
3:  89---->94  移动5次
4:  94---->29  移动65次
5:  29---->8  移动21次
6:  8---->1  移动7次

磁道磁头总移动:145次
-------------------------
```  
可以对比，两次的磁头总移动距离是不同的。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;电梯扫描算法既能获得较好的寻道性能，又能防止“饥饿”现象，故被广泛用于大、中、小型机器和网络中的磁盘调度。但是SCAN算法也存在这样的问题：当磁头刚从里向外移动而越过了某一磁道时，恰好又有一进程请求访问此磁道，这时，该进程必须等待，待磁头继续从里向外，然后再从外向里扫描完所有要访问的磁道后，才处理该进程的请求，致使该进程的请求被大大地推迟。  

#### 4.循环扫描算法（CSCAN）  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;为了减少SCAN算法中的新发请求的延迟，CSCAN算法规定磁头单向移动。比如，磁头访问完最里面一个要求服务的磁道请求之后，从最外层的序号最大的开始往里走，始终保持一个方向扫描。  

![CSCAN Algorithm](http://osaussnqu.bkt.clouddn.com/image/system/cscanAlgo.png)  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;循环电梯扫描算法的流程如上图所示。假设扫描方向是从B到A，则扫描顺序如上图中箭头方向。现使用相同的初始值和磁道访问请求数据：  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Current Location：42  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Access Request:   

    0  |  1 | 2 |  3 |  4 |  5
    ---|----|---|----|----|----
    29 | 84 | 1 | 89 | 51 | 94  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;使用SCAN算法对磁盘磁道访问请求进行处理：  

![CSCAN Algorithm Program](http://osaussnqu.bkt.clouddn.com/image/system/cscan.png)  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;传入的参数同样是访问请求序列和当前磁头位置，运行以上程序，可以得到以下结果：  
```java  
-------------------------
开始循环电梯扫描(SCAN)算法:
1:  42---->29  移动13次
2:  29---->8  移动21次
3:  8---->1  移动7次
4:  1---->94  移动93次
5:  94---->89  移动5次
6:  89---->84  移动5次

磁道磁头总移动:144次
-------------------------
```  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;以上循环电梯扫描算法设计过程中要考虑当前磁头所在位置可能在所有请求的两侧，选取先扫描的方向是A或者是B对最终的结果也有影响，对于初始位置位于两侧的情况，在方向确定的情况下，执行的结果是一样的。  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;上述实验中使用到的数据生成使用的代码为：  
```java  
int maxran = 100;
int minran =1;
int totalnum = 6;
int tempdata =0;
int[] dataArray = new int[totalnum];
Random trandom = new Random();
int currentdata = trandom.nextInt(maxran)%(maxran-minran+1) + minran;
//        生成初始磁道位置
System.out.println("当前磁道位置:"+currentdata);
for(int i=0;i<totalnum;i++){
    tempdata = trandom.nextInt(maxran)%(maxran-minran+1) + minran;
    //模拟生成磁道请求
    System.out.println("磁道访问请求"+i+": "+tempdata);
    dataArray[i] = tempdata;
}
```  
主要是随机数生成部分还是可以参考的。


### 二、常见笔试题举例  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[牛客网题目](https://www.nowcoder.com/questionTerminal/ac90999ba5d240109b89cd3e2aa9388a)：设磁盘的I/O请求队列中的柱面号为：65,68,49,28,100,170,160,48,194。磁头初始位置为110，磁臂方向由小到大，请给出分别采用最短寻道时间优先的磁盘调度算法和电梯磁盘调度算法的柱面移动次数，并给出操作系统采用何种磁盘调度算法更好，为什么？  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;答：若使用最短寻道时间优先（SSTF）算法，得到柱面移动次数为248次，过程如下图所示：  
  ![使用最短寻道算法](http://osaussnqu.bkt.clouddn.com/image/system/usingSstf.png)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;若采用电梯磁盘调度（SCAN）算法，得到柱面移动次数为250次，过程如下图所示：  
  ![使用电梯扫描算法](http://osaussnqu.bkt.clouddn.com/image/system/usingScan.png)  

 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;操作系统选取电梯磁盘调度算法更好，因为在操作系统中要访问的服务磁盘柱面号是动态产生的，即各个应用程序可能不断地提出访问不同的磁道号的请求。最短寻道时间优先不能保证平均寻道时间最短。而电梯扫描算法既能获得较好的寻道性能，又能防止“饥饿”现象。所以操作系统中更适合采用电梯扫描算法。  

### 三、易错点  
 1. 电梯扫描算法中要注意题目所给的磁臂移动方向。  
 2. 做算法测试时，测试案例应该会有初始磁头在所有访问请求的两端的，这一点需要注意。  


### 四、总结  
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;这篇文章算是为找工作做准备而写的，虽然最初是为了响应学长的号召。后面一边整理一遍写代码，也算找回来了很多东西，基础知识和算法真的很重要啊！
