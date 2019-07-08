---
layout: post
title:  "JavaScript 函数柯里化与反柯里化 "
date:   2019-07-08 15:54:21
image: 'https://store.skylinebin.com/JavaScript.png'
description: 'Currying & Uncurrying in JavaScript'
tags:
- JavaScript
- Code
- FrontEnd
categories:
- SkylineBin
twitter_text: 'Currying & Uncurrying in JavaScript'
---  


## JavaScript 函数柯里化(currying)与反柯里化(uncurrying)  

### JavaScript 函数柯里化  

函数柯里化(function currying) 是高级函数中的一种较为普遍的应用技巧，其基本方法和函数绑定一样，即**使用一个闭包返回一个函数**。函数柯里化的特点是，当调用柯里化函数时，返回的函数还需要设置一些传入的参数。  

柯里化函数常见的动态创建步骤是：**调用另一个函数并为它传入要柯里化的函数和必要参数**。

通用的柯里化函数写法如下：  
```javascript
function curry(fn){
    var args = Array.prototype.slice.call(arguments,1);
    return function(){
        var innerArgs = Array.prototype.slice.call(arguments);
        var finalArgs = args.concat(innerArgs);
        return fn.apply(null, finalArgs);
    }
}

function add(num1,num2){
    return num1+num2;
}
var curriedAdd = curry(add,3,4);
console.log(curriedAdd());// 7
```
以上实现过程中，curry 方法主要作用是将除fn以外所有传入的参数集中起来，一起传入fn中执行，此函数没有考虑执行环境。  

currying 更常用的场景是**部分求值**，即一个 currying 的函数首先会接受一些参数，接受了这些参数之后，该函数并不会立即求值，而是继续返回另一个函数，刚才传入的参数在函数形成的闭包中被保存起来，待到函数被真正需要求值的时候，之前传入的所有参数都会被一次性用于求值。  

以下是一个通用的 currying 应用案例  
```javascript
var currying = function(fn){
    var args = [];
    return function(){
        if(arguments.length === 0){
            return fn.apply(this, args);
        }else {
            [].push.apply(args, arguments);
            return arguments.callee; // 返回自身，包含当前正在执行的函数
        }
    }
};

var cost = (function(){
    var money = 0;
    return function(){
        for(var i=0,l=arguments.length;i<l;i++){
            money += arguments[i];
        }
        return money;
    }
})();
var cost = currying(cost);

cost(100);
cost(200);
cost(300);

console.log(cost());// 求值并输出  
```
以上代码中，当调用函数 cost()时，如果明确地带上一些参数，就表示此时并不进行真正的求值，而是将参数保存起来，此时 cost 函数返回的是另一个函数，只有以不带参数的形式执行cost()时，才将之前保存的所有参数进行运算。  
<br />

### 函数反柯里化  

[鸭子类型](https://www.wikiwand.com/zh-hans/%E9%B8%AD%E5%AD%90%E7%B1%BB%E5%9E%8B) 的思想是动态语言的特点，当调用一个对象的某个方法时，并不关心该对象原本是设计来干什么的。  
JavaScript 中也有很多时候需要让对象去借用一个原本不属于它的方法。  
常有以下应用场景：  
```javascript
(function(){
    Array.prototype.push.call(arguments,4);
    console.log(arguments); // [1,2,3,4]
})(1,2,3);

let arr = new Array();
Object.prototype.toString.call(arr) === "[object Array]"; // 
```
以上代码第一部分是类数组对象去借用 Array.prototype 的方法，也是 call 和 apply 常见的应用场景。第二部分是数组对象借用 Object.prototype 的方法来判断其类型。使用 call 和 this 可以把任意对象当作 this 传入某个方法，有了此操作，方法中用到this的地方都可以不局限与原本限定的对象，拓宽了对象方法的适用性。  
以下是 反柯里化(uncurrying) 的一种实现方式之一  
```javascript
Function.prototype.uncurrying = function(){
    var self = this;
    return function(){
        var obj = Array.prototype.shift.call(arguments);
        return self.apply(obj, arguments);
    }
}
// 此时的 obj 是传入的指定执行环境对象
```
反柯里化可以理解成原本是以 `a.b(c)` 形式调用的方法可以转换成 `b(a,c)` 的形式调用，后者的 a 还可以换成其他对象，这就扩大了函数的使用范围。  

例如，可以利用上述的反柯里化的代码将 Array.prototype.push 方法转换成一个通用的 push 方法。  
```javascript
let push = Array.prototype.push.uncurrying();

let obj = {
    "length": 1,
    "0": 1
}
push(obj,2);
console.log(obj); // {0: 1, 1: 2, length: 2}
```
经过上述代码的第一行代码，push 函数的嗯作用就可以和 Array.prototype.push 一样了。  
在 uncurrying 定义的过程中 反柯里化的实现是在调用 `uncurrying` 时将原有的方法当成 self ，返回一个函数，函数传入的第一个参数是新的执行环境对象，但是**执行的方法实际是在 self 代表的原函数中实现的**。  
通过 uncurrying 此方法，可以将其他方法集中复制在一个对象上，例如可以将 Array 原型上的方法复制到 Array 对象上：  
```javascript
for(let i=0,fn,ary=['push','shift','unshift','forEach'];fn=ary[i++];){
    Array[fn] = Array.prototype[fn].uncurrying();
};
let obj = {
    "length":3,
    "0":1,
    "1":2,
    "2":3
};

Array.push(obj,4);
let first = Array.shift(obj);
console.log(first); // 1
Array.forEach(obj, function(i,n){
    console.log(n)// i 是值 n 是索引，此处分别输出 0,1,2
});

```
Array 对象上复制了`'push','shift','unshift','forEach']`数组中的原型方法,扩宽了应用环境。  
另一种 uncurrying 的实现方式为：  
```javascript
Function.prototype.uncurrying = function(){
    var self = this;
    return function(){
        return Function.prototype.call.apply(self, arguments);
    }
}
```
这一种写法与上述第一种写法效果完全相同，因为传入的参数 arguments 是 call 的所有参数，则第一个参数还是运行环境的对象。  
<br />

### 经典面试题  

实现一个 sum 方法，使计算结果能够满足如下效果：  
sum(x,y) = sum(x)(y) = x+y;
当然函数参数可扩展。  

解题思路分析：  
因为，可以进行类似链式调用，所以每次调用返回的应该是一个函数，以便下一次调用，不传入参数时可以通过 重写 toString() 方法，实现求和。也就是可以先把所有传入的参数都存起来，等到需要的时候再触发一起求和，这个思想和 currying 很相似，所以可以用函数柯里化来实现。  

```javascript
// 不使用柯里化的解决方法，每次都先算一遍
function sum(num){
  let sumNum = 0;
  let args = [].slice.call(arguments);
  sumNum += args.reduce(function(a,b){
    return a+b;
  })
  let curryFun = function(numB){
    let argsF = [].slice.call(arguments);
    if(arguments.length === 0){
      return sumNum;
    }else {
      sumNum += argsF.reduce(function(a,b){
        return a+b;
      })
      return curryFun;
    }
  };

  curryFun.valueOf = function(){
    return sumNum;
  }
  curryFun.toString = function(){
    return sumNum;
  }
  return curryFun;
}

let x = 2;
let y = 5;
console.log(sum(x,y));
console.log(sum(x)(y));
```
以上方法基本有了柯里化的影子，就是把每次调用的结果先求和存在sumNum 中，但是整个过程每次都计算一遍还是和柯里化有差距。

以下代码是柯里化解决函数求和的整个过程：  
```javascript
function sum(){
  let _arr = [].slice.call(arguments);

  let addFun = function(){
    // 利用解构赋值暂存传入的参数
    _arr.push(...arguments);
    return addFun;
  }

  addFun.toString = function(){
    return _arr.reduce(function(x,y){
      return x+y;
    });
  }
  // 返回的是函数
  return addFun;
}

sum(1,3); // 4
sum(5)(6)(7); // 18
```  

node 里面不会主动调用 toString 方法，需要在浏览器环境下，才会可能调用执行toString。  

<br />

### 函数绑定   

函数绑定是为了实现，要创建一个函数，可以在特定的 this 环境中以指定参数调用另一个函数。  

JavaScript 库中实现了一个可以将函数绑定到指定环境的函数，此函数一般叫 bind();  
一个简单的 bind函数接受一个函数和一个环境，并返回一个在给定环境中调用给定函数的函数，并且将所有参数原封不动传递过去。  
简单的bind 函数如下所示：  
```javascript
function bind(fn, context){
    return function(){
        return fn.apply(context, arguments);
    };
}
```
该函数实现的详细过程是，在 bind 函数中创建了一个闭包，闭包使用apply()调用传入的参数，并给apply() 传递 context 对象和参数。上述函数中arguments对象是内部函数的，并不是 bind() 函数的。  

绑定函数的应用场景如下：  
```javascript
var handler = {
    message: "Event handled",
    handleClick: function(event){
        console.log(this.message+":"+event.type);
    }
};
var btn = document.getElementById("my-btn");
EventUtil.addHandler(btn, "click",bind(handler.handleClick,handler));
```
上述的 bind 函数创建了一个保持了执行环境的函数，并将其传给 EventUtil.addHandler()。handler.handleClick() 方法和平时一样获得了 event 对象，因为所有的参数都通过被绑定的函数直接传给了它。  

`EventUtil.addHandler(btn, "click",bind(handler.handleClick,handler));` 中bind() 方法那里本来是一个函数，现在也是一个函数，这个函数是 bind 闭包返回的函数，并且绑定了指定的环境。  
此外，支持 原生 bind() 方法的浏览器有IE9+、Firefox4+ 和 Chrome...  

### 函数绑定与函数柯里化联用  

函数柯里化也经常与函数绑定一起组合使用，例如以下代码构造出的 bind 函数就使用了函数柯里化：  
```javascript
function bind(fn,context){
    var args = Array.prototype.slice.call(arguments, 2);
    return function(){
        var innerArgs = Array.prototype.slice.call(arguments);
        var finalArgs = args.concat(innerArgs);
        return fn.apply(context, finalArgs);
    }
}
```  

bind 函数需要同时接受一个函数 fn 和一个object 对象 context，此时表示给被绑定的函数的参数从第三个开始，并且fn的执行环境转换成了传入的参数 context。此时调用 bind 就可以返回绑定到给定环境的函数。  
使用带有柯里化的bind函数可以给事件传递额外的参数:  
```javascript
var handler = {
    message: "Event handled",
    handleClick: function(name, event){
        console.log(this.message+":"+name+":"+event.type);
    }
};
var btn = document.getElementById("my-btn");
EventUtil.addHandler(btn, "click",bind(handler.handleClick,handler,"my-btn"));
```  

ES5 中的 bind() 方法也实现函数柯里化，只需传递除执行环境外的另一个参数就好。例如：  
```javascript
EventUtil.addHandler(btn,"click",handler.handleClick.bind(handler,"my-btn"));
```

JavaScript 中的柯里化函数和绑定函数提供了**强大的动态函数创建功能**。  

### 参考资料  
- [详解JS函数柯里化](https://www.jianshu.com/p/2975c25e4d71?tdsourcetag=s_pctim_aiomsg)  
- [JavaScript 中的函数柯里化(currying)](https://www.zhangxinxu.com/wordpress/2013/02/js-currying/)  
- [《JavaScript 设计模式与开发实践》(曾探)](http://www.ituring.com.cn/book/1632)  
- [JavaScript 高级程序设计(第3版) 第22章](https://www.amazon.cn/dp/B007OQQVMY/ref=sr_1_1?ie=UTF8&qid=1546997809&sr=8-1&keywords=JavaScript%E9%AB%98%E7%BA%A7%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%28%E7%AC%AC3%E7%89%88%29)  
- [浅析 JavaScript 中的 函数 uncurrying 反柯里化](https://www.cnblogs.com/zztt/p/4152147.html)  

