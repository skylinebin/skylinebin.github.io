---
layout: post
title:  "浏览器中的缓存策略"
date:   2019-03-31 15:24:31
image: 'https://store.skylinebin.com/JavaScript.png'
description: 'Cache strategy in the browser'
tags:
- HTTP
- Cache
- Network
- FrontEnd
categories:
- SkylineBin
twitter_text: 'Cache strategy in the browser'
---  

## 浏览器中的缓存策略  

浏览器的缓存主要集中在HTTP的 "请求"(Request) 和 "响应"(Response) 中。  
- 在 Request 过程中，浏览器可以通过 Cache 的结果选择直接使用缓存，减少了HTTP请求的次数  
- 在 Response 过程中，服务器与浏览器之间存在校验和判断机制，也可以因缓存的存在而减少传输的资源，加快响应速度。  

按照缓存的存储位置可分为以下几类：  
- Service Worker  
- memory cache  
- disk cache
- network request  

上述四类缓存的顺序是按照优先级排列的，如果一项得到响应就不会再继续往下判断，这也是符合逻辑的。  
![日常使用过程中的三种读取缓存的实例](https://sdns.skylinebin.com//fromPicGo/AllKindsCaches.png)  

看到[百度的 小蘑菇哥哥](https://juejin.im/user/5c19c42a6fb9a04a102f3a30) 同学将传统讲浏览器缓存 header 中的字段全部并为 disk cache 这一个存储位置内，觉得挺有意思的。先理清大类，等涉及到细节的时候再讲原理。


### Service Worker 
因为 Service Worker 是要在启用了服务的页面才会出现，所以需要在注册 serviceWorker 页面中找到，例如 使用了 Google 的 PWA(渐进式Web应用) 页面中都可以发现。[Service Worker 实例](https://googlechrome.github.io/samples/service-worker/basic/index.html)、[有韦二姐参与的微博PWA](https://m.weibo.cn/)  

Service Worker 是**一个注册在指定源和路径下事件驱动的独立线程**，采用 JavaScrip t控制关联的页面或者网站资源，拦截并修改访问和资源请求，更精细地缓存资源。  
Service Worker 可以拦截请求，所以需要使用 HTTPS 协议，Service Worker 的缓存是永久性的，关闭浏览器打开还是存在，除了手动调用API清除以及存储容量超过限制被清除外，一般都能持续存在。  

Service Worker 使用之前需要先注册，在注册成功后浏览器会尝试为页面安装并激活ServiceWorker，在安装过程需要缓存一些静态资源(使用 cache 全局对象存储响应收到的资源)。  

后续的HTTP请求都会被 Service Worker 拦截，如果请求的资源是 Service Worker控制的，**都会触发 fetch 事件**，在处理 fetch 事件过程中，可以使用 caches.match(event.request) 来对网络请求的资源和 cache 里可获取的资源进行匹配，查看是否缓存中有相应的资源，如果匹配到缓存中的资源直接使用。如果没有在缓存中找到匹配的资源，可以控制浏览器对着资源直接去 fetch 默认的网络请求。具体过程如下图所示：  
![ServiceWorker 中的 fetch](https://sdns.skylinebin.com//fromPicGo/ServiceWorker-fetch.png)  
整个过程中，即使最后请求了网络资源，只要通过了 Service Worker的 fetch 事件，网络请求均会包括 from ServiceWorker。  


### memory cache  
memory cache 是内存中的缓存，在尝试读取本地缓存时，总是先读内存，再读硬盘，毕竟访问内存更快。  

几乎所有的请求资源都可以放入 memory cache ，与 memory cache 相关的机制有 preloader 和 preload 两种：  
- preloader 浏览器在解析和执行 JavaScript 和 CSS 资源时，可以使用 preloader 机制请求下一批资源，然后放入 memory cache 中，供以后解析和执行这些资源时使用。    
- preload 可以显式指定需要预加载的资源，也是放入 memory cache 中供后续使用  

一个页面中如果有很多个相同的请求，memory cache 的机制可以保证实际只会最多被请求一次，可以减少HTTP请求的资源浪费。  

memory cache 在匹配缓存资源时，处理对比资源的 URL 外，还会对比Content-Type，CORS域名规则等其他特征，只有完全一样的资源请求才会被匹配。  
memory cache 缓存的资源，在标签页关闭后就会失效，只是一个 **短期存储**。如果内存中缓存的资源过多，也会提前失效。  
memory cache 获取资源时，浏览器会忽视 HTTP 的头部配置，例如 max-age=0, no-cache 等，即使设置的意思表示不缓存，下次请求还是先从 memory cache 中读取资源。**只有头部使用 no-store 时**，memory-cache 不会存储资源，需要直接从服务器获取。  

### disk cache
disk cache 也成为 HTTP cache，是存储在硬盘上的缓存，是持久存储的。存储在设备的文件系统中，支持跨会话和跨站点等等。disk cache 会严格依照 HTTP 头信息的各类字段来判定资源是否可以缓存，是否可用等等。如果可用，直接从硬盘读取资源，比从服务器下载快很多。  
HTTP 协议中关于缓存的字段有：Cache-Control、Expires、Last-Modified&If-Modified-Since 和 ETag&If-None-Match 等。  

#### Cache-Control  
Cache-Control 字段表示资源缓存的最大有效时间，以及允许缓存的程度等，主要包含以下常用的字段：  
- max-age: 设置缓存最大的有效时间 (max-age=86400 表示缓存24小时)  
- s-maxage: (设置共享缓存最大的有效时间)  
- public: 指定响应会被缓存，并且在多用户间共享(多个浏览器可以读取此缓存)  
- private: 响应只作为私有的缓存，不能在用户间共享  
- no-cache: 指定不缓存响应，使用资源副本前，一定要到源服务器进行副本有效性校验  
- no-store: 绝对禁止缓存，每次请求资源都要从服务器重新获取  
- must-revalidate: 本地资源过期前，可以使用本地资源；本地缓存资源一旦过期，必须去源服务器进行有效性校验(max-age=0,must-revalidate  与 no-cache 等价)  

以上几个字段的用法以及混合使用的优先级如下图所示：  
![Cache-Control 字段优先级](https://sdns.skylinebin.com//fromPicGo/http-cache-decision-tree.png)  


#### Expires  
 Expires 表示缓存过期时间，用来指定资源到期的时间，通常 Expires = max-age + 请求时间，需要和Last-modified结合使用

Cache-Control 和 Expires 都属于**强缓存**，即不会向服务器发送请求，直接从缓存中读取资源，在调试的Network选项中可以看到该请求返回200的状态码，并且Size显示from disk cache或from memory cache。

Cache-Control 的优先级 高于 Expires，实际使用过程中 Cache-Control 字段 和 Expires 字段都会使用。  


与 强缓存对应的是 **协商缓存**，即强制缓存失效后，浏览器携带缓存标识向服务器发起请求，由服务器根据缓存标识决定是否使用缓存的过程。主要包括 Last-Modified 和 ETag。  


#### Last-Modified  
**服务器端资源文件的最后修改时间**，需要和 Cache-Control 共同使用，可用于检查服务器端资源是否更新。(当浏览器再次进行请求时，会向服务器传送 **If-Modified-Since**报头(上次的Last-Modified)，询问Last-Modified时间点之后资源是否被修改过。如果没有修改，则返回码为304(Not Modified)，使用缓存；如果修改过，则再次去服务器请求资源，返回码和首次请求相同为200，资源为服务器最新资源)  

使用 Last-Modified 来判断文件是否更改存在一定的缺陷：  
- 某些服务器不能精确得到资源的最后修改时间，这样就无法通过最后修改时间判断资源是否更新  
- 如果资源修改非常频繁，Last-modified只能精确到秒  
- 一些资源的最后修改时间改变了，但是内容没改变，导致重复请求资源


#### ETag  
ETag 是根据实体内容生成一段hash字符串，标识资源的状态，由服务端产生，服务器端也存储文件的 Etag字段。(当浏览器再次进行请求时，会向服务器传送 If-None-Match 字段(上次的文件的 hash)，询问资源的hash是否相同，判断文件是否被修改过。如果没有修改，则返回码为304(Not Modified)，使用缓存；如果修改过，则再次去服务器请求资源，返回码和首次请求相同为200，资源为服务器最新资源)  

ETag 的优先级高于 Last-Modified。  

### HTTP Cache 工作流程  
HTTP Cache 的工作流程如下图所示：  

![](https://sdns.skylinebin.com//fromPicGo/HTTPCache.png)  

判断是否有缓存后，如果有就进行强缓存判断，如果不能直接使用就进行协商缓存过程，最终实现资源的获取。  


### 参考文献  
- [AlloyTeam 浅谈Web缓存](http://www.alloyteam.com/2016/03/discussion-on-web-caching/)  
- [一文读懂前端缓存](https://juejin.im/post/5c22ee806fb9a049fb43b2c5?utm_source=gold_browser_extension) 
- [深入理解浏览器的缓存机制](https://github.com/ljianshu/Blog/issues/23)  
- [web性能优化之：no-cache与must-revalidate深入探究](https://www.cnblogs.com/chyingp/p/no-cache-vs-must-revalidate.html)  
- [RFC 2616 14.9](https://tools.ietf.org/html/rfc2616#page-108)  
- [怎么使用 Service Worker](https://lavas.baidu.com/pwa/offline-and-cache-loading/service-worker/how-to-use-service-worker)  
- [MDN Service Worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API/Using_Service_Workers)  
- [Who's Afraid of the Big Bad Preloader?](https://calendar.perfplanet.com/2013/big-bad-preloader/)  
- [《HTTP 权威指南》(第7章)](https://book.douban.com/subject/10746113/)  


