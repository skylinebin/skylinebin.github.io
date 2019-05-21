---
layout: post
title:  "JavaScript 中的继承机制"
date:   2019-05-21 21:42:31
image: 'https://store.skylinebin.com/JavaScript.png'
description: 'Inheritance mechanism in JavaScript'
tags:
- JavaScript
- Code
- FrontEnd
categories:
- SkylineBin
twitter_text: 'Inheritance mechanism in JavaScript'
---  

## JavaScript 继承  

本文主要包括 JavaScript 原生继承机制以及 ES6 中 class 使用的 extends 继承。  

### JavaScript 类式继承  
类式继承的核心在于，**通过子类的原型 prototype 对父类实例化来实现**。即 子类的原型是父类的实例。  

```javascript
// 类式继承
function SuperClass() {
    this.superValue = true;
    this.books = ['JavaScript','HTML5','CSS3'];
}
// 父类原型上的方法
SuperClass.prototype.getSuperValue = function(){
    return this.superValue;
}
function SubClass() {
    this.subValue = false;
}
// 继承父类
SubClass.prototype = new SuperClass();
// 子类原型上的共有方法
SubClass.prototype.getSubValue = function(){
    return this.subValue;
}
```
类式继承的特点是，通过子类实例化的对象 **不仅可以访问父类原型上的属性和方法，同样也可以访问从父类构造函数中复制的属性和方法**。  

类式继承的缺点是，一个子类的实例更改子类原型从父类构造函数中继承来的共有属性会直接影响到其他子类。例如，
```javascript
let instanceOne = new SubClass();
let instanceTwo = new SubClass();
console.log(instanceTwo.books); // ['JavaScript','HTML5','CSS3']
instanceOne.books.push('ES6');
console.log(instanceTwo.books); // ['JavaScript','HTML5','CSS3','ES6']
```
父类构造函数中的属性被所有子类实例所共有，存在陷阱。  
并且子类实现的继承是靠子类原型prototype 对父类的实例化实现的，无法向父类传递参数，因此实例化时也无法对父类的属性进行初始化。

### JavaScript 构造函数式继承  

构造函数式继承的核心是，**通过在子类的构造函数作用环境中执行一次父类的构造函数来实现的**。  

```javascript
// 构造函数式继承
function SuperClass(id) {
    this.id = id;
    this.books = ['JavaScript','HTML5','CSS3'];
}
SuperClass.prototype.showBooks = function(){
    console.log(this.books);
}
// 声明子类
function SubClass(id){
    // 继承父类
    SuperClass.call(this,id);
}
let instanceOne = new SubClass(1);
let instanceTwo = new SubClass(2);
instanceOne.books.push('ES6');
console.log(instanceOne.books); // ['JavaScript','HTML5','CSS3','ES6']
console.log(instanceTwo.books); // ['JavaScript','HTML5','CSS3']
```

在声明子类的代码中，使用了`SuperClass.call(this,id);` 语句是实现构造函数式继承的核心，**在SubClass 实例环境下执行父构造函数内定义的代码**。  
call 方法可以更改函数的作用环境，在子类中对 superClass 调用 call 方法是将子类中的变量在父类中执行一遍，父类中是给 this 绑定属性的，子类继承了父类的共有属性，这种类型的继承没有涉及原型 prototype，父类的原型方法不会被子类继承。  


### 组合继承  

组合继承的核心是，在子类构造函数中执行父类构造函数，在子类原型上实例化父类。融合了类式继承和构造函数式继承的优点。  
```javascript
// 组合继承  
function SuperClass(name) {
    this.name = name;
    this.books = ['JavaScript','HTML5','CSS3'];
}
SuperClass.prototype.getName = function(){
    console.log(this.name);
}
function SubClass(name, time){
    SuperClass.call(this, name);
    this.time = time;
}

SubClass.prototype = new SuperClass();
SubClass.prototype.getTime = function(){
    console.log(this.time);
}
let instanceOne = new SubClass('ES6', 2015);
instanceOne.books.push("React");
console.log(instanceOne.books); // ['JavaScript','HTML5','CSS3','React']
instanceOne.getName(); // ES6
instanceOne.getTime(); // 2015
let instanceTwo = new SubClass('ES7', 2016);
console.log(instanceTwo.books); // ['JavaScript','HTML5','CSS3']
```
组合继承的 子类实例中更改继承自父类的引用类型属性不会影响到其他实例，并且实例化过程中可以将参数传递到父类的构造函数中。  


### 原型式继承  
原型式继承借助原型 prototype 可根据已有的对象创建一个新的对象，同时不必创建新的自定义对象类型。  
```javascript
function inheritObject(o) {
    function F() {}
    F.prototype = o;
    return new F();
}
```
F是临时性的构造函数，相当于 inheritObject 对传入其中的对象执行了一次浅复制。  
原型式继承与类继承很像，所以也存在 子类的实例 修改了父类的 属性会影响其他子类。  
```javascript
let book = {
    name: 'React 16',
    fbooks: ["CSS3","HTML5"]
};
let newBook = inheritObject(book);
newBook.fbooks.push('ES6');
console.log(newBook.fbooks); // ["CSS3","HTML5","ES6"]
let otherBook = inheritObject(book);
otherBook.fbooks.push('ES7');
console.log(otherBook.fbooks); // ["CSS3","HTML5","ES6","ES7"]
```
原型式继承中，父类对象中的值类型的属性被赋值，引用类型的属性被共用。  


### 寄生式继承  
寄生式继承创建一个仅用于封装继承过程的函数，该函数在内部以某种方式来增强对象。  


```javascript
// 寄生式继承
let book = {
    name: "front-end book",
    fBooks: ["CSS Book", "HTML Book"]
};
function createBook(obj) {
    // 通过原型继承方式创建新对象
    let o = new inheritObject(obj);
    // 拓展新对象
    o.getName = function(){
        console.log(name);
    }
    // 返回拓展后的新对象
    return o;
}
```
寄生式继承是对原型继承的第二次封装，并在第二次封装过程中对继承的对象进行拓展，新创建的对象不仅有父类中的属性和方法而且还新添加新的属性和方法。  


### 寄生组合式继承  
寄生组合式继承可看作寄生式继承和构造函数式继承的组合，但是处理的是类的原型。  

```javascript
function inheritPrototype(subClass, superClass){
    let p = inheritObject(superClass.prototype);
    p.constructor = subClass;
    subClass.prototype = p;
}

```
此时，继承的仅仅是父类的原型。并且对父类原型对象复制得到的复制对象p中的 constructor 指向的不是 subClass 子类对象，因此寄生式继承中要对复制对象p做一次增强，修复其 constructor 指向不正确的问题。  

子类的原型继承了父类的原型并且没有执行父类的构造函数。  

```javascript
// 定义父类
function SuperClass(name){
    this.name = name;
    this.colors = ["red","blue","green"];
}
// 定义父类原型方法
SuperClass.prototype.getName = function(){
    console.log(this.name);
}
// 定义子类
function SubClass(name, time) {
    // 构造函数式继承
    SuperClass.call(this, name);
    this.time = time;
}
// 寄生式继承父类原型  
inheritPrototype(SubClass, SuperClass);
// 子类新增原型方法
SubClass.prototype.getTime = function(){
    console.log(this.time);
}
let instanceOne = new SubClass("ES6", 2014);
let instanceTwo = new SubClass("ES7", 2015);

instanceOne.colors.push('black');
console.log(instanceOne.colors);// ["red","blue","green","black"];
console.log(instanceTwo.colors);// ["red","blue","green"];
```

寄生组合式继承，创建父类，创建子类，在定义子类时实现构造函数式继承，再通过寄生式继承了父类原型。  


整个继承过程的连接图基本如下图所示：  
![继承原理](https://sdns.skylinebin.com//fromPicGo/extendFoundation.jpg)  

图中有：  
```javascript
instanceOne.__proto__ === SubClass.prototype;
SubClass.prototype.constructor === SubClass;
SubClass.prototype.__proto__ === SuperClass.prototype;
SuperClass.prototype.constructor === SuperClass;
```

### JavaScript 多继承  

单属性继承常用的方法：  
```javascript
let extend = function(target, source) {
    for (let property in source){
        target[property] = source[property];
    }
    return target;
}

```
通过复制属性的方式，可以实现多继承，例如将这种方式绑定到对象的原型方法上  

```javascript
Object.prototype.mix = function(){
    let i = 0,
        len = arguments.length,
        arg;
    // 遍历被继承的对象
    for(; i< len;i++){
        arg = arguments[i];
        for (let property in arg){
            // 将被继承对象中的属性复制到目标对象中
            this[property] = arg[property];
        }
    }
}

otherBook.mix(book1, book2);
// otherBook 可以继承 book1 和 book2 的属性
```

### ES6 中 Class 的继承  
ES6 中的 Class 可以通过 `extends` 关键字实现继承，不用再单独修改原型链：  
```javascript
class Book {

}
class JavaScriptBook extends Book {
    constructor(language, ifEbook, page){
        super(language, ifEbook);
        this.page = page;
    }
    toString(){
        return this.page + ' ' + super.toString();
    }
}
```
ES6 中的子类**必须在 constructor 方法中调用 super 方法**，子类没有自己的 this 对象，是继承父类的 this 对象，super 方法用来表示父类的构造函数，用来新建父类的 this 对象。

ES6 中的 extends 继承实质是先创造父类的实例对象 this(需要调用 super 方法)，然后再用子类的构造函数修改this。这与 ES5 中的继承不同(ES5 中 是先创建子类的实例对象 this，然后再将父类的方法添加到 this 上)。  

子类的构造函数中，只有调用 super 之后才可以使用 this 关键字，负责会报错(ReferenceError)。  
子类实例的构建是基于父类实例加工，只有 super 方法可以返回父类实例。  

ES6 中 可以使用 `Object.getPrototypeOf()` 方法可以用来从子类上获取父类：  
```javascript
Object.getPrototypeOf(JavaScriptBook) === Book;
```

#### ES6 中 super 关键字的使用  
ES6 中的 super 关键字可以当作函数使用，也可以当作对象使用。  
1. super 作为函数调用时，代表的是父类的构造函数。  
```javascript
class A {}

class B extends A {
    constructor(){
        super();
    }
}
```
ES6 中的子类构造函数必须执行一次 super 函数。 子类 B 的构造函数中的 super 代表调用父类的构造函数。  
但是，**super返回的是子类B 的实例**，即 super 内部的 this 指的是 B，上述的 `super()` 相当于 `A.prototype.constructor.call(this)` 。  
因此，`super.valueOf() instanceof B` 是 true。

2. super 作为对象使用时在普通方法中使用时，是指向父类的原型对象，在静态方法中指向父类  
super 作为对象在普通方法中使用：  
```javascript
class A {
    p() {
        return 2;
    }
}

class B extends A {
    constructor(){
        super();
        console.log(super.p());
    }
}
let b = new B();
```
子类中的 super.p() 中的 `super` 指向父类的原型对象，相当于 `A.prototype`。  

因为这种 super 指向父类的原型对象，所以定义在父类实例上的方法或者属性(包括父类 constructor 构造函数内的属性和方法)是无法通过 super 调用的。  

此外，通过 super 调用父类的方法时， super会绑定子类的 this。  

```javascript
class A {
    constructor(){
        this.x = 1;
    }
    print() {
        console.log(this.x);
    }
}

class B extends A {
    constructor(){
        super();
        this.x = 3;
    }
    m (){
        super.print();
    }
}

let b = new B();
b.m() // 3
```
上述代码中，super.print() 是调用的 A.prototype.print()，但 A.prototype.print() 会绑定 子类 B 的 this。实际执行的是 `super.print.call(this)`。
在子类中如果通过 super 对某个属性赋值，这时的 super 就是 this，赋值的属性会变成子类实例的属性。  

super 作为对象用在静态方法中时， super 将指向父类。  
```javascript
class Parent{
    static thisMethod(msg){
        console.log('static', msg);
    }
    
    thisMethod(msg) {
        console.log('instance', msg);
    }
}

class Child extends Parent {
    static thisMethod(msg) {
        super.thisMethod(msg);
    }
    
    thisMethod(msg) {
        super.thisMethod(msg);
    }
}
Child.thisMethod(1); // static 1
let child = new Child();
child.thisMethod(2); // instance 2
```
super 在静态方法之中指向父类，因此 子类在静态方法中用到 `super.thisMethod(msg)` 相当于 `Parent.thisMethod(msg)`，因此输出也是 static。  
因为 super 在不同用法时的指向不同，在使用时一定要显示指定时作为函数韩式作为对象使用。  

#### class 的 prototype 属性 和  \_\_proto\_\_ 属性
Class 作为 构造函数的语法糖，同时有 prototype 属性 和 \_\_proto\_\_ 属性，同时存在两条继承链。  
- 子类的 \_\_proto\_\_ 属性表示构造函数的继承，总是指向父类  
- 子类 prototype 属性的 \_\_proto\_\_ 属性表示方法的继承，总是指向父类 的 prototype 属性。
```javascript
class A {

}
class B extends A {

}
B.__proto__ === A // true
B.prototype.__proto__ === A.prototype // true
```



### 参考资料  
- [JavaScript 高级程序设计(第3版) 第六章](https://www.amazon.cn/dp/B007OQQVMY/ref=sr_1_1?ie=UTF8&qid=1546997809&sr=8-1&keywords=JavaScript%E9%AB%98%E7%BA%A7%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%28%E7%AC%AC3%E7%89%88%29)  
- [JavaScript 设计模式(张容铭)](https://www.amazon.cn/dp/B013HO6DNS/ref=sr_1_1?__mk_zh_CN=%E4%BA%9A%E9%A9%AC%E9%80%8A%E7%BD%91%E7%AB%99&keywords=JavaScript+%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%28%E5%BC%A0%E5%AE%B9%E9%93%AD%29&qid=1558446821&s=books&sr=1-1)  
- [ES6标准入门(第3版)阮一峰](https://www.amazon.cn/dp/B07BSLNQN8/ref=sr_1_1?__mk_zh_CN=%E4%BA%9A%E9%A9%AC%E9%80%8A%E7%BD%91%E7%AB%99&keywords=ES6%E6%A0%87%E5%87%86%E5%85%A5%E9%97%A8%28%E7%AC%AC3%E7%89%88%29%E9%98%AE%E4%B8%80%E5%B3%B0&qid=1558446848&s=books&sr=1-1)