---
layout: post
title:  "Tensorflow系列--(二)常用激励函数及其比较"
date:   2018-06-25 19:40:31
image: 'https://store.skylinebin.com/TensorflowLearning/tensorflow.png'
description: 'Basic skills in MachineLearning'
tags:
- Ubuntu
- Tensorflow
- DeepLearning
- MachineLearning
categories:
- SkylineBin
twitter_text: 'Tensorflow中常用激励函数及其比较 '
---


&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;这篇文章是Tensorflow系列文章中的第二篇，也是比较基础，主要想细致记录和总结一下Tensorflow中常用的激励函数。主要参考但不限于书籍Nick McClure的 *Tensorflow Machine Learning Cookbook* 中文版《Tensorflow机器学习实战指南》。文中涉及到的代码的**完整源码**都放在了Github里[MachineLearningNotes--Tensorflow](https://github.com/skylinebin/Machine-Learning-Notes/tree/master/Tensorflow/TensorflowWithCookbook)当中了。  


## Tensorflow中常用激励函数  


### 1.整流线型单元(RELU)

```python
print('- - - - - - - -relu - - - - - - - - - -')
# 1.ReLU 整流线型单元 relu激励函数
print(sess.run(tf.nn.relu([-3., 3., 10.])))
# output is [ 0.  3. 10.] same as max(0,x)
```

*tf.nn.relu(x)* 是机器学习中最常用的非线性函数，其对应数学公式为: ![](http://latex.codecogs.com/png.latex?max(0,x))  


```python
print('- - - - - - - relu6 - - - - - - - - - - -')
print(sess.run(tf.nn.relu6([-3., 3., 10.])))
# output is [0. 3. 6.] same as min(max(0, x), 6)
```  

为抵消ReLU激励函数的线性增长部分，使用取最大取最小的 *tf.nn.relu6()* 函数，其对应数学公式为：![](http://latex.codecogs.com/png.latex?min(max(0,&space;x),&space;6))  

<br />

### 2.逻辑函数(sigmoid)  

```python
print('- - - - - - sigmoid - - - - - - - - - - -')
print(sess.run(tf.nn.sigmoid([-1., 0., 1.])))
# output is [0.26894143 0.5        0.7310586 ]
# same as 1/(1 + exp(-x))   1/(1+exp(-1)) = 0.731058578630005 from matlab
```  

*tf.nn.sigmoid()* 是最常用的连续、平滑的激励函数，又被称为逻辑函数，取值范围为0~1。其对应数学公式为： ![](http://latex.codecogs.com/png.latex?\frac{1}{1&plus;e^{-x}})   

<br />

### 3.双曲正切函数(tanh)  

```python
print('- - - - - - - tanh- - - - - - - - - - -')
print(sess.run(tf.nn.tanh([-1., 0., 1.])))
# output is [-0.7615942  0.         0.7615942]
# same as (exp(x) - exp(-x))/(exp(x) + exp(-x))
```  

*tf.nn.tanh()* 函数 是双曲正弦与双曲余弦的比值，双曲正切函数的取值为-1~1。其对应数学公式为: ![](http://latex.codecogs.com/png.latex?\frac{e^{x}&space;-&space;e^{-x}}{e^{x}&space;&plus;&space;e^{-x}})   
<br />

### 4.softsign激励函数(softsign)  

```python
print('- - - - - - - softsign - - - - - - - - - - -')
print(sess.run(tf.nn.softsign([-1., 0., -1.])))
# output is [-0.5  0.  -0.5]
# same as x/(abs(x) + 1)
```  

*tf.nn.softsign()* 是符号函数的连续估计。其对应数学公式为: ![](http://latex.codecogs.com/png.latex?\frac{x}{abs(x)&space;&plus;&space;1})   


<br />

### 5.softplus激励函数(softplus)  

```python
print('- - - - - - - softplus - - - - - - - - - - -')
print(sess.run(tf.nn.softplus([-1., 0., -1.])))
# output is [0.31326166 0.6931472  0.31326166]
# same as log(exp(x) + 1)
```  

*tf.nn.softplus()* 函数是ReLU激励函数的平滑版。其对应数学公式为: ![](http://latex.codecogs.com/png.latex?log(e^{x}&space;&plus;&space;1))   


<br />

### 6.ELU激励函数(elu)  

```python
print('- - - - - - - elu - - - - - - - - - - -')
print(sess.run(tf.nn.elu([-1., 0., 1.])))
# output is [-0.63212055  0.          1.        ]
# same as x<0? (exp(x)+1):x
```  

*tf.nn.elu()* 函数，当输入无限小时，ELU激励函数趋近于-1，softplus激励函数输出趋近于0，其对应逻辑如一下代码：  

```python
def elu(x):
    if x < 0:
        return exp(x)+1
    else:
        return x
```  

<br />  

### 7.几种激励函数对比分析  

针对几种不同的激励函数进行对比分析，激励函数中：ReLU、ReLU6、softplus和ELU可进行对比分析。使其输入相同，连续的-10~10的输入，对比输出。

```python
import tensorflow as tf
import numpy as np
import matplotlib.pylab as plt

sess = tf.Session()

x = np.linspace(-10.0, 10.0)
plt.figure(1)

plt.plot(x , sess.run(tf.nn.relu(x)), label='relu')
plt.plot(x , sess.run(tf.nn.relu6(x)), label='relu6')
plt.plot(x , sess.run(tf.nn.softplus(x)), label='softplus')
plt.plot(x , sess.run(tf.nn.elu(x)), label='elu')

plt.legend()
plt.show()
```

<br />  
运行结果如下图所示： 

![激励函数对比一](https://store.skylinebin.com/TensorflowLearning/sigmoidFunction.png)  

ReLU、ReLU6、softplus和ELU对应的曲线表示，这四种激励函数在输入小于0时，输出值基本不变化，在0附近较为平缓。当输入值从0开始增加时，基本是线性增长，relu6函数最大值只能取到6。  


针对softsign、sigmoid和tanh，使其输入相同，连续的-10~10的输入，对比输出。

```python
import tensorflow as tf
import numpy as np
import matplotlib.pylab as plt

sess = tf.Session()

x = np.linspace(-10.0, 10.0)
plt.figure(2)
plt.plot(x , sess.run(tf.nn.softsign(x)), label='softsign')
plt.plot(x , sess.run(tf.nn.sigmoid(x)), label='sigmoid')
plt.plot(x , sess.run(tf.nn.tanh(x)), label='tanh')

plt.legend()
plt.show()
```  

<br />  
运行结果如下图所示： 

![激励函数对比二](https://store.skylinebin.com/TensorflowLearning/sigmoidFunction2.png)  

softsign、sigmoid和tanh这些激励函数对应的输出基本都是平滑的、具有S型的函数。sigmoid和tanh激励函数有水平渐近线。


<br />
<br />
这篇文章介绍的激励函数将是后面使用Tensorflow搭建机器学习模型的基础，将原理实现出来，必定会用到对应的方法，所以基础知识必不可少。  

