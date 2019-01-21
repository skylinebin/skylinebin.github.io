---
layout: post
title:  "英语会议期刊论文写作技巧"
date:   2018-09-24 23:02:31
description: 'Summary some skills of writing English papers'
tags:
- Summary
- Papers
- Academia
- English
categories:
- SkylineBin
twitter_text: 'Summary some skills of writing English papers '
---  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;最近开始着手毕业需要的论文了，虽然思绪还是有一些不清晰，但整体的模型应该算是基本确定下来了，也不能一直看论文，正好实验室读博的学长推荐了一个关于英文论文写作的良心 up 主，看了一部分他提到的英文论文写作技巧(规范)，又结合专业英语时导师讲的一部分内容，整理一下整体的流程和思路，也为后面写作打一点基础。  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;其实，一开始看这个写 SCI 系列的视频，我是被这一系列视频的展开逻辑和呈现形式所吸引的。毕竟 SCI 论文也不好发，打着这个名头要有对应的价值。整个系列视频逻辑清晰，形式更像是先写板书后期再配音上去的，并且该加速的时候视频本身已经给加速了。很多东西写出来之后来理解真的会很清晰很多，很多干货满满的技术贴也是一样。图文并茂，逻辑清晰，重点突出，易于理解的文章总是会受欢迎的，看来呈现自己观点和理解的文字还是要练习，还有很多很多优秀的人值得学习。本篇文章记录的顺序基本和系列视频一致，从陈述事实到基于这个事实展开的一篇论文的写作，尽量做到保留原系列视频的逻辑清晰的高度。  


## Facts 事实  

1. 论文结构(Paper Structure)  
- 题目 Title  
- 摘要 Abstract  
- 引言/文献综述 Introduction/Linterature Review  
- 研究方法 Method  
- 结果/讨论 Result/Discussion  
- 结论 Conclusion  
- 参考文献 Reference  


2. 行文顺序  

| 编号 | 第一步 | 第二步 | 第三步 | 第四步 | 第五步 | 第六步 | 第七步 |  
| :--: | :---: | :----: | :----: | :----: | :----: | :----: | :----: |  
| 1 | Start | - | - | - | - | - | - |  
| 2 | - | Method | - | - | - | - | - |  
| 3 | - | - | Result/Discussion | - | - | - | - |  
| 4 | - | - | - | Conclusion | - | - | - |  
| 5 | - | - | - | - | Introduction | - | - |  
| 6 | - | - | - | - | - | Title | - |  
| 6 | - | - | - | - | - | Abstract | - |  
| 7 | - | - | - | - | - | - | End |  



3. 投稿后的流程  

```flow  

st=>start: 作者投稿  
e=>end  
cond1=>condition: 管理员是否收稿  
op1=>operation: 主编(EIC)指派责编(AE)  
op2=>operation: 责编(AE)初审寻找Reviewer  
op3=>operation: 多个Reviewer对论文给出评语  
op4=>operation: AE总结评审意见反馈给作者  
op5=>operation: 作者各种修改，再提交到AE
cond2=>condition: 主编决定是否接收该稿件  
op6=>operation: 主编分配校对及版权交接  
op7=>operation: 出版  


st -> cond
cond1(是)->op1 ->op2 ->op3->op4->op5 ->cond2  
cond1(否)->e
cond2(接收)-> op6 -> op7 ->e
cond2(拒绝)-> e

```


4. 文章的主观印象体现  
- Figures & Tables 有冲击力的图 以及信息充实的表  
- Reference 符合标准的参考文献;高质量以及要有最新的参考文献  



## Introduction 引言  

引言部分主要回答两个问题：  
- ① **What is the Research Topic?**  (需要将一个故事)  
- ② **What is the Motivation?**  (研究动机是什么？)  

以上两个问题主要是要达到 **自圆其说**，建立一个逻辑体系来引导读者。第一个问题是为了说明你研究的重要性，第二个问题是为了填补研究的空白。  
引言部分需要从以下三个方面入手：  
- a. Background Information 背景  
- b. Literature Review 文献综述  
- c. Thesis Statement 课题要点  
a. 研究背景需要从宽泛的地方慢慢引出要研究的话题，可以用数据来陈述现象  
b. 文献综述部分，需要用别人的成果引出空白，后面自己的研究是为了填补空白  
c. 课题内容部分，主要提前讲述一下本文研究的主要内容，并给出整个文章的结构  

Tips:  
- 1. 需要近期的参考文献 (5~10以内)  
- 2. 需要合适的文献 (整个流程是为了建立逻辑观，引导读者进入逻辑观)  
- 3. 最好要有'好看'的图表 (主要要加引用)  
- 4. 整个引言部分要有 10% 的篇幅  


## Methodology 研究方法  

这部分可能好写，也可能不好写。好写体现在，总有东西可以说，可以当作记录整个研究过程的'流水账'。不好写体现在，需要紧紧围绕着**研究内容**来写，要有自己的贡献。  
主要包括以下几个内容：  
- 理论：推导过程  
- 实证：调查方法，数据处理  
- 工程应用：理论->实践  

这部分的主旨(目的)：**向读者解释说明作者是如何得到结果的**  
隐含的意思是：在条件允许的情况下，读者可以重现结果(包括 **数学模型**、**模拟结果**以及**实验结果**)  
论文中要提供*足够的*、*准确的* **技术细节**，要有简介、清晰的**逻辑表达**。  
其中：  
- 数学模型：1.要做什么？; 2.罗列假设; 3.建立系统动态模型  
- 数学方法：1.提出使用方法; 2.对效果进行分析  
- 实验条件：1.交代实验的环境  

Tips:  
- 1. 符号命名的**一致性** 可以建立符号表格; 符号第一次出现，要给出解释; 公式下面需要一小段内容对公式中出现的符号进行描述和解释  
- 2. 公式的编号要连续且规范 注意检查公式编号的准确性  
- 3. 不要灌水 无关内容 和 基础内容 不要往论文里面写  

其中第一点和第二点不注意，会导致论文直接被 拒收。  


## Result & Discussion 结果与讨论  

这部分是论文的**核心**，也是体现一个人学术水平的部分。  
一样的研究结果，不同的人在表达与讨论上是差异巨大的。(影响因素：科研经历，包括阅读、写作以及科学训练)  
一般可以使用以下三步(结果 + 讨论)的方式完成：  
- S1.描述结果：分为 **视觉**(图和表) 和 **语言**，语言可以包括 定量描述 和 定性描述  
- S2.分析结果：主要包括 **论证** 和 **对比**  
- S3.讨论结果：**意义**(结果如何验证论文的贡献)、**展望**(对未来研究工作的展望)、**猜想**(对结果出现的问题给出合理的猜想，记得自圆其说)  

感觉这一部分很容易被人忽视，还是要多积累，多练啊。妙笔生花，点石成金的技能，无论从事什么职业，都会有助于自己的发展的。  


## Figure & Table 图与表  

很重要：1.第一时间浏览；2.影响第一印象  
所以，容易出错的部分，一定要仔细检查，在Reviewer指出问题前解决掉  
需要注意的地方主要有以下九点：  
- 1. 认真阅读 Author's Guide  注意模版中 图与表的格式以及要求  
- 2. 所有的图标都 **必须在文中提到** ，特别注意要检查 Introduction 中的部分概念图  
- 3. Refer to Number，文中的图与表的编号一定要保持一致并符合要求  
- 4. Consistency 一致性 图表中的表达方式要与论文中一致 (论文中符号用什么，表格中符号用什么)  
- 5. 标题 Caption 图 与 表 的标题都要 **清晰**、**准确**、**完整** (不要担心过长，力求解释清楚)  
- 6. 用**颜色**和**图例**区分多数据 图例和颜色都要有 (不要试图隐藏不好的结果，可以分享出来一起讨论)  
- 7. 使用副标题 (如果多个图对比时) Fig.7 xxxxx....(a).xxxxxx and (b).xxxxxxxxx  
- 8. 杜绝一图多投 每幅图在投不同杂志时要做简要修改 (不要给未来的自己找麻烦)  
- 9. 保留原始数据(图对应的数据) 审稿人提问题时，可能会用到  

图和表都很重要，还有使用 Visio 画的图也很重要，记得导出成图片再插入到论文中。  



## Conclusion 结论 Abstract 摘要 Title 题目  

### 1. Conclusion 结论  
结论部分 应该是对 Result & Discussion 部分的总结，可以使用：  
Start with: This paper investigate (Topic) using (Method)...  
要注意以下几点：  
- 1. 不要重复 Result  
- 2. 应该将 Result & Discussion 汇总 (Discover 发现， Extension 拓展， Future Plan 未来)  
- 3. 不要 Copy & Paste  
- 4. 需强调 Contribution, 与 Introduction 对应  

### 2. Abstract 摘要  
题目和摘要是 **搜索引擎返回的内容**，应拒绝文不对题(学术文章需要严谨)  

    > 摘要 = 摘取 + 要点  

摘要一般包括以下几点：  
- 1. 摘取 引言 Introduction 部分 (3 sentences => 为了引出研究话题，强调研究的重要性)  
- 2. 摘取 研究方法 Method 部分 (1 or 2 sentence)  
- 3. 摘取 结果与讨论 R&D 部分 (**Most** Important Result)  
- 4. 摘取 结论 Conclusion 部分 (**Rewrite** 强调论文的贡献)  

上面四点中，2,3 主要是为了说明这篇论文**做了什么**，1,4 主要是将这篇论文的**贡献和重要性**  


### 3. Title 题目  
一篇论文的题目应该包括以下三部分：  
- 1. 研究内容 Topic  
- 2. 研究方法 Method  
- 3. 结果及隐含的意义 Improvement/Reduce  

题目应该包含所有的**关键词**  



## Respond to Reviewer's Comments 回复审稿人意见  

### 回复审稿人意见的要点  
1.调整心态：休息一天  
- 有 > 50%的成功机会 (Is peer review just a crapshot?)  
- 审稿人是你的朋友，而不是你的敌人  

2.逐一回答**每一条**审稿意见  

3.**清晰直接** 地标明文章中所有的修改  
- highlighted in yellow

4.礼貌、客气  
- peer review 没有报酬，懂得感激编委和评审的时间 (The co-authors and I would like to thank you for the time and effort spent in reviewing the manuscript)  
- 同意：表示赞同 (The authors would like to thank the reviewer) 要真诚  
- 不同意：委婉表达，尽量不要怼回去  


还是待我发完论文再从草稿转至 Post 吧，未完待续......


## 感谢  

感谢制作视频的 Up 主提供这个了解优秀博士的机会，虽然自己将来并不会走上学术的道路，不会读博。硕士一场，也算初窥做研究这门学问，能够了解学习优秀博士的思维方式甚感荣幸。  
从这几期视频内容透露的信息，结合 Google 和 LinkedIn，我找到的视频中提到的几位学长学姐，下面是他们的 Google 学术的个人主页 以及 LinkedIn 的个人页面:  
- Up主Thomas : [GoogleScholar Tianwei(Thomas) Wang](https://scholar.google.com/citations?user=k2vKv9AAAAAJ&hl=en)、[Tianwei(Thomas) Wang](http://www.linkedin.com/in/thomas-tianwei-wang/)  

- Dr.Tao : [GoogleScholar Xinran(william) Tao](https://scholar.google.com/citations?user=iL-tTJ8AAAAJ&hl=en)、[xinran tao](https://www.linkedin.com/in/xinran-tao-2a94868a/)  

- Dr.Zhu : [GoogleScholar Jingyi Zhu](https://scholar.google.com/citations?user=dutepS4AAAAJ&hl=en)、[Jingyi Zhu](https://www.linkedin.com/in/jingyi-zhu/)  

放上几位学长学姐的信息，是为了表达自己真心的感谢，毕竟并没有多少人会提示我们逻辑意识的重要性，再次感谢，希望早日也能向上述的学长学姐一样，达到妙笔生花的地步。(几位学长学姐如果机缘巧合看到了这篇总结，感觉这些信息放在这里不合适，可以留言联系我删除呀~)  


## 参考  

1. [写一篇高水平的工程类英文论文](https://space.bilibili.com/230105574/#/channel/detail?cid=45741)  
2. [Is peer review just a crapshoot?](https://www.elsevier.com/connect/is-peer-review-just-a-crapshoot)



