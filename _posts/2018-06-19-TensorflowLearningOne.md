---
layout: post
title:  "Tensorflow系列--(一)基本概念与操作"
date:   2018-06-19 16:51:31
image: 'http://osaussnqu.bkt.clouddn.com/TensorflowLearning/tensorflow.png'
description: 'Basic skills in MachineLearning'
tags:
- Ubuntu
- Tensorflow
- DeepLearning
- MachineLearning
categories:
- SkylineBin
twitter_text: 'Tensorflow基本概念与操作 '
---


&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;这篇文章是Tensorflow系列文章中的第一篇，比较基础，主要想细致过一遍用到的Tensorflow的内容。主要参考但不限于书籍Nick McClure的 *Tensorflow Machine Learning Cookbook* 中文版《Tensorflow机器学习实战指南》(错误很多)。文中涉及到的代码的**完整源码**都放在了我的Github里[MachineLearningNotes--Tensorflow](https://github.com/skylinebin/Machine-Learning-Notes/tree/master/Tensorflow/TensorflowWithCookbook)当中了。

## 准备工作

**系统环境** ：Windows10 x64 / Ubuntu 16.04 x64  
**Python环境** ：Python 3.5.4 / Python 3.5.2   
**Tensorflow环境** ：Tensorflow1.8.0 / Tensorflow1.4.0  

安装Tensorflow环境使用pip直接安装就好，douban的pip镜像速度很快，后面需要用到Keras，也可以用pip直接安装。
查看tensorflow的环境语句

```python
import tensorflow as tf
print(tf.__version__)
```
若能正确输出版本号，基本是可以进行后面操作了。


## Tensorflow中张量的操作

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tensorflow中主要数据结构是张量，常用张量来操作计算图。可以把 **变量** 或者 **占位符** 声明为张量。  

1.固定张量  
常有零张量、单位张量、指定常数填充张量和常数矩阵创建张量等几种。  

```python
#创建固定维度的零张量
zero_tsr =tf.zeros([row_dim,col_dim])

#创建指定维度的单位张量
ones_tsr =tf.ones([row_dim,col_dim])

#创建指定维度的常数填充张量
filled_tsr = tf.fill([row_dim,col_dim], 42)

#使用已知常数张量创建张量
constant_tsr = tf.constant([1,2,3])
```

<br />
2.相似张量  
新建与已有张量类似的张量。 

```python
# 新建与已有张量类似的张量
zero_similar = tf.zeros_like(constant_tsr)
# ones_similar = tf.ones_like(constant_tsr)
``` 

<br />
3.序列张量  
新建再指定序列内形成张量。 

```python
# 创建指定间隔的张量,包括结尾值
linear_tsr = tf.linspace(start=0.0,stop=1.0,num=7)
# when num=7, output is  [0.         0.16666667 0.33333334 0.5        0.6666667  0.8333334 1.        ]

# 随机取间隔递增值不包括结尾值
integer_seq_tsr = tf.range(start=6,limit=20,delta=3)
# when start=6,limit=20, delta =3, output is [ 6  9 12 15 18]
``` 

<br />
4.随机张量  
新建不同分布的随机书形成张量。 

```python
# 生成均匀分布的随机数
randunif_tsr = tf.random_uniform([row_dim,col_dim], minval=0, maxval=2)
# when maxval=2, one row is [1.4330745  1.6743479  1.4814448  0.16386724 1.9783459  1.0236795
#   0.1930139  0.34939528 1.3543162  0.4354465 ]
# in this function, minval <= x < maxval

# 生成正态分布的随机数
randnorm_tsr = tf.random_normal([row_dim,col_dim], mean=0.0, stddev=1.0)

# 生成随机数位于指定期望到两个标准差之间的区间
runcnorm_tsr = tf.truncated_normal([row_dim,col_dim], mean=0.0, stddev=1.0)
```  

<br />
5.张量调整与剪裁  

```python
# 随机调整张量参数的顺序
shuffled_output_tsr = tf.random_shuffle(constant_tsr)

oldconstant_tsr = tf.constant([[1,2,3],[4,5,6],[7,8,9]])

# 对原有张量进行随机裁剪
cropped_output_tsr = tf.random_crop(oldconstant_tsr,[3,1])
# 张量裁剪，要注意维数和通道数, 3*3 可被裁剪顶多是二维
# when size=[3,1], output is [[1] [4] [7]]
```  

<br />
6.张量使用与输出  
创建计算图，在计算图中运行并输出张量结果。  

```python
sess = tf.Session()
print(sess.run(oldconstant_tsr))
print('- - - - - - - - - - - - - - - - - - - -')
print(sess.run(cropped_output_tsr))
```  
<br />
7.封装张量作为变量  
Tensoeflow中的变量是通过tf.Variable( )函数得到的，过程是输入一个张量，返回一个变量。  

```python
# 创建好张量,使用tf.Variable()封装张量作为变量
print('- - - - - - - - - - - - - - - - - - - -')
first_zero_var = tf.Variable(zero_tsr)
sess.run(first_zero_var.initializer)
# 对已经初始化的变量进行初始化操作方式
```  

<br />
8.全局变量初始化以及占位符操作  
占位符 **仅仅声明数据位置**，用于传入数据到计算图。  

```python
initialize_option = tf.global_variables_initializer()
sess.run(initialize_option)
print('- - - - - - - - - - - - - - - - - - - -')
# 占位符形成
init_x = tf.placeholder(tf.float32, shape=[2,2])
# 占位符要声明数据格式
init_y = tf.identity(init_x)
x_vals = np.random.rand(2,2)
sess.run(init_y, feed_dict={init_x: x_vals})
```

<br />
<br />

## Tensorflow中矩阵的操作

1.创建矩阵  

```python
indentity_matrix = tf.diag([1.0, 1.0, 1.0])
matrix_A = tf.truncated_normal([2, 3])
matrix_B = tf.fill([2,3], 5.0)
matrix_C = tf.random_uniform([3,2])
matrix_D = tf.convert_to_tensor(np.array([[1., 2., 3.],[-3., -7., -1.],[0., 5., -2.]]))
```  

<br />
其中，*tf.diag* 为创建对角矩阵，*tf.truncated_normal* 为创建指定维数随机矩阵，*tf.fill* 为创建填充矩阵，*tf.random_uniform* 为创建0~1之间随机矩阵；*tf.convert_to_tensor* 可将numpy创建的矩阵转换成张量矩阵。  

2.矩阵加减乘法运算  

```python
print('- - - - - - - - - - - - - - - - - - - -')
print(sess.run(matrix_A+matrix_B))
print('- - - - - - - - - - - - - - - - - - - -')
print(sess.run(matrix_A-matrix_B))
print('- - - - - - - - - - - - - - - - - - - -')

# 矩阵乘法
print(sess.run(tf.matmul(matrix_B,indentity_matrix)))
# 矩阵乘法注意矩阵前后次序，以及对应的阶次
print('- - - - - - - - - - - - - - - - - - - -')
# 矩阵转置
print(sess.run(tf.transpose(matrix_C)))
# 重新初始化会得到不同的值，
```  

<br />
3.矩阵行列式与逆矩阵  

```python
print('- - - - - - - - - - - - - - - - - - - -')
# 矩阵行列式
print(sess.run(tf.matrix_determinant(matrix_D)))

print('- - - - - - - - - - - - - - - - - - - -')
# 矩阵的逆矩阵
print(sess.run(tf.matrix_inverse(matrix_D)))
# 矩阵的逆矩阵是用平方根法，
# 需要矩阵为对称正定矩阵或者可进行LU分解

print('- - - - - - - - - - - - - - - - - - - -')
# 矩阵分解法
print(sess.run(tf.cholesky(indentity_matrix)))

print('- - - - - - - - - - - - - - - - - - - -')
# 求矩阵特征值和特征向量
print(sess.run(tf.self_adjoint_eig(matrix_D)))
```  

上述代码中，Tensorflow中使用 *tf.matrix_inverse* 求逆矩阵是采用平方根法，矩阵要能够进行LU分解。  

<br />
4.矩阵分解与行列式  

```python
print('- - - - - - - - - - - - - - - - - - - -')
# 矩阵分解法
print(sess.run(tf.cholesky(indentity_matrix)))

print('- - - - - - - - - - - - - - - - - - - -')
# 求矩阵特征值和特征向量
print(sess.run(tf.self_adjoint_eig(matrix_D)))
```  

<br />
在以上函数中，*tf.self_adjoint_eig*输出的结果，第一行为 **特征值** ，后面为每个特征值对应的 **特征向量**，此为矩阵的特征分解。  

Tensorflow中加入上述矩阵操作到计算图中进行张量计算，对于后面使用Tensorflow进行机器学习有很重要的作用。