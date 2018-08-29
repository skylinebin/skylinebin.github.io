                        importScripts("/assets/js/workbox-v3.3.1/workbox-sw.js");
            workbox.setConfig({modulePathPrefix: "/assets/js/workbox-v3.3.1"});

            self.__precacheManifest = [{"url":"/index.html","revision":"e1de102e64373500a1a148b66dcbc0e2"},{"url":"/SummaryThisSummer/","revision":"8d6c65b1772a27fe66e1463142f6c60c"},{"url":"/JavaScript%E8%BF%AD%E4%BB%A3%E5%99%A8%E5%87%BD%E6%95%B0/","revision":"7284814fb4e77fdacb7d9824806ee0c5"},{"url":"/MySQLDevelop/","revision":"07938e18873cf52ba8693da833fa9fe6"},{"url":"/MongoDBandNodejs/","revision":"ca108be87ded84ee563b71eb37bde9f0"},{"url":"/TensorflowLearningTwo/","revision":"19a7d24197e1b73127fed1feff09eab2"}];
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

