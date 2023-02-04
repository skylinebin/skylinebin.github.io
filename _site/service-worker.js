                        importScripts("/assets/js/workbox-v3.6.3/workbox-sw.js");
            workbox.setConfig({modulePathPrefix: "/assets/js/workbox-v3.6.3"});

            self.__precacheManifest = [{"url":"/index.html","revision":"4d22c5ae1c4b7ad9c09429b1aae00162"},{"url":"/Summaryof2021/","revision":"1d58ff103c5fc7d2e469107a993f53cd"},{"url":"/Summaryof2020/","revision":"fadc5e807a2f098563dc337c8d5f7ebc"},{"url":"/SummaryofLastQuarter/","revision":"38ad1de6d7d3084b5d5e37db65fc06ab"},{"url":"/EnglishPaperWritingSkills/","revision":"520651156da0b559b1d60ef3601aaaa6"},{"url":"/Summaryof2019/","revision":"a2045c172e24ff6412f8a4b288f251f7"}];
            // service-worker.js 

// set names for both precache & runtime cache
workbox.core.setCacheNameDetails({
    prefix: 'Blog of SkylineBin',
    suffix: 'v1',
    precache: 'precache',
    runtime: 'runtime-cache'
});

workbox.skipWaiting();
workbox.clientsClaim();

workbox.precaching.precacheAndRoute(self.__precacheManifest);

workbox.routing.registerRoute(
    /\.html$/,
    workbox.strategies.networkFirst()
);

workbox.routing.registerRoute(
    /assets\/(img|icons)/,
    workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(
    /^https?:\/\/cloud.netlifyusercontent.com/,
    workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
    /^https?:\/\/cdn.staticfile.org/,
    workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
    /^https?:\/\/at.alicdn.com/,
    workbox.strategies.staleWhileRevalidate()
);
workbox.routing.registerRoute(
    /^https?:\/\/store.skylinebin.com/,
    workbox.strategies.staleWhileRevalidate()
);

