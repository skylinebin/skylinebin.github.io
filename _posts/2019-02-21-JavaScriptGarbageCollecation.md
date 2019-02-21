---
layout: post
title:  "JavaScript垃圾回收机制"
date:   2019-02-21 22:35:31
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

## JavaScript 自动垃圾收集机制  

垃圾回收又称为 GC(Garbage Collecation)。编写 JavaScript 程序时，开发者不需要手工跟踪内存的使用情况，只要按照标准写 JavaScript 代码，JavaScript 程序运行所需内存的分配以及无用内存的回收完全是自动管理。JavaScript 中自动垃圾回收机制的原理为：  
> 找出那些不再使用的变量，然后释放其占用的内存。  
> 垃圾收集器会按照固定的时间间隔(或预定的收集时间)周期性地执行此操作。  

### 局部变量的正常生命周期  

局部变量**只在函数执行的过程中存在**。  
在函数执行过程中，会为局部变量在栈内存(或 堆内存)上分配相应的空间来存储它们的值。在函数中使用这些变量，直至函数执行结束，此时可以释放局部变量的内存供将来需要时使用。  
以上情况下，较容易判断变量是否有存在的必要，更复杂的情况需要更精细的变量追踪策略。  
JavaScript 中的垃圾收集器必须跟踪每个变量是否有用，需要为不再有用的变量打上标记，用于将来回收其占用的内存。标识无用变量的策略通常有两个：**标记清除** 和 **引用计数** 。

#### JavaScript 中的栈内存与堆内存  
上述过程中，JavaScript 中变量分为 **基本类型值** 和 **引用类型值**：  
- 基本类型值 在内存中占固定大小的空间，因此被保存在 **栈内存** 中；  
- 引用类型值 是对象，保存在 **堆内存** 中。包含引用类型值的变量实际包含并非对象本身，而是指向该对象的指针。一个变量从另一个变量复制引用类型的值时，复制的也是指向该对象的指针。  

### 标记清除  

标记清除(mark-and-sweep) 是 JavaScript 中最常用的垃圾回收方式。其执行机制如下：  
- 当变量进入环境时，就将其标记为“进入环境”  
- 当变量离开环境时将其标记为“离开环境”  

逻辑上，永远不能释放进入环境的变量所占用的内存，因为执行流进入相应的环境时，可能会用到它们。  
标记变量的方式有很多种，可以使用标记位的形式记录变量进入环境，也可单独为“进入环境”和“离开环境”添加变量列表来记录变化。  

标记清除采用的收集策略为：  
- JavaScript中的垃圾收集器运行时会给**存储在内存中的所有变量**都加上标记；  
- 然后去掉环境中的变量以及被环境中的变量引用的变量的标记；  
- 此后，再被加上标记的变量被视为准备删除的变量；  
- 最后，垃圾收集器完成内存清除，销毁那些带标记的值并回收其占用的内存空间。  

2008年之前，IE、Firefox、Opera、Chrome 和 Safari 的 JavaScript实现使用的均为 标记清除式的垃圾回收策略，区别可能在垃圾收集的时间间隔。  

### 引用计数  

引用计数(reference counting) 是另一种垃圾收集策略。引用计数的本质是 **跟踪记录每个值被引用的次数**。其执行机制如下：  
- 当声明一个变量并将一个引用类型值赋值给该变量时，这个值的引用次数为1；  
- 若同一个值(变量)又被赋值给另一个变量，则该值的引用次数加1；  
- 但是如果包含对这个值引用的变量又取得了另外一个值，则这个值的引用次数减1；
- 当这个值的引用次数为0时，则无法再访问这个值，就可回收其占用的内存空间。  

垃圾收集器下次运行时，会释放那些引用次数为零的值所占用的内存。  
引用计数存在一个致命的问题： **循环引用**。循环引用是指，对象 A 中包含一个指向对象 B 的指针，而对象 B 中也包含一个指向对象 A 的引用。下面的代码就是标准的循环引用的例子：  
```javascript
function cycleRefernce() {
    var objectA = new Object();
    var objectB = new Object();
    
    objectA.someOtherObject = objectB;
    objectB.anotherObject = objectA;
}
```
上述例子中 objectA 和 objectB 通过各自属性相互引用。按照引用计数的策略，两个对象的引用次数均为 2。若采用标记清除策略，函数执行完毕，对象离开作用域就不存在相互引用。但采用引用计数后，函数执行完，两个对象的引用次数永不为0，会一直存尊内存中，若多次调用，导致大量内存得不到回收。  

IE8浏览器 之前中有一部分对象并不是原生的 JavaScript 对象，可能是使用 C++ 以 COM 对象的形式实现的(BOM, DOM)。而 COM 对象的垃圾收集机制采用的是 引用计数策略。即使 IE 的 JavaScript 引擎是使用标记清除策略实现的，但 JavaScript 访问 COM 对象仍然是基于 引用计数策略的。在这种情况下，只要在 IE 中涉及 COM 对象，就可能存在循环引用的问题。  

为避免出现循环引用，最好在不使用这些对象时，手动断开 原生 JavaScript 对象 与 DOM 元素之间的连接。IE中的循环引用与手动断开的操作如下所示：  
```javascript
var element = document.getElementById("some_element");
var myObject = new Object();
myObject.element = element;
element.someObject = myObject;
// 以上 存在循环引用
// ...... 
// 以下 手工断开连接
myObject.element = null;
element.someObject =null;
```  

将变量设置成 null 即可切断变量与它之前引用的值之间的连接。下次垃圾收集器运行时，会删除这些值并回收它们占用的内存。  
为解决上述问题，IE9及以上版本把 BOM 和 DOM 对象都转换成了真正的 JavaScript 对象，避免了两种垃圾回收算法并存引起的问题。

#### 垃圾回收的性能问题  
垃圾收集器是周期运行的，确定 **垃圾收集的时间间隔** 是个重要的问题。  

IE7之前的垃圾收集器是根据内存分配量运行的，即 256 个变量、4096 个对象(数组)字面量或 64 KB 的字符串。达到这些临界值的任何一个，垃圾收集器就会运行。所以就导致如果一个脚本含有很多变量，在整个生命周期中一直保有前面临界值大小的变量，就会频繁触发垃圾回收，会存在严重的性能问题。  

IE7 重写了垃圾收集例程。新的工作方式为：触发垃圾收集的变量分配、字面量和数组元素的临界值被调整为 **动态修正**。初始值与之前版本相同，但如果垃圾收集例程回收的内存低于 15%，则临界值加倍。若回收内存分配量超过 85%，则临界值重置回默认值。


## JavaScript V8 引擎的垃圾回收机制 

在JavaScript脚本中，绝大多数对象的生存期很短，只有部分对象的生存期较长。所以，V8 中的垃圾回收主要使用的是 **分代回收** (Generational collection)机制。  

### 分代回收机制  

V8 引擎将保存对象的 **堆** (heap) 进行了分代:  
- 对象最初会被分在 **新生区**(New Space) (1~8M)，新生区的内存分配只需要保有一个指向内存区的指针，不断根据内存大小进行递增，当指针达到新生区的末尾，会有一次垃圾回收清理(小周期)，清理掉新生区中不再活跃的死对象。  
- 对于超过 2 个小周期的对象，则需要将其移动至 **老生区**(Old Space)。老生区在 标记-清除 或 标记-紧缩 的过程(大周期) 中进行回收。  

大周期进行的并不频繁。一次大周期通常是在移动足够多的对象至老生区后才会发生。  

### Scavenge 算法  

由于垃圾清理发生的比较频繁，清理的过程必须很快。V8 中的清理过程使用的是 Scavenge 算法，按照 经典的 [Cheney 算法](https://www.wikiwand.com/en/Cheney%27s_algorithm) 实现的。Scavenge 算法的主要过程是：  
- 新生区被分为两个等大小的子区(semi-spaces)：to-space 和 from-space；  
- 大多数的内存分配都是在 to-space 发生 (某些特定对象是在老生区)；  
- 当 to-space 耗尽时，交换 to-space 和 from-space, 此时所有的对象都在 from-space；  
- 然后将 from-space 中活跃的对象复制到 to-space 或者老生区中;  
- 这些对象被直接压到 to-space，提升了 Cache 的内存局部性，可使内存分配简洁快速。  

算法的伪代码描述如下：  
```python
def scavenge():
  swap(fromSpace, toSpace)
  allocationPtr = toSpace.bottom
  scanPtr = toSpace.bottom

  for i = 0..len(roots):
    root = roots[i]
    if inFromSpace(root):
      rootCopy = copyObject(&allocationPtr, root)
      setForwardingAddress(root, rootCopy)
      roots[i] = rootCopy

  while scanPtr < allocationPtr:
    obj = object at scanPtr
    scanPtr += size(obj)
    n = sizeInWords(obj)
    for i = 0..n:
      if isPointer(obj[i]) and not inOldSpace(obj[i]):
        fromNeighbor = obj[i]
        if hasForwardingAddress(fromNeighbor):
          toNeighbor = getForwardingAddress(fromNeighbor)
        else:
          toNeighbor = copyObject(&allocationPtr, fromNeighbor)
          setForwardingAddress(fromNeighbor, toNeighbor)
        obj[i] = toNeighbor

def copyObject(*allocationPtr, object):
  copy = *allocationPtr
  *allocationPtr += size(object)
  memcpy(copy, object, size(object))
  return copy
```  

#### 不能被忽视的写屏障 Write barriers  
如果新生区有某个对象，只有一个指向它的指针，恰好该指针在老生区的对象中，在垃圾回收之前我们如何得知新生区的该对象是活跃的呢？  
为解决此问题，V8 在写缓冲区有一个列表，其中记录了所有老生区对象指向新生区的情况。新生区对象诞生时不会有指向它的指针，当老生区的对象出现指向新生区对象的指针时，便记录跨区指向，记录行为总是发生在写操作中。  

### 标记-清除算法 与 标记-紧缩算法  

因为新生区的内存一般都不大，所以使用 Scavenge 算法进行垃圾回收效果比较好。老生区一般占用内存较大，因此采用的是 标记-清除(Mark-Sweep)算法 与 标记-紧缩(Mark-Compact)算法。  

两种算法都包括两个阶段：标记阶段，清除或紧缩阶段。  


#### 标记阶段  
在标记阶段，堆上所有的活跃对象都会被发现并且标记。  
- 每一页都包含用来标记的位图  
- 位图都要占据空间 (3.1% on 32-bit, 1.6% on 64-bit systems)  
- 使用两位二进制标记对象的状态  
- 状态为白(white), 它尚未被垃圾回收器发现  
- 状态为灰(gray), 它已被垃圾回收器发现，但它的邻接对象仍未全部处理完毕  
- 状态为黑(black), 它不仅被垃圾回收器发现，而且其所有邻接对象也都处理完毕  

标记算法的核心是 **深度优先搜索**，[具体过程](http://newhtml.net/v8-garbage-collection/)为：  
> - 在标记的初期，位图是空的，所有对象也都是白的。  
> - 从根可达的对象会被染色为灰色，并被放入标记用的一个单独分配的双端队列。
> - 标记阶段的每次循环，GC会将一个对象从双端队列中取出，染色为黑，然后将它的邻接对象染色为灰，并把邻接对象放入双端队列。
> - 这一过程在双端队列为空且所有对象都变黑时结束。
> - 特别大的对象，如长数组，可能会在处理时分片，以防溢出双端队列。如果双端队列溢出了，则对象仍然会被染为灰色，但不会再被放入队列（这样他们的邻接对象就没有机会再染色了）。
> - 因此当双端队列为空时，GC仍然需要扫描一次，确保所有的灰对象都成为了黑对象。对于未被染黑的灰对象，GC会将其再次放入队列，再度处理。  

标记算法结束后，所有的活跃对象都被染成黑色，所有的死对象仍是白的。下一步就可以清除或者紧缩了。  

#### 清除 或 紧缩 算法  
标记算法执行后，可以选择清除 或是紧缩，这两个算法都可以收回内存，而且两者都作用于页级(V8 中的内存页是 1MB 的连续内存块)  

清除算法扫描连续存放的死对象，将其变为空闲空间，并将其添加到空闲内存链表中。清除算法只需要遍历页的位图，搜索连续的白对象。[每一页都包含数个空闲内存链表，其分别代表小内存区（<256字）、中内存区（<2048字）、大内存区（<16384字）和超大内存区（其它更大的内存）]  

紧缩算法会尝试将对象从碎片页(包含大量小空闲内存的页)中迁移整合在一起，来释放内存。这些对象会被迁移到另外的页上，因此也可能会新分配一些页。而迁出后的碎片页就返还给操作系统。  
> 对目标碎片页中的每个活跃对象，在空闲内存链表中分配一块其它页的区域，将该对象复制至新页，并在碎片页中的该对象上写上转发地址。  
> 迁出过程中，对象中的旧地址会被记录下来，这样在迁出结束后V8会遍历它所记录的地址，将其更新为新的地址。由于标记过程中也记录了不同页之间的指针，此时也会更新这些指针的指向。  


### 增量标记 与 惰性清除  

对于一个堆很大，活跃对象有很多的脚本时，标记-清除 与 标记-紧缩 的效率可能会很慢，为减少垃圾回收引起的停顿，引入了 增量标记(Incremental marking) 和 惰性清理(lazy sweeping)。  

增量标记允许堆的标记(前面的标记阶段)发生在几次5-10毫秒的小停顿中。增量标记在堆的大小达到一定的阈值时启用，启用之后每当一定量的内存分配后，脚本的执行就会停顿并进行一次增量标记。就像普通的标记一样，增量标记也是一个深度优先搜索，并同样采用白灰黑机制来分类对象。  
增量标记与普通标记的区别是，添加了从黑对象到白对象的指针，为此需要再次启用写屏障中，在记录 老->新 的同时，记录 黑->白。在进行清除时，一旦在写屏障中发现这样的指针，黑对象会被重新染色为灰对象，重新放回到双端队列中。  

惰性清理是指在标记完成后，并不急着释放空间，无需一次清理所有的页，垃圾回收器会视情况逐一清理，直到所有页都清理完成。  

余下的涉及垃圾回收原理的部分留着后面继续整理。(平行标记 与 并发标记)


### 参考资料  

- [《JavaScript高级程序设计(第3版)》第4.3节](https://www.amazon.cn/dp/B007OQQVMY/ref=sr_1_1?ie=UTF8&qid=1546997809&sr=8-1&keywords=JavaScript%E9%AB%98%E7%BA%A7%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%28%E7%AC%AC3%E7%89%88%29)  
- [JavaScript V8 引擎垃圾回收算法](https://segmentfault.com/a/1190000015265100)  
- [JS中的垃圾回收与内存泄漏](https://segmentfault.com/a/1190000012738358)  
- [MDN JavaScript 内存管理](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Memory_Management)  
- [javascript 垃圾回收算法了解一下](https://bailinlin.github.io/)  
- [Garbage collection in V8, an illustrated guide](https://medium.com/@_lrlna/garbage-collection-in-v8-an-illustrated-guide-d24a952ee3b8), [译文](https://zhuanlan.zhihu.com/p/29276031)  
- [V8 之旅： 垃圾回收器](http://newhtml.net/v8-garbage-collection/), [原文](http://www.jayconrod.com/posts/55/a-tour-of-v8-garbage-collection)  
- [v8-pref-gc](https://github.com/thlorenz/v8-perf/blob/master/gc.md)

