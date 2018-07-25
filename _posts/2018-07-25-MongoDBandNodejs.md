---
layout: post
title:  "MongoDB与Node.js相关应用"
date:   2018-07-25 23:30:31
description: 'Using MongoDB in Node.js'
tags:
- MongoDB
- Database
- Nodejs
- BackEnd
categories:
- SkylineBin
twitter_text: 'MongoDB使用及Node.js中应用的注意事项 '
---

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;最近使用 Node.js + MongoDB 为一个预约管理系统写了一些后台和数据库，遇到了挺多问题，借此记录一下解决的问题以及 MongoDB 常用的注意事项。所涉及的源码，等整理后再放在 Github 上。  




## MongoDB数据库的安装与创建  


&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;项目部署在 Ubuntu 系统中，使用 node.js 里的 pm2 发布和 nginx 映射。所以简要提一下安装 MongoDB 和配置的过程。在 Ubuntu 系统中安装配置MongoDB:  

```
sudo apt-get install mongodb-server mongodb -y

sudo mongod --version
sudo mongo --version

```

安装好 MongoDB 数据库的服务端，并查看版本，指定数据存储和日志存储 log 的路径：  

```
sudo mkdir -p /data/mongodb
sudo mkdir -p /data/logs/mongodb

sudo mongod --fork --dbpath /data/mongodb --logpath /data/logs/mongodb/webapp.log
// 启动 mongodb 数据库服务

netstat -ltp | grep 27017

```

通过 netstat 检查 mongodb 是否启动成功，27017端口是否在监听。启动成功后，可以创建数据库并创建账户了，使用以下指令：  

```
sudo mongo
// 打开 MongoDB  命令行连接

> use project;
> db.createUser({ user: 'app', pwd: 'admin', roles: ['dbAdmin', 'readWrite']});

```

以上指令 创建了 project 数据库，并为数据库添加了 一个用户名 app ,密码 admin 的账户。  

<br />

## MongoDB数据库的增删改查  

### 1.创建表并插入查找数据  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MongoDB 数据库使用起来比较随意，对表格操作是这样的：如果你原来没有这张表，执行插入语句前先创建一张表再插入数据。如果原来有对应名称的表，就直接在表中插入数据。  

```

> db.test.insert({name:'user',year:'2018',num:'1',state:0,remark:''});

```

上述指令会 创建一张名为 test 的表，并插入 数据，查询指令：  

```
> show tables;
test
> db.test.find()
{ "_id" : ObjectId("5b58a0c52ee301c0cfd016da"), "name" : "user", "year" : "2018", "num" : "1", "state" : 0, "remark" : "" }

```

使用 insert 再多插入几条数据，查看数据，并格式化，显示效果为：  

```shell

> db.test.find()
{ "_id" : ObjectId("5b58a0c52ee301c0cfd016da"), "name" : "user", "year" : "2018", "num" : "1", "state" : 0, "remark" : "" }
{ "_id" : ObjectId("5b58a1712ee301c0cfd016db"), "name" : "root", "year" : "2017", "num" : "1", "state" : 0, "remark" : "" }
{ "_id" : ObjectId("5b58a1882ee301c0cfd016dc"), "name" : "admin", "year" : "2015", "num" : "1", "state" : 0, "remark" : "" }
{ "_id" : ObjectId("5b58a2102ee301c0cfd016dd"), "name" : "scott", "year" : "2017", "num" : "1", "state" : 0, "remark" : "" }
> db.test.find().pretty()
{
        "_id" : ObjectId("5b58a0c52ee301c0cfd016da"),
        "name" : "user",
        "year" : "2018",
        "num" : "1",
        "state" : 0,
        "remark" : ""
}
{
        "_id" : ObjectId("5b58a1712ee301c0cfd016db"),
        "name" : "root",
        "year" : "2017",
        "num" : "1",
        "state" : 0,
        "remark" : ""
}
{
        "_id" : ObjectId("5b58a1882ee301c0cfd016dc"),
        "name" : "admin",
        "year" : "2015",
        "num" : "1",
        "state" : 0,
        "remark" : ""
}
{
        "_id" : ObjectId("5b58a2102ee301c0cfd016dd"),
        "name" : "scott",
        "year" : "2017",
        "num" : "1",
        "state" : 0,
        "remark" : ""
}

```  

所以使用 **.pretty()** 进行数据格式化。查找语句写在 find() 括号里面。例如，查找 year=2017 的数据，使用：  
```shell

> db.test.find({"year":"2017"})
{ "_id" : ObjectId("5b58a1712ee301c0cfd016db"), "name" : "root", "year" : "2017", "num" : "1", "state" : 0, "remark" : "" }
{ "_id" : ObjectId("5b58a2102ee301c0cfd016dd"), "name" : "scott", "year" : "2017", "num" : "1", "state" : 0, "remark" : "" }

```

<br />

### 2.修改MongoDB数据库数据  

MongoDB 中使用 update 相关指令对数据库中符合某些条件的数据进行更改。例如，将 name=root 的那条数据里的 num 改为 5 ，可使用:  

```shell

> db.test.update({"name":'root'},{$set:{"num":"5"}});
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.test.find({"name":"root"})
{ "_id" : ObjectId("5b58a1712ee301c0cfd016db"), "name" : "root", "year" : "2017", "num" : "5", "state" : 0, "remark" : "" }

```

在对已有表进行操作时，常常需要对现有字段进行更改。比如插入一个新字段，可以使用：  

```shell

> db.test.update({},{$set:{month:"3"}},{multi:5});
WriteResult({ "nMatched" : 4, "nUpserted" : 0, "nModified" : 4 })
> db.test.find()
{ "_id" : ObjectId("5b58a0c52ee301c0cfd016da"), "name" : "user", "year" : "2018", "num" : "1", "state" : 0, "remark" : "", "month" : "3" }
{ "_id" : ObjectId("5b58a1712ee301c0cfd016db"), "name" : "root", "year" : "2017", "num" : "5", "state" : 0, "remark" : "", "month" : "3" }
{ "_id" : ObjectId("5b58a1882ee301c0cfd016dc"), "name" : "admin", "year" : "2015", "num" : "1", "state" : 0, "remark" : "", "month" : "3" }
{ "_id" : ObjectId("5b58a2102ee301c0cfd016dd"), "name" : "scott", "year" : "2017", "num" : "1", "state" : 0, "remark" : "", "month" : "3" }

```

为该表中的每一条记录都加入一个 month 字段，并设置最大长度为5。  
如果想要修改字段的名字，也可以使用 update 加上 remae，例如:  

```shell

> db.test.update({}, {$rename : {"num" : "nums"}}, false, true)

```

可将 字段 num 修改 为 nums 。删除一个字段可以理解为将字段修改为空，即：  

```shell

> db.test.update({},{$unset:{'remark':''}},false, true)

```

可删除 remark 字段。  

MongoDb 中修改 表的 名称可以使用以下指令：  

```shell

> db.test.renameCollection("testTable")

```

即可将原有的 test 表 修改 为 testTable 表。  


### 3.删除MongoDB数据库数据  

MongoDB 数据库中使用 remove 完成删除符合相关条件的数据。例如，删除 year=2015 的数据，可以写成：  

```shell
> db.test.remove({"year": "2015"})
WriteResult({ "nRemoved" : 1 })
> db.test.find()
{ "_id" : ObjectId("5b58a0c52ee301c0cfd016da"), "name" : "user", "year" : "2018", "num" : "1", "state" : 0, "remark" : "", "month" : "3" }
{ "_id" : ObjectId("5b58a1712ee301c0cfd016db"), "name" : "root", "year" : "2017", "num" : "5", "state" : 0, "remark" : "", "month" : "3" }
{ "_id" : ObjectId("5b58a2102ee301c0cfd016dd"), "name" : "scott", "year" : "2017", "num" : "1", "state" : 0, "remark" : "", "month" : "3" }

```



### 4.MongoDB数据库其他常用指令  

查找的返回数据按指定规则排序，使用 find() 与 sort() 组成 的语句完成。例如按照 year 的升序的查找语句:  

```shell

> db.test.find().sort({"year": 1})
{ "_id" : ObjectId("5b58a1712ee301c0cfd016db"), "name" : "root", "year" : "2017", "num" : "5", "state" : 0, "remark" : "", "month" : "3" }
{ "_id" : ObjectId("5b58a2102ee301c0cfd016dd"), "name" : "scott", "year" : "2017", "num" : "1", "state" : 0, "remark" : "", "month" : "3" }
{ "_id" : ObjectId("5b58a0c52ee301c0cfd016da"), "name" : "user", "year" : "2018", "num" : "1", "state" : 0, "remark" : "", "month" : "3" }

```

此时返回的结果就是 升序的结果。使用 **1** 和 **-1** 来指定查询结果的排序问题。1 为升序排列，而 -1 是用于降序排列。  

在对数据库进行操作时，有时后并不需要返回所有的字段，所以查询时可以指定返回部分字段。例如:  

```shell

db.test.find({}, {name: 1, by: 1}) // inclusion模式 指定返回的键，不返回其他键
db.test.find({}, {name: 0, by: 0}) // exclusion模式 指定不返回的键,返回其他键

> db.test.find({}, {name: 1, by: 1})
{ "_id" : ObjectId("5b58a0c52ee301c0cfd016da"), "name" : "user" }
{ "_id" : ObjectId("5b58a1712ee301c0cfd016db"), "name" : "root" }
{ "_id" : ObjectId("5b58a2102ee301c0cfd016dd"), "name" : "scott" }
> db.test.find({}, {name: 0, by: 0})
{ "_id" : ObjectId("5b58a0c52ee301c0cfd016da"), "year" : "2018", "num" : "1", "state" : 0, "remark" : "", "month" : "3" }
{ "_id" : ObjectId("5b58a1712ee301c0cfd016db"), "year" : "2017", "num" : "5", "state" : 0, "remark" : "", "month" : "3" }
{ "_id" : ObjectId("5b58a2102ee301c0cfd016dd"), "year" : "2017", "num" : "1", "state" : 0, "remark" : "", "month" : "3" }

```

数据库操作时常常会用到聚合，MongoDB中使用 aggregate 完成聚合操作。例如，需要统计 test 表中 year 的数据种类及对应的数目，可以使用：  

```shell

> db.test.aggregate([{$group : {_id : "$year", num : {$sum : 1}}}])
{ "_id" : "2017", "num" : 2 }
{ "_id" : "2018", "num" : 1 }

```

需要注意的是，上面的 _id 似乎是必须的。  
类似sql语句： select by_year, count(*) from test group by by_year  
除了可以使用 sum 记录总数外，还有 min, max, avg 也可经常用到。  

如果 MongoDB 数据库中一张表的某个字段存储的有对象，查找 符合对象的某个属性的语句可以写成:  

```shell

> db.userinfo.find({"userobj.openId": "oQVMW0Qu4K3-KB_x5C0IUpHATRUg"})

```

以上可以查找 userinfo 表里 字段 userobj 存储的对象里 属性 openId = "oQVMW0Qu4K3-KB_x5C0IUpHATRUg" 的数据。

<br />  

## MongoDB数据库与Node.js结合使用  

在Node.js 中对 MongoDb 数据库操作 需要引入需要的 npm 安装的包。

```shell

sudo npm install mongodb connect-mongo

```

根据需求查找安装对应的包是必要的。Node.js中正常操作连接查询 MongoDB 数据库用到的代码有：  

```javascript

const MongoClient = require('mongodb').MongoClient;

const config = require('./config'); 
const mogourl = `mongodb://${config.mongoUser}:${config.mongoPass}@${config.mongoHost}:${config.mongoPort}/${config.mongoDb}`;

MongoClient.connect(mogourl, function(err, db) {
if (err) throw err;
var dbo = db.db('project');
dbo.collection("test").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();

    });
});


```
使用 config 中 MongoDB 数据库的配置，config.js 文件中，MongoDB 相关的配置可以写成：  

```javascript

module.exports = { 

    mongoHost: '127.0.0.1', 
    mongoPort: '27017', 
    mongoUser: 'app', 
    mongoPass: 'admin', 
    mongoDb: 'project'
};

```

针对 MongoDB 中的一些特殊情况,有时候需要定义指定的参数。例如，MongoDB 数据库中的 id 字段 "_id" 是一个 ObjectId 对象，所以查找 _id 相关的值时，需要定义对象。

```javascript

const ObjectId = require('mongodb').ObjectId;

    static findtestbyID(testID,callback){
        const thistestID = testID;
        console.log("find testID:",thistestID);
        MongoClient.connect(mogourl, function(err, db) {
        if (err) throw err;
        var dbo = db.db('project');
        dbo.collection("test").find({"_id": ObjectId(thistestID)}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
            callback(result);
            });
        });
     }

```

在 Node.js 想要根据查询的结果 进行下一步操作，就需要 使用回调 callback , 在调用时直接根据返回结果处理后续业务。  

<br />

## 远程连接MongoDB数据库注意事项  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;有需求需要在 Windows 中访问位于云服务器 Ubuntu 系统里的 MongoDB 数据库，首先需要在 Windows 中安装 MongoDB 数据库，这个就不细说。但是安装好后，加入到环境变量后，管理员启动命令行，输入 mongo ,提示连接本地数据库失败。报错为：  

```

connecting to: mongodb://127.0.0.1:27017
2018-07-13T16:02:10.341+0800 W NETWORK  [thread1] Failed to connect to 127.0.0.1:27017 after 5000ms milliseconds, giving up.
2018-07-13T16:02:10.341+0800 E QUERY    [thread1] Error: couldn't connect to server 127.0.0.1:27017, connection attempt failed :
connect@src/mongo/shell/mongo.js:381:13
@(connect):1:6
exception: connect failed

```

遇到这种问题很大可能是，MongoDB 数据库服务没有启动，Windows 命令行中，使用以下指令：  

```shell

net start MongoDB

```

可以启动本地数据后，需要连接远程数据库，一般只需要连接指定 ip 的 27017 端口上的数据库即可，但是 Ubuntu 系统中安装的 MongoDB 默认只能本地访问，需要更改 mongodb.conf 里的配置。打开位于 /etc/mongodb.conf 的文件，修改内容如下：  

```


#bind_ip = 127.0.0.1
bind_ip = 0.0.0.0

auth = true

```

将 bind_ip 改成 0.0.0.0 ，由于打开了 auth, Ubuntu 本地访问数据库 也变成了以下指令:  

```shell

sudo mongo 127.0.0.1:27017/project -u app -p admin

```

Windows 下远程访问 使用的 指令为命令行输入：  

```shell

mongo ***.***.***.***:27017/project -u app -p admin

```

远程连接上数据库后，可进行的操作与在 Ubuntu 中差别不大了，远程也可以对数据库进行到处备份到指定路径：  

```shell

mongodump -h ***.***.***.***:27017 -u app -p admin -d project -o E:\path\project

```

导出后，文件夹里会生成压缩包，每张表都以 .json 和 .bson 的格式进行保存，也可指定格式对数据进行导出。  


<br />

后面遇到 MongoDB 操作的问题，还会继续补充。

