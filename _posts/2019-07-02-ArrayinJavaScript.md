---
layout: post
title:  "JavaScript 中的数组操作"
date:   2019-07-02 22:04:21
image: 'https://store.skylinebin.com/JavaScript.png'
description: 'Array in JavaScript'
tags:
- JavaScript
- Code
- FrontEnd
categories:
- SkylineBin
twitter_text: 'Array in JavaScript'
---  

本文主要包含两部分，其中前半部分用于整理 JavaScript 中的数组方法。后半部分整理常使用的数组操作。

## JavaScript 中的数组方法

### ES5中处理数组常用方法  

处理数组时常使用的方法如下：

```javascript
let colors = ["red", "blue", "green"];
```

#### 转换方法  
- **colors.toString()**  
输出拼接的字符串 "red,blue,green"，原数组不变
- **colors.valueOf()** 
返回数组本身 ["red", "blue", "green"]  ，原数组不变
- **colors.join()**  
返回拼接符号的字符串，原数组不变

#### 栈方法  
- **colors.push()**  
push 进一项参数，原数组多一项
- **colors.pop()**  
弹出返回最后一项，原有数组少一项  

栈方法把数组当作一个栈  

#### 队列方法  
- **colors.shift()**  
第一项返回出列，原有数组少一项
- **colors.push()**  
push 进数组一项参数
- **colors.unshift()**  
在数组前端添加一项或若干项数据，返回数组长度，数组发生变化  


#### 重排序方法  
- **colors.reverse()**  
对数组进行逆序操作，返回的是整个数组
- **colors.sort()** 
对数组进行排序操作，可传入比较的函数，返回的是数组本身(已排序)  


#### 操作方法  
- **colors.concat('black')**
返回数组副本，并添加字符串或数组，不影响原数组
- **colors.slice()**  
返回数组指定位置或者范围，不影响原数组  
- **colors.splice()**  
**删除**数组指定起始位置的若干项数据  `colors.splice(0,2)`，向数组的某一部分**插入**项 `colors.splice(2,0,'yellow','orange')`，**替换**指定位置的项 `colors.splice(2,1,'black','orange')` ，此方法对原数组有影响，返回的参数视情况而定  

#### 位置方法  
- **colors.indexOf('red')**  
从数组开头查找元素，若找到返回位置，未找到返回 -1
- **colors.lastIndexOf('red')**  
从数组尾部查找元素，若找到返回位置，未找到返回 -1

#### 迭代方法  
- **colors.every()**  
对数组每一项运行指定函数，若所有项都返回true，则返回true
- **colors.filter()**  
对数组每一项运行指定函数，返回由所有结果为true组成的数组
- **colors.forEach()**  
对数组每一项运行指定函数，无返回值直接操作
- **colors.map()**  
对数组每一项运行指定函数，返回每次调用的结果组成的数组
- **colors.some()**  
对数组每一项运行指定函数，若任一项结果为true，则返回true  
这些迭代方法对原数组均无影响

#### 归并方法  
- **colors.reduce()**  
从第一项开始逐个遍历到最后。遍历调用函数，该函数返回的任何值都会作为第一个参数自动传给下一项
- **colors.reduceRight()**  
从最后一项开始逐个遍历到开头。  



### jQuery中处理数组时常用的方法  

#### 迭代方法  

- **jQuery.each**( object, callback )  
完成数组的迭代过程，其中 object 可以是数组也可以是其他类型的对象  
- **jQuery.grep**( array, callback, [invert] )
使用过滤函数过滤数组元素  
- **jQuery.map**( array, callback)  
讲一个数组转换成另一个数组  


#### 合并方法  

- **jQuery.extend**( [deep], target, object1, [objectN] )  
用一个或多个其他对象来扩展一个对象，返回被扩展的对象
- **jQuery.merge**( first, second )  
将两个数组合并，返回的结果为修改第一个数组的内容  
- **jQuery.unique**( array )  
删除数组中重复元素。只处理删除DOM元素数组，处理字符串或者数字数组之前需要排序。  


### ES6 中的数组操作方法  

#### 数组的扩展运算符  
ES6 中的扩展运算符为三个点(...)，作用是将一个数组转为用逗号分隔的参数序列  
- 可以将数组变为参数序列  
- 可以使用扩展运算符替代数组的 apply 方法  
- 可以用来合并数组  
- 可以与解构赋值合用  
- 可以将字符串变为真正的数组  

... 扩展运算符内部使用的是数据结构的 Iterator 接口，只要有 Iterator 接口的对象都可以使用扩展运算符  

#### Array 增加的方法  
- **Array.from() 方法**
Array.from() 方法将两类对象转为真正的数组：类似数组的对象和可遍历的对象  
- **Array.of() 方法**  
Array.of() 方法用于将一组值转换为数组  


#### 数组实例的方法
- Array.prototype.copyWithin(target,start=0,end=this.length)  
用于将当前数组内部指定位置的成员赋值到其他位置
- **arr.find()**  
用于找出第一个符合条件的数组成员，参数为一个回调函数  
- **arr.findIndex()**  
用于返回第一个符合条件的数组成员的位置
- **arr.fill()**  
使用给定值填充一个数组，可指定填充起始位置  
- **Array.prototype.includes()**  
该方法返回一个布尔值，表示某个数组是否包含给定的值  

#### 数组实例的遍历方法  
- **array.keys()**  
用于对键名的遍历
- **array.values()**  
用于对键值的遍历
- **array.entries()** 
用于对键值对的遍历  

以上三种遍历方法需要与 for循环合用  

#### ES6中的数组空位  
数组空位表示数组某个位置没有任何值  


### Vue 中的数组处理方法   

Vue 中的数组处理方法如下：

- push()
- pop()
- shift()
- unshift()
- splice()
- sort()
- reverse()
- filter()
- concat()
- slice()


## JavaScript 中常用数组操作  

### 去除数组中的第 i 个值  
```javascript
var table = [1,2,3,4,5,6,7,8];
var i = 5;
var tempTable = [];
for (let k = 0; k < table.length; k++) {
    if (k !== i) {
        tempTable.push(table[k]);
    }
}

// 精简方法
var tableX = Array.prototype.concat.apply(table.slice(0,i),table.slice(i+1,table.length-1));

```


### 数组的截取操作 
JavaScript 中 使用 slice 方法完成数组的截取  
一般 slice 参数有两个  

```javascript
arrayObject.slice(start,end)
```  

上述代码表示截取 arrayObject 对象 的 start 到 end-1 个元素 作为一个数组返回
```javascript
var treearr = [1,2,3,4,5,6,7];
treearr.slice(1,3);
// [2,3]
```

如果只传入一个参数
```javascript
let treearr = [1,2,3,4,5,6,7];
let tempNode = treearr[0];
treearr = treearr.slice(1); // 以上两步实现的是队列的 pop 操作
// [2,3,4,5,6,7]
```

### 数组模拟队列抛出第一个值
```javascript
let treearr = [1,2,3,4,5,6,7];
treearr.shift();
// 1
// treearr = [2,3,4,5,6,7];

```

### 数组插入第一个值
```javascript
let treearr = [1,2,3,4,5,6,7];
treearr.unshift(0);
//
console.log(treearr);
// treearr = [0,1,2,3,4,5,6,7];

```

### 数组的深拷贝与浅拷贝  
因为 JavaScript 中，数组是引用类型
如果 直接将数组赋值给另一个变量，实际实现的是浅拷贝，该变量改变，原数组也会跟着改变
例如，如下所示：  
```javascript
var cardArr = [1, 1, 1, 1, 2, 2, 3, 3, 5, 6, 7, 8, 9];
var tempArr = cardArr;
tempArr.push(1);
console.log(tempArr); // [1, 1, 1, 1, 2, 2, 3, 3, 5, 6, 7, 8, 9, 1]
console.log(cardArr); // [1, 1, 1, 1, 2, 2, 3, 3, 5, 6, 7, 8, 9, 1]
```
因为直接赋值给变量是浅拷贝，tempArr 改变，cardArr 也会改变。 

如果想要实现深拷贝，有两种选择。  

选择一：自定义函数遍历原数组，实现 Copy 数组  
```javascript
function copyArr (arr) {
    var result = [];
    for (let i = 0; i < arr.length; i++) {
        result.push(arr[i]);
    }
    return result;
}

var cardArr = [1, 1, 1, 1, 2, 2, 3, 3, 5, 6, 7, 8, 9];
var tempArr = copyArr(cardArr);
```

选择二：使用 slice 方法，实现数组的深拷贝
```javascript
var cardArr = [1, 1, 1, 1, 2, 2, 3, 3, 5, 6, 7, 8, 9];
var tempArr = cardArr.slice(0);
```



### JavaScript 实现数组乱序  

时间复杂度为 O(n^2) 版本 和 时间复杂度 O(n)的代码  如下：  
```javascript
// 时间复杂度 O(n^2)
function randomSortArray (arr){
  let backArr = [];
  while(arr.length){
    let index = parseInt(Math.random()*(arr.length - 1));
    backArr.push(arr[index]);
    arr.splice(index, 1);
  }
  return backArr;
}

// 时间复杂度 O(n)
function randomSortArray2(arr){
  let lenNum = arr.length - 1;
  let tempData;
  for (let i = 0; i < lenNum; i++) {
    let index = parseInt(Math.random() * (lenNum + 1 - i));
    tempData = a[index];
    a[index] = a[lenNum - i]
    a[lenNum - i] = tempData;
  }
  return arr;
}
```

### JavaScript 数组求和  
最近遇到了一个之前被忽视面试题目，题目是写一个求和函数，调用方式是可以 sum(x,y) 和 sum(x)(y)混合使用，要考虑其扩展性。  
因为 要区分 sum() 和 sum()()，所以调用 sum 返回的应该是个函数，这就考虑到函数柯里化，因此可给出的解决方案为：  

```javascript
function sum(){
    let _arr = [];
    _arr = Array.prototype.slice.call(arguments);
    let add = function(){
        _arr.push(...arguments);
        return add;
    }
    add.toString = function(){
        return _arr.reduce(function(a,b){
            return a+b;
        })
    }
    return add;
}
```
普通的数组求和，可以使用 reduce 实现
```javascript
let cardArr = [1, 1, 1, 1, 2, 2, 3, 3, 5, 6, 7, 8, 9];
cardArr.reduce((a,b)=>a+b);
```



### 参考资料  
- [jQuery中的数组操作](https://www.cnblogs.com/weiqt/articles/2009004.html)  
- [JavaScript高级程序设计(第3版)](https://www.amazon.cn/dp/B007OQQVMY/ref=sr_1_1?ie=UTF8&qid=1546997809&sr=8-1&keywords=JavaScript%E9%AB%98%E7%BA%A7%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1(%E7%AC%AC3%E7%89%88))
- [ES6标准入门](http://es6.ruanyifeng.com/#docs/array)  
- [数组方法分析](https://segmentfault.com/a/1190000015841359)  
- [函数柯里化数组求和](https://www.jianshu.com/p/2975c25e4d71?tdsourcetag=s_pctim_aiomsg)





