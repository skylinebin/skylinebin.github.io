---
layout: post
title:  "Markdown使用指南"
date:   2017-12-31 03:31:31
image: '../assets/img/singledog.png'
description: 'Basic skills'
tags:
- Markdown
- Project
- Work
categories:
- SkylineBin
twitter_text: 'Markdown使用指南 '
---


# MarkDown文档编写规范

> by SkylineBin

### 1.选用Markdown原因及应用背景
- Markdown是一种电子邮件风格的标记语言，**语法简单**，语法兼容HTML，能够形成很好布局排版页面，排版好后有极好的可读性。
- Markdown文件能被所有文本编辑器打开，兼容性很强，也可轻松转换成其他格式的电子书。
- 本项目所在的gitee(码云)，能够自动解析*.md*的文件，可以网页阅读排版好的文档，方便后期查阅整理。

### 2.推荐使用的Markdown写作软件
Markdown文件可以用任何编辑器编写，但一般的编辑器不能解析文件。本项目主要是优秀方法整理和技术总结应该也用不到特别复杂的语法，但是排版对文档逻辑的展现有辅助作用，所以还是推荐使用可以预览的Markdown编辑器。下面推荐两款比较好用的软件：
- [Atom](https://atom.io/) 是著名的程序员社交网站**Github**推出的一款编辑器，操作简单，功能强大，当前文档就是在这款软件上编写的。重点是**支持Markdown文件的预览**。编写界面如下图所示：
![Atom工程界面](http://osaussnqu.bkt.clouddn.com/image/markdown/Atompage.png)

- [VSCode](https://code.visualstudio.com/) 是微软大佬推出的一款免费开源跨平台的代码编辑器，功能真的强大，这段话是在VSCode里编写的。同样**支持Markdown文件的预览**，编写界面如下图所示：
![VSCode工程界面](http://osaussnqu.bkt.clouddn.com/image/markdown/VSCodepage.png)

以上两款软件都支持文件目录，可以很方便创建整理文件。  
*注：个人更喜欢Atom，看起来更简洁，操作也更简单。但VSCode会更稳定。*

### 3.Markdown基本语法及举例
前面有提到，Markdown的语法很简单，用起来也会很顺手。先推荐几篇快速上手的文章，这些文章会更完整，大概十分钟左右可以上手编辑文档。之后会针对常用的Markdown语法给出参考。
- 1.简书默认支持Markdown语法，[献给写作者的 Markdown 新手指南](http://www.jianshu.com/p/q81RER) 这篇文章是针对写作者写的，具有普适性。  
- 2.[Markdown 语法说明](http://wowubuntu.com/markdown/#list) 给出的语法比较全，可以作为参考。  

### Markdown常用语法
#### 3.1 Markdown标题
Markdown文档中使用每行开头的 *#* 号来判定是否为标题，一共六级，对应 *#* 号的个数:
```
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
```
需要注意的是，*#* 号与 后面标题名称之间应该有空格。  
#### 3.2 Markdown换行与段落  
Markdown里可以使用回车换行，但 **前提** 是上一行的末尾要多余两个空格。这样Markdown才可解析出正确的指令。  
Markdown中支持HTML里的< br / \> 换行符，但一般不使用这个。  
#### 3.3 Markdown图片插入与链接引用  
Markdown中使用[ ]和( )构成的符号来引入连接或者插入图片。  
**插入链接** 只需要使用 \[ 显示文本 ]( 链接地址 ) 这样的语法  
```
[Github](https://github.com)
```
即：[Github](https://github.com)  
**插入图片** 只需要使用 \!\[图片标签](图片链接地址) 这样的语法
```
![This is a Github Logo](https://assets-cdn.github.com/images/modules/logos_page/GitHub-Logo.png)
```
即可插入下图：
![This is a Github Logo.](https://assets-cdn.github.com/images/modules/logos_page/GitHub-Logo.png)

本项目中**插入图片规范**如下:
- 1.在当前目录下建立"assets"资源目录文件夹，为需要使用图片的文档建立文件夹，使用相对路径引用方式链接到图片资源文件，例如，上图中的Github图片保存在“./assets/MDimages/Github-Logo.png”,则引入图片的语法为：
```
![This is a Github Logo](./assets/MDimages/Github-Logo.png)
```
- 2.使用云存储对象来存储图片，生成外链作为链接引入进文档。

#### 3.4 Markdown粗体和斜体
对于需要强调的部分，常使用 **粗体** 和 *斜体* 来以示区别。粗体部分使用两个 \* 号包围来引入，斜体部分使用一个 \* 号包围来引入。
```
这是 **粗体** ，这是 *斜体*.
```  
#### 3.5 Markdown中代码引用
**代码引用** 可能是之后本项目使用较多的一部分。Markdown中使用键盘上英文输入法下，数字1左边的小点 \` 来作为代码引入的开始。使用三个 \`来开始引用代码，三个 \` 结束代码引用。前三个 \`的后面可以标注代码的语言，也可以不用标注。
```java
//标注了代码类型的好处是可以给出关键字高亮
//以下是java实现快速排序的递归形式算法
public static void quickSort(int[] arr){
    qsort(arr, 0, arr.length-1);
}
private static void qsort(int[] arr, int low, int high){
    if (low < high){
        int pivot=partition(arr, low, high);        //将数组分为两部分
        qsort(arr, low, pivot-1);                   //递归排序左子数组
        qsort(arr, pivot+1, high);                  //递归排序右子数组
    }
}
private static int partition(int[] arr, int low, int high){
    int pivot = arr[low];     //枢轴记录
    while (low<high){
        while (low<high && arr[high]>=pivot) --high;
        arr[low]=arr[high];             //交换比枢轴小的记录到左端
        while (low<high && arr[low]<=pivot) ++low;
        arr[high] = arr[low];           //交换比枢轴小的记录到右端
    }
    //扫描完成，枢轴到位
    arr[low] = pivot;
    //返回的是枢轴的位置
    return low;
}
```
代码引入具体实现如下图所示：
![Markdown中代码引入](http://osaussnqu.bkt.clouddn.com/image/markdown/importCodes.png)

#### 3.6 Markdown中分隔线及转义符号
Markdown中使用三个 \* 号来画出一条分隔线，效果如下所示：
***
Markdown中的符号转义使用 反斜杠 \\ 来帮助插入普通的符号。

以上为本项目文档的Markdown编辑规范，原文档是为实验室工作基础知识整理的文档规范，但是实验室同学们觉得这个太麻烦了，我就放在这里了，毕竟也是自己花费了一些心思整理的！
