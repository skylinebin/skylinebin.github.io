---
layout: post
title:  "JavaScript中垃圾回收机制"
date:   2019-01-28 22:32:31
image: 'https://store.skylinebin.com/TensorflowLearning/tensorflow.png'
description: 'Basic knowledge of garbage collecation in JavaScript'
tags:
- RegExp
- Code
- FrontEnd
categories:
- SkylineBin
twitter_text: 'JavaScript中垃圾回收机制 '
---  

### JavaScript 自动垃圾收集机制  

垃圾回收又称为 GC(Garbage Collecation)。编写 JavaScript 程序时，开发者不需要手工跟踪内存的使用情况，只要按照标准写 JavaScript 代码，JavaScript 程序运行所需内存的分配以及无用内存的回收完全是自动管理。JavaScript 中自动垃圾回收机制的原理为：  
> 找出那些不再使用的变量，然后释放其占用的内存。  
> 垃圾收集器会按照固定的时间间隔(或预定的收集时间)周期性地执行此操作。  

#### 局部变量的正常生命周期  

局部变量**只在函数执行的过程中存在**。  
在函数执行过程中，会为局部变量在栈内存(或 堆内存)上分配相应的空间来存储它们的值。在函数中使用这些变量，直至函数执行结束，此时可以释放局部变量的内存供将来需要时使用。  
以上情况下，较容易判断变量是否有存在的必要，更复杂的情况需要更精细的变量追踪策略。  
JavaScript 中的垃圾收集器必须跟踪每个变量是否有用，需要为不再有用的变量打上标记，用于将来回收其占用的内存。标识无用变量的策略通常有两个：**标记清除** 和 **引用计数** 。

#### JavaScript 中的栈内存与堆内存  

上述过程中，JavaScript 中变量分为 **基本类型值** 和 **引用类型值**：  
- 基本类型值 在内存中占固定大小的空间，因此被保存在 **栈内存** 中；  
- 引用类型值 是对象，保存在 **堆内存** 中。包含引用类型值的变量实际包含并非对象本身，而是指向该对象的指针。一个变量从另一个变量复制引用类型的值时，复制的也是指向该对象的指针。  

### 标记清除  

标记清除(mark -and-sweep) 是 JavaScript 中最常用的垃圾回收方式。其执行机制如下：  
- 当变量进入环境时，就将其标记为“进入环境”  
- 当变量离开环境时将其标记为“离开环境”


### 引用计数  




### 参考资料  

- [《JavaScript高级程序设计(第3版)》第4.3节](https://www.amazon.cn/dp/B007OQQVMY/ref=sr_1_1?ie=UTF8&qid=1546997809&sr=8-1&keywords=JavaScript%E9%AB%98%E7%BA%A7%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%28%E7%AC%AC3%E7%89%88%29)  
- [JavaScript V8 引擎垃圾回收算法](https://segmentfault.com/a/1190000015265100)  
- [JS中的垃圾回收与内存泄漏](https://segmentfault.com/a/1190000012738358)  
- [MDN JavaScript 内存管理](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Memory_Management)  

