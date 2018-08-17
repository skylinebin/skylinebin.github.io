---
layout: post
title:  "MySQL相关基础"
date:   2018-08-12 22:02:31
description: 'Summary the instruction of MySQL'
tags:
- MySQL
- Database
- System
- BackEnd
categories:
- SkylineBin
twitter_text: 'MySQL使用及基础指令总结 '
---

## 背景

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;从最开始接触到 MySQL 到现在至少有三年了，一只把它当作工具用，虽然上过相关课程，但也并没有对其运行原理和优化事项理解的很清楚，只是在有数据存储需求时考虑到使用 MySQL 会比用 Oracle 方便。距离上一次系统地学习 MySQL 也差不多有半年了，这篇文章主要是上次系统地学习 MySQL (使用 网易唐汉明出的《深入浅出 MySQL 数据库开发、优化与管理维护》)里面的 SQL基础部分记的笔记。当时学习的时候是自己建数据库，所有指令都自己对照修改执行了一遍，现在来总结一下，也当作是复习吧。这篇文章是基础，后面应该会总结 MySQL 使用过程中遇到的问题以及对应的解决方案，和 MySQL 的高级应用。  

> 本文所有 sql 语句 都是在 Windows10 的 cmd 以管理员模式 执行以下指令得到的结果  
>    mysql -u root -p  


## SQL语句分类  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;一般 SQL 语句可分为三种：DDL语句、DML语句 和 DCL语句，这三种语句的区别如下：  
- **DDL（Data Definition Languages）**：*数据定义语言*，用来定义不同的数据段、数据库、表、列、索引等数据库对象。常用关键字主要有：create、drop、alter等。  
- **DML(Data Manipulation Language)**：*数据操纵语句*，用于添加、删除、更新和查询数据库记录，并检查数据完整性。常用关键字主要包括：insert、delete、update和select等。  
- **DCL(Data Control Language)**：*数据控制语句*，用于控制不同数据段直接的许可和访问级别的语句(访问权限和安全级别)。主要关键字有：grant、revoke等。  

***  

<br />  

### 一、DDL语句  

#### 1.创建数据库  
查询所有数据库：  
```
 show databases;
```  
创建数据库:  
```
 create database testbin;
```  

![MySQL Databases](https://store.skylinebin.com/image/mysql/Databases.png)  

- information_schma 数据库是主要存储了系统中的一些数据库对象信息，比如用户表信息，列信息，权限信息，字符集信息，分区信息等。  
- mysql 数据库存储了系统的用户权限信息.  
- test 和 cluster 数据库分别是测试数据库 和系统集群信息的数据de库.可惜这里的数据库没有。  

选择数据库：  
```
 use testbin;
``` 
查看数据库里的所有表：  
```
 show tables;
```  

#### 2.删除数据库  
删除数据库:  
```
 drop database testbin;
```  

#### 3.创建表  
在数据库中创建一张表:  
```
 create table ems(ename varchar(10),hiredate date,sal decimal(10,2),deptno int(2));
```  
查看一张表的信息(表结构信息)：  
```
 desc ems;
``` 
查看创建某张表的SQL语句：  
```
 show create table ems \G;
```  
从查询创建表的语句返回的数据可以看到除表定义之外的表的存储引擎（engine）、字符集(charset)等信息。"\G"选项是使记录能够按照字段竖向排列，更好地显示内容较长的信息。  

#### 4.删除表  
删除一张表:  
```
 drop table ems;
```  

#### 5.修改表  
修改表中某字段的定义:  
```
 alter table ems modify ename varchar(20);
```  
增加表中的表字段：  
```
 alter table ems add column age int(3);
``` 
删除表中的表字段：  
```
 alter table ems drop column age;
``` 
修改某字段的字段名：  
```
 alter table ems change age agetwo int(4);
``` 
修改 **新增字段** 排列顺序：  
```
 alter table ems add birth date after ename;
```  
之前的字段增加和修改语法(ADD/CHANGE/MODIFY)中都不能改变一个字段在表中的显示位置，ADD添加的默认显示在最后递增。  

修改 **原有表字段** 的排列顺序：  
```
 alter table ems modify agetwo int(3) first;
```  
更改数据库中某表的表名：  
```
 alter table ems rename emsone;
```  
***  

<br />  

### 二、DML语句  

#### 1.插入记录  
向表中插入数据记录(未指明字段的添加默认或者为空)：  
```
 insert into ems(ename,hiredate,sal,deptno) values('zzx1','2017-07-03','6000',1);
```  
不指明字段添加数据记录(必须按字段顺序写入数据)：  
```
 insert into ems values('lista','2017-07-04','5500',2);
```  
只对指定字段显式插入值：  
```
 insert into ems (ename,sal) values('dony','5000');
```  
得到结果：  

![MySQL inset](https://store.skylinebin.com/image/mysql/DataInsertone.png)  
其余未插入值得字段数据为空NULL  
查询一张表中所有数据：  
```
 select * from ems;
```  
insert语句可以一次性插入多条记录, **可节省网络开销，提高插入效率** ：  
一次插入多条数据记录：  
```
 insert into ems (ename,hiredate,sal,deptno) values ('john','2016-03-05','4000',3),('json','2015-06-09','5500',7),('Des','2016-02-15','5000',8);
```  
![MySQL insert Many records](https://store.skylinebin.com/image/mysql/DataInsertMany.png)  

#### 2.更新记录 
更新已知 ename 的某一条数据中sal字段的值： 
```
 update ems set sal=6000 where ename='lista';
```  
多表更新记录可在一条语句中更新多个表：  
```
 update ems a,dept b set a.sal=a.sal*b.deptno,b.deptname=a.ename where a.deptno=b.deptno;
```  

#### 3.删除记录 
将某张表中符合某一字段的数据全部删除： 
```
 delete from ems where ename='dony';
```  
![MySQL条件删除](https://store.skylinebin.com/image/mysql/DataDeleteWhere.png)  
同样，delete语句也可以一次删除多条记录在多个表中,同时操纵删除多个表中符合条件的数据:  
```
 delete a,b from ems a,dept b where a.deptno=b.deptno and a.deptno=3;
```  

#### **4.查询记录**  
select语法查询数据： 
```
 select * from tablename [where condition]
```  
![MySQL Data Select](https://store.skylinebin.com/image/mysql/DataSelect.png)  
"*" 代替了所有表字段 (select ename,hiredate,sal,deptno from ems)  

#### 4.1 查询不重复的记录  
使用关键字“distinct”来去除重复的记录:  
```
 select distinct sal from ems;
```  
![MySQL Data Select Distinct](https://store.skylinebin.com/image/mysql/DataSelectDistinct.png) 

#### 4.2 条件查询  
使用关键字“where”实现条件查询:  
```
 select * from ems where sal=6000;
```  
![MySQL Data Select Where](https://store.skylinebin.com/image/mysql/DataSelectWhere.png)  

也可以使用多字段条件查询:  
```
 select * from ems where sal=6000 and deptno = 1;
```  
![MySQL Data Select Where Multi](https://store.skylinebin.com/image/mysql/DataSelectWhereMulti.png)  

#### 4.3 排序和限制  
对数据库进行排序操作时，使用关键字 **“order by”** 来实现，其中 **desc** 是降序排列，**asc** 是升序排列，不说明情况下默认升序排列  
例如，按员工工资从低到高进行排序:  
```
 select * from ems order by sal;
```  
![MySQL Data Order](https://store.skylinebin.com/image/mysql/DataSelectOrder.png)  
先将员工按照员工编号进行排序，编号相同按照工资从高到低排序:  
```
 select * from ems order by deptno;
 select * from ems order by deptno, sal desc;
```  
![MySQL Data Order By Multi](https://store.skylinebin.com/image/mysql/DataSelectOrderBy.png)  
对排序后的记录，如果只想显示一部分，则可以使用关键字 **“LIMIT”**  
语法如下：  
```
 select ...[limit offset_start,row_count]
```  
其中 offset_start 是 **起始偏移量**，row_count 表示 **显示的行数**，默认起始偏移量为0，只需写入行数，有需求再添加起始偏移量  
查询工资最高的前三个员工：将员工按工资降序排列，只取前三条:  
```
 select * from ems order by sal desc limit 3;
```  
![MySQL Data Order By Limit](https://store.skylinebin.com/image/mysql/DataSelectOrderByLimit.png)  
如果从第二条记录开始的3条记录 就使用以下语句:  
```
 select * from ems order by sal desc limit 1,3;
```  
![MySQL Data Order By Limit Range](https://store.skylinebin.com/image/mysql/DataSelectOrderByLimitMulti.png)  

> Tips: limit 经常和 order by 一起配合使用来进行记录的分页显示。  

(limit 属于 MySQL扩展SQL92后的语法，其他数据库不一定通用)  

#### 4.4 聚合  
很多情况下都需要汇总聚合数据，可以使用SQL的聚合操作。  
聚合语法为:  
```
 select [field1,field2,...,fieldn] fun_name from tablename [where where_contition][GROUP BY field1,field2,...,fieldn [with rollup]] [having where_contition]
```  
其中：  
- fun_name 表示要做的聚合操作，也是聚合函数 ，常见的有sun(求和)，count（*）（记录数），max(最大值)，min(最小值)  
- GROUP BY 关键字表示要进行分类聚合的字段，比如按照部门统计员工数量，部门写在 group by 后面  
- with rollup 是可选，表明是否对分类聚合后的结果进行再汇总。  
- having 关键字表示对分类后的结果在进行条件的过滤  

> ps: having 与 where 的区别在于， having是对聚合后的结果进行条件的过滤，而 where 是在聚合之前就对记录进行过滤。  
> 并且！！！！ **在逻辑允许的情况下，尽可能用where先过滤记录**，<u>结果集减少将对聚合的效率大大提高</u> 再根据逻辑看是否用having进行再过滤。  

统计ems表中公司的总人数：  
```
 select count(1) from ems;
```  
![MySQL Data Count](https://store.skylinebin.com/image/mysql/DataSelectCount.png)  
在此基础上要统计各部门的人数：  
```
 select deptno,count(1) from ems group by deptno;
```  
![MySQL Data Count](https://store.skylinebin.com/image/mysql/DataSelectCountGroup.png)  
如果更细节一些，既要统计各部门员工人数，又要统计总人数 (使用 **with rollup** 进行 分类聚合 后再 汇总)：  
```
 select deptno,count(1) from ems group by deptno with rollup;
```  
![MySQL Data Count](https://store.skylinebin.com/image/mysql/DataSelectCountGroupWith.png)  
统计人数大于1人的部门：  
```
 select deptno,count(1) from ems group by deptno having count(1)>1;
```  
![MySQL Data Count](https://store.skylinebin.com/image/mysql/DataSelectCountGroupHaving.png)  

统计公司所有员工的薪水总额，最高和最低薪水：  
```
 select sum(sal),max(sal),min(sal) from ems;
```  
![MySQL Data Sum Max Min](https://store.skylinebin.com/image/mysql/DataSelectSumMax.png)  

#### 4.5 表连接  
当需要同时显示多个表中的字段时，就可以用表连接来实现这样的功能，表连接分为 **内连接** 和 **外连接**：  
- 内连接：仅选出两张表中互相匹配的记录  
- 外连接：会选出其他不匹配的记录  

常使用 *内连接*  
现有员工和部门两张表，想要查询所有员工及其所在部门，使用以下语句：  
```
 select * from ems;
 select * from dept;
 select ename,deptname from ems,dept where ems.deptno = dept.deptno;
```  
![MySQL Data Select From Multi Where Multi](https://store.skylinebin.com/image/mysql/DataSelectFromMultiWhereMulti.png)  

外连接又分为 **左连接** 和 **右连接** ：  
- 左连接：包含所有的左边表中的记录甚至是右边表中没有和它匹配的记录。  
- 右连接：包含所有的右边表中的记录甚至是左边表中没有和它匹配的记录。  

查询ems中所有用户名和所在部门名称(使用 **左连接**)：  
```
 select ename,deptname from ems left join dept on ems.deptno = dept.deptno;
```  
![MySQL Data Select From Left Join](https://store.skylinebin.com/image/mysql/DataSelectLeftJoin.png)  
上图有用户没有对应的部门名称，但使用左连接能够全部查出来  
同样，上面例子可以转换成 **右连接**：  
```
 select ename,deptname from dept right join ems on ems.deptno = dept.deptno;
```  
![MySQL Data Select From Right Join](https://store.skylinebin.com/image/mysql/DataSelectRightJoin.png)  

#### 4.6 子查询  
某些情况下，当进行查询时，需要的条件是从另一个select 语句的结果，此时就需要用到子查询。用于子查询的关键字主要包括 in、not in、=、！=、exists、 not exists 等。  
从ems表中查询出所有部门在dept表中的所有记录：  
```
 select * from ems where deptno in (select deptno from dept);
```  
![MySQL Data Select Where In](https://store.skylinebin.com/image/mysql/DataSelectWhereIn.png)  
如果子查询记录数唯一，还可以用 = 代替 in：  
```
 select * from ems where deptno = (select deptno from dept limit 1);
```  
![MySQL Data Select Where Same as](https://store.skylinebin.com/image/mysql/DataSelectWhereSameas.png)  
某些情况下，<u>**子查询可以转化为表连接**</u>：  
```
 select ems.* from ems,dept where ems.deptno = dept.deptno;
```  
![MySQL Data Select Where In change to Connect](https://store.skylinebin.com/image/mysql/DataSelectWhereInandConnect.png)  

#### 4.7 记录联合  
将两个表的数据按一定的查询条件查询出来后，将结果合并到一起显示出来，可以使用关键字 union 和 union all 来实现功能，具体的语法有:  
```
 select * from t1 union|union all select * from t2 union|union all select * from tn;
```  
**union** 和 **union all** 的主要区别是 union all 是把 结果直接合并在一起，而 union 是将 union all 后的结果进行一次distinct，去除重复记录后的结果。  
例如：将ems表和dept表中部门编号的集合显示出来:  
```
 mysql> select deptno from ems
    -> union all
    -> select deptno from dept;
```  
使用 union all 得到:  
![MySQL Data Select Union All](https://store.skylinebin.com/image/mysql/DataSelectUnionAll.png)  
使用 union 可以 **去掉重复记录**:  
```
 mysql> select deptno from ems
    -> union
    -> select deptno from dept;
```  
![MySQL Data Select Union](https://store.skylinebin.com/image/mysql/DataSelectUnion.png)  

***  

<br />  

### 三、DCL语句  

DCL语句主要是DBA用来管理系统中的对象权限时使用的语句，使用关键字grant 和 revoke 来授予和收回权限。  

例如：创建一个数据库用户test1，具有对 testbin 数据库中所有表的 select/insert 权限:  
```
 grant select,insert on testbin.* to 'test1'@'localhost' identified by '123';
```  
收回insert权限：  
```
 revoke insert on testbin.* from 'test1'@'localhost';
```  
可使用MySQL的帮助，使用 " **? contents** " 命令来显示所有可供查询的分类：  
```
 mysql> ? contents
```  
![MySQL Help Contents](https://store.skylinebin.com/image/mysql/DataMySQLContent.png)  
可以使用 " **? 类别名称** " 来针对感兴趣的内容详细查看：  
```
 mysql> ? data types
```  
![MySQL Help Data Types](https://store.skylinebin.com/image/mysql/DataMySQLDataType.png)  
例如 int 类型：  
```
 mysql> ? int
```  
![MySQL Help Data Type int](https://store.skylinebin.com/image/mysql/DataMySQLDataTypeInt.png)  
可以使用 " **show** " 快速查阅指令或者语法语句:  
```
 mysql> ? show
```  
![MySQL Help Show Data](https://store.skylinebin.com/image/mysql/DataMySQLShow.png)  
也可查看语法操作，会给出示例:  
```
 mysql> ? create table
```  
![MySQL Help Show Data Grammar](https://store.skylinebin.com/image/mysql/DataMySQLGrammar.png)  

常用相关网络资源：  
- http://dev.mysql.com/downloads MySQL官方网站，可下载各版本的MySQL  
- http://dev.mysql.com/doc 官方在线文档以及手册  
- http://bugs.mysql.com 可查看MySQL已发布的bug列表  

***  

<br />  

### 四、查询元数据信息  

在MySQL5.0之后，提供一个数据库information_schema，用来记录MySQL的 **元数据信息** 。  
元数据是指数据的数据，比如表名、列名、列类型、索引名等表的各种属性名称。  
**information_schema** 数据库是一个虚拟数据库，物理上不存在相关的目录和文件。  
```
 mysql> show databases;
 mysql> use information_schema;
 mysql> show tables;
```  
![MySQL Databases](https://store.skylinebin.com/image/mysql/Databases.png)  
![MySQL Databases information_schema](https://store.skylinebin.com/image/mysql/DatabasesInformationSchema.png)  
这些使用show查出来的表并不是实际存在的物理表，而全部是视图。  
```
 mysql> use information_schema;
 mysql> show tables;
 mysql> select * from TABLES;
```  
这里查询 information_schema 数据库中的TABLES表，<u>表中存放的是数据库中所有表的信息</u> (大概有很多)  
![MySQL information_schema Tables](https://store.skylinebin.com/image/mysql/DatabasesInformationSchemaTables.png)  

information_schema 数据库中的 **SCHEMATA表**，存放的是所有数据库的信息，"show databases;"指令的结果取自SCHEMATA表。  
```
 mysql> select * from SCHEMATA;
```  
![MySQL information_schema Tables SCHEMATA](https://store.skylinebin.com/image/mysql/DatabasesInformationSchemaTableSCHEMATA.png)  
还有COLUMNS表提供表的列信息，**STATISTICS表** 提供关于表 **索引** 的信息等等。  

MySQL数据库在 日常网站中用的很多，在存储用户信息时，很多都是要加密的，这里只放一张某一网站用户信息的数据流：  
![Website User Datalines](https://store.skylinebin.com/image/mysql/DatabasesDataLine.png)

***  

<br />  

本文一共用了 34 张图片展示在执行 相关 MySQL 指令后的返回结果，可以说是非常费心了。一方面可以方便自己以后直接查阅相关部分的使用指令；另一方面，也好给需要 MySQL 相关资料的人给出参考，后面遇到使用相关的基础问题，也可以补充上来。整理也不容易，继续学习吧。  
