---
layout: post
title:  "JavaScript 中的this、call 和 apply "
date:   2019-06-23 21:42:31
image: 'https://store.skylinebin.com/JavaScript.png'
description: 'this, call and apply in JavaScript'
tags:
- JavaScript
- Code
- FrontEnd
categories:
- SkylineBin
twitter_text: 'this, call and apply in JavaScript'
---  

## JavaScript 中的 this,apply,call   
本文主要是对 JavaScript 中常用的 this，apply 和 call 的使用方法和区别进行整理和解析，主要参考了[曾探的《JavaScript 设计模式》](http://www.ituring.com.cn/book/1632)中的讲解过程并添加了一些实际使用的细节，以方便使用有遗漏时查阅。

### JavaScript 中的 this 解析  

JavaScript 中的 this 总是**指向一个对象**，具体指向哪个对象是**在运行时基于函数的执行环境动态绑定的**。  

#### this 的指向  
在实际应用中，this 的指向大致可以分为以下四种：  

- **作为对象的方法调用**  
作对象方法调用，this指向该对象本身  

- **作为普通函数调用**  
当函数不作为对象的属性被调用时，就是普通函数方式。此时的 this 总是指向全局对象。浏览器中的全局对象是 window 对象。Node.js 中的 this 是一个空的对象字面量 '{}'  

- **构造器调用**  
通常情况，构造器里的this就指向返回的这个对象，如果返回的是个对象字面量，则this指向这个对象，原有通过this声明的属性不再存在  

- **Function.prototype.call 或者 Function.prototype.apply 调用**  
Function.prototype.call 或 Function.prototype.apply 可以动态改变传入函数的 this  

以上四种基本囊括了 JavaScript 中所有 this 的用法。

#### this 语义的丢失  

以下代码经常出现：  
```javascript
let obj = {
    MyName:'seven',
    getName: function(){
        return this.MyName;
    }
};

console.log(obj.getName()); // 输出：'seven'
let getName2 = obj.getName;
console.log(getName2); // 输出: undefined
```
当调用 obj.getName() 时，getName 方法是作为 obj 对象的属性被调用的，此时的this指向 obj 对象，所以obj.getName()输出'seven'
当使用变量 getName2 来引用 obj.getName 时，并调用 getName2 时，此时普通函数调用方式。this 是指向全局 window 的，所以程序的执行结果是 undefined。  

平时使用时，可以结合apply 来修正 this。  

```javascript
document.getElementById = (function(func){
    return function(){
        return func.apply(document, arguments);
    }
})(document.getElementById);

let getId = document.getElementById;
let div = getId('app');
console.log(div.id);
```  
<br />

### JavaScript 中的 call 和 apply  

call 和 apply 方法可以很好地体现JavaScript 的函数式语言特性，在诸多设计模式中，也会用到call 和 apply。  

#### call 和 apply的区别  

**apply** 接受两个参数，第一个参数**指定了函数体内 this 对象的指向**，第二个参数一般为集合，apply 将这个集合的元素作为参数传递给被调用的函数。  

**call** 传入的参数数量不固定，与 apply 相同的是，**第一个参数也是代表函数体内的 this 指向**，从第二个参数开始往后，每个参数被依次传入函数。  

call 是包装在 apply 上面的一个语法糖。  

在使用 call 和 apply 时，**如果第一个参数为 null，函数体内的 this 会指向默认的宿主对象**，在浏览器中则是 window。若是在 严格模式下，函数体内的 this 还是为 null.  

有时使用 call 或者 apply 目的不在于使用 this 的指向，可能是借用其他对象的方法，可传入 null 用于代替某个具体的对象。 



#### call 和 apply 的用途  

**1. 改变 this 指向**

call 和 apply 最常见的用途是改变函数内部的 this 指向：  
```javascript
let obj1 = {
    name: 'John'
}

let obj2 = {
    name: 'Steve'
}

window.name = 'window';
let getName = function(){
    console.log(this.name);
}

getName();// window
getName.call(obj1);// John
getName.call(obj2);// Steve
```
以上代码中，`getName.call(obj1)` 执行时，getName 函数体内的 this 就指向 obj1 对象。  
在实际使用中，常使用 call 和 apply 来修正 this 的指向。  
```javascript

// 用 call 修正 func 函数内的 this，使其仍指向 div

document.getElementById('div1').onclick = function(){
    let func = function(){
        console.log(this.id);
    }
    func.call(this); // 若没有此句，func 输出 undefined
}

document.getElementById = (function(func){
    return function(){
        return func.apply(document, arguments);
    }
})(document.getElementById);

let getId = document.getElementById;
let div = getId('content');
console.log(div.id); // content
```
上述代码在实现使用 `getId` 代替系统的 `document.getElementById` 时，就使用 的 apply 改变 this 的指向到 document。



**2. 模拟 Function.prototype.bind**  
Function.prototype.bind 函数用来指定函数内部的 this 指向，可以用以下代码来模拟：  
```javascript
Function.prototype.bind = function( context ){
    let self = this; // 保存函数的引用
    return function(){ // 返回一个新的函数
        return self.apply(context, arguments);
    }
};

let obj = {
    name: 'seven'
}

let func = function(){
    alert(this.name)
}.bind(obj);
func();
```
上述代码中，传入的 context 对象是参数，该 context 对象就是要修正的 this 对象。
实际使用过程中如果需要预存参数，并且可以处理后续传入的参数，可以做以下改动：  
```javascript
Function.prototype.bind = function(){
    let self = this,
        context = [].shift.call(arguments),
        args = [].slice.call(arguments);
   return function(){
       return self.apply(context, [].concat.call(args, [].slice.call(arguments)));
   }
};
let obj = {
    name: 'sven';
}
let func = function(a,b,c,d){
    console.log(this.name);
    console.log([a,b,c,d]); // 1,5,7,8
}.bind(obj,1,5); // 可做到预存参数

func(7,8); // 后续传入参数

```


**3. 借用其他对象的方法**  
借用其他对象的方法，第一种可以使用 apply 或 call  **借用构造函数**，以实现类似继承的效果，这种继承方法类似 [JavaScript 继承](https://skylinebin.com/JavaScriptInheritance/) 中的 构造函数式继承。  

```javascript
let A = function(name){
    this.name = name;
}
let B = function(){
    A.apply(this, arguments);
}

B.prototype.getName = function(){
    return this.name;
}
let b = new B('Mack');
console.log(b.getName()); // output: Mack
```
这种方式，在子类的构造函数中执行父类构造函数。  

第二种应用场景常用于借用原型的方法实现相关的操作，例如常使用 Array.prototype 对象的方法完成数组的处理：  
```javascript
(function(){
    Array.prototype.push.call(arguments, 3);
    console.log(arguments); // 1,2,3
})(1,2);
```
还有就是常用来判断变量的数据类型是否是数组的方法：  
```javascript
let arr = [1,2,3];
Object.prototype.toString.call(arr) === "[object Array]"
```
以上这几种 都是 apply 或者 call 用来借用其他对象的方法，都比较常用。



### 参考资料  

- [《JavaScript 设计模式与开发实践》(曾探)](http://www.ituring.com.cn/book/1632)  
- [JavaScript 高级程序设计(第3版) 第七章](https://www.amazon.cn/dp/B007OQQVMY/ref=sr_1_1?ie=UTF8&qid=1546997809&sr=8-1&keywords=JavaScript%E9%AB%98%E7%BA%A7%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%28%E7%AC%AC3%E7%89%88%29)  
- [JavaScript instanceof 运算符深入剖析](https://www.ibm.com/developerworks/cn/web/1306_jiangjj_jsinstanceof/index.html)