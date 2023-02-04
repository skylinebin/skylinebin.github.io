                        importScripts("/assets/js/workbox-v3.6.3/workbox-sw.js");
            workbox.setConfig({modulePathPrefix: "/assets/js/workbox-v3.6.3"});

            self.__precacheManifest = [{"url":"/index.html","revision":"4326376a6029c94054feed912d17eca4"},{"url":"/Summaryof2021/","revision":"23474821a830117eeee70dc457ce4992"},{"url":"/Summaryof2020/","revision":"ba3a9c5cc0caa60f00cbf654344976b7"},{"url":"/SummaryofLastQuarter/","revision":"772e5054972208ba44cd6550052f22a9"},{"url":"/EnglishPaperWritingSkills/","revision":"243ec645a587754c5c20e0c122c125c4"},{"url":"/Summaryof2019/","revision":"fea095e29a502a1b51c44447a7641337"}];
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

