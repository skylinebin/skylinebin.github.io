---
layout: post
title:  "迭代器函数与函数式编程"
date:   2018-08-20 19:40:31
image: 'https://store.skylinebin.com/TensorflowLearning/tensorflow.png'
description: 'Basic knowledge of deep reinforcement learning'
tags:
- JavaScript
- FrontEnd
- CODE
categories:
- SkylineBin
twitter_text: 'JavaScript迭代器函数 '
---  

## JavaScript 迭代器函数 与 函数式编程  

### JavaScript 迭代器函数  
当我们需要迭代数组中的元素时，一般可以用循环语句来处理，比如 for 循环语句。除此之外，JavaScript 内置了许多数组可用的迭代方法。  
本文使用测试例子包括了数组和函数。假定数组是1~15的整数数组，函数是判定数组元素是否可被2整除，若整除函数返回为 true，否则返回 false。  
```javascript
var isEven = function (x) {
    console.log(x);
    return (x % 2 == 0) ? true : false;
}

var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
```  


#### 通用JavaScript  
在原生 JS 中，可以使用函数如下：  

1. **使用 every() 方法迭代**  
every() 方法会迭代数组中每个元素，**直到返回 false**。  
```javascript
var everyArray = numbers.every(isEven);
console.log(everyArray);
// false
```

因为数组 numbers 的第一个元素是 1，不是 2 的倍数，所以第一个就返回 false，every执行结束。  

2. **使用 some() 方法迭代**  
some() 方法会迭代数组中每个元素，**直到返回 true**。  
```javascript
var someArray = numbers.some(isEven);
console.log(someArray);
// true
```
数组 numbers 的第二个元素是 2，是 2 的倍数，所以第一个就返回 false，第二个返回 true，some 执行结束。  


3. **使用 forEach() 方法迭代**  
若要迭代整个数组，可以使用 forEach 方法。它和使用 for 循环的结果相同。  
```javascript
numbers.forEach(function(x){
    console.log((x % 2 == 0));
})
// false true false true false true false true false true false true false true false
```
forEach() 方法可以全部迭代完整个数组。  

4. **使用 map() 方法**  
map() 方法是 对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组。  
```javascript
var mapArray = numbers.map(isEven);
console.log(mapArray);
// [ false, true, false, true, false, true, false, true, false, true, false, true, false, true, false]
```
数组 mapArray 保存了传入 map 方法的 isEven 函数的运行结果。直接使用 mapArray[i]知道 i+1 是否是偶数。  

5. **使用 filter() 方法**  
filter() 方法返回的新数组由使函数返回 true 的元素组成。  
```javascript
var filterArray = numbers.filter(isEven);
console.log(filterArray);
// [ 2, 4, 6, 8, 10, 12, 14 ]
```
数组 filterArray 中的元素都是偶数。  

6. **使用 reduce() 方法**  
reduce() 方法接收一个函数作为参数，函数有四个参数：previousValue，currentValue，index 和 array。该函数会返回一个将被叠加到累加器的值，reduce() 方法停止执行后会返回这个累加器。  
如对一个数组中所有元素求和，可以使用以下代码：  
```javascript
var reduceSumArray = numbers.reduce(function(previous, current, index) {
    return previous + current;
})
console.log(reduceSumArray);
// 120
```
上述变量 reduceSumArray 返回结果为 120，即实现数组求和。  


#### ECMAScript6  
EMCAScript 6 和 ECMAScript 7 规范给 JavaScript 语言带来的新特性，这些新特性也可被用于的迭代中。  
1. **使用 forEach 和箭头函数**  
箭头函数可以简化使用 forEach 迭代数组元素的做法。实现如下：  
```javascript
numbers.forEach(x => {
    console.log((x % 2 == 0));
})
// false true false true false true false true false true false true false true false
```  

2. **使用 for...of 迭代循环**  
ES6 中引入了迭代数组值的 for...of 循环。这个比较常用：  
```javascript
for (let n of numbers ) {
    console.log((n % 2 == 0) ? 'even' : 'odd');
}
// odd even odd even odd even odd even odd even odd even odd even odd
```  

3. **使用 ES6 新的迭代器 (@@iterator)**  
ES6 为 Array 类增加了一个 @@iterator 属性，需要使用 Symbol.iterator 来访问。即：  
```javascript
let iterator = numbers[Symbol.iterator]();
console.log(iterator.next().value);
console.log(iterator.next().value);
console.log(iterator.next().value);
console.log(iterator.next().value);
// 1 2 3 4
```  
不断调用 迭代器 iterator 的 next() 方法，就能依次得到数组中的值。调用 15 次 iterator.next().value 即可将数组中的所有值迭代完，之后 iterator.next().value 会返回 undefined。  

此外，还有ES6 还有三种 从数组中得到迭代器的方法：**entries()**，**keys()**，**values()** 。  
entries() 方法返回包含键值对的 @@iterator，即：  
```javascript
let arrayEntries = numbers.entries();
console.log(arrayEntries.next().value); // [ 0, 1 ]
console.log(arrayEntries.next().value); // [ 1, 2 ]
console.log(arrayEntries.next().value); // [ 2, 3 ]
console.log(arrayEntries.next().value); // [ 3, 4 ]
```  
numbers 数组中均为数字，key 是数组中的位置， value 是保存在数组索引中的值。  

keys() 方法返回包含数组索引的 @@iterator，即：  
```javascript
let arrayKeys = numbers.keys();
console.log(arrayKeys.next()); // { value: 0, done: false }
console.log(arrayKeys.next()); // { value: 1, done: false }
console.log(arrayKeys.next()); // { value: 2, done: false }
console.log(arrayKeys.next()); // { value: 3, done: false }
```  
keys() 方法会返回 numbers 数组的索引， 有可迭代的值 done 属性值为 false ，无可迭代的值：arrayKeys.next() 会返回一个 value属性为 undefined，done 属性为 true 的对象。  

values() 方法返回包含数组值的 @@iterator，即：  
```javascript
let arrayValues = numbers.values();
console.log(arrayValues.next());
console.log(arrayValues.next());
console.log(arrayValues.next());
console.log(arrayValues.next());
// node.js 运行失败了，尴尬
``` 
ES6 和 ES7 新特性未完待续...  



### JavaScript 函数式编程  
我们一般写的代码按照功能实现流程写出的代码的编程范式一般都是 **命令式编程**。在命令式编程中，我们只需要详细描述要完成的事情及完成的顺序。  
另一种编程范式，叫做 **函数式编程**。通过 ES6 的能力，JavaScript 能够进行函数式编程。  

#### 函数式编程与命令式编程  

若打印一个数组中的所有的元素。
命令式编程的声明函数为：  
```javascript
var printArray = function(array) {
    for (let i = 0; i < array.length; i++) {
        console.log(array[i]);
    }
}

printArray([1, 2, 3, 4, 5, 6]);
```

函数式编程的声明步骤为，先关注的是迭代的数据，然后进行操作，即打印数组项。所以函数式编程中将负责迭代数组的方法和负责向控制台打印元素的方法 分隔开。即：  
```javascript
// create a function to traversal the array
var forEach = function(array, action) {
    for (let j = 0; j < array.length; j++) {
        action(array[j]);
    }
}

// create a function to log the element of array
var logItem = function (item) {
    console.log(item);
}

// use functions to print datas
forEach([1, 2, 3, 4, 5, 6], logItem);
```  

所以 函数式编程 和 命令式编程的区别还是很明显的。  
另外函数式编程需要注意以下几点：  
- 主要目标是描述数据，以及要对数据应用的转换；  
- 程序执行顺序的重要性很低，而命令式编程中，步骤和顺序就非常重要；  
- **函数** 和 **数据集合** 是函数式编程的核心；  
- 在函数式编程中，可使用和频繁使用函数和递归，而在命令式编程中，则使用循环、赋值、条件和函数。  

ES6 的新特性以及 map()，filter() 和 reduce() 在函数式编程中的应用未完待续...  

以上代码在一个Github项目中有记录，后面完成时会标示出来。  
认真学习基础，错过了真的就错过了，总是不会在合适的时间遇到合适的人，所以还是把握好机会，...，搞学习。


### 参考文献  

 [Learning JavaScript Data Structures and Algorithms (Second Edition)   ](https://www.amazon.cn/dp/B075KZGM8Z/ref=sr_1_1?s=books&ie=UTF8&qid=1534774090&sr=1-1&keywords=%E5%AD%A6%E4%B9%A0+JavaScript+%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E4%B8%8E%E7%AE%97%E6%B3%95)





