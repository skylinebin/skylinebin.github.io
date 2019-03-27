---
layout: post
title:  "可以了解的Webpack相关知识"
date:   2019-03-27 22:30:31
image: 'https://store.skylinebin.com/JavaScript.png'
description: 'Webpack knowledge '
tags:
- FrontEnd
- Code
- JavaScript
- Webpack
categories:
- SkylineBin
twitter_text: 'Webpack knowledge '
---  

### Webpack 基本原理 

#### Webpack 执行原理  
Webpack 是一个 JavaScript 应用程序 的 **静态资源打包器**(module bundler)。  
打包原理是：webpack 在打包应用程序时，它会递归地构建一个**依赖关系图**(dependency graph)。  

在 Webpack 中**一切文件皆模块**，通过 Loader 转换文件，通过 Plugin 注入钩子 ，最后输出由多个模块组合的文件。  

![Webpack官网描述](https://sdns.skylinebin.com//fromPicGo/webpack.png)  

正如 Webpack 官网中的描述一样，一切文件资源如 JavaScript、CSS、SCSS、图片、模版等等，对 Webpack 来说都是一个个模块。因此可以清晰地描述各个模块间的依赖关系，以方便 Webpack 对模块进行组合和打包。  

使用 Webpack 时，操作的是写好的前端文件，输出时浏览器能使用的静态资源。  
描述输入输出的方式如这段代码所示

```javascript
module.exports = {
    entry: './index.js',
    output: {
        filename: 'bundle.js'
    }
}
```
entry是所有模块的入口，从入口开始递归解析出所有依赖的模块。
输出是将所有依赖的模块打包成一个 bundle.js 文件输出。  

Webpack 的优点是：  
- 处理模块化的项目，使用方便，开箱即用  
- 有丰富的 plugins 扩展，功能完整  
- 生态环境和维护团队良好，开发者比较活跃，有良好的开发体验并能保证质量

#### Webpack 初始化项目  
在具有Node环境，使用 npm init 创建一个新的模块化项目后，即可安装使用 Webpack。  
一般情况下，使用  

```
npm i -D webpack  
// npm install --save-dev webpack
```  

在 Webpack 4.0 之后，还需要安装 webpack-cli  

```
npm i -D webpack-cli  
// npm install --save-dev webpack-cli
```  

在根目录创建 webpack.config.js 配置文件后  
```javascript
const path = require('path');

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    }
}
```  
在入口文件里面的 index.js 中写部分代码，例如引入其他写好的模块，并写入一些语句  

运行 webpack 打包：  
```
npx webpack
```
以上指令是 npx webpack --config webpack.config.js 的简写形式  

可以在 package.json 中配置 script 子项：  
```
"scripts": {
	"build": "npx webpack --config webpack.config.js",
}
```
可通过 npm run build 运行。

此时，Webpack 可根据配置文件在 dist 目录里面输出 main.js，  
此时的 js 是一个打包的 index.js 引入所有模块的文件，即：  
在 dist 目录下的 html 文件引入 main.js 即可实现与 在 src 中的 html 文件引入 index.js 以及 index.js 中其他所有 import 的 js 文件 相同的效果。  

webpack 默认是可以打包 js 的，但是如果需要打包其他"模块"，比如样式、转换ES6的Babel、图片等等，就需要引入专门的插件，下面一节是对常用 Webpack 插件的描述与记录。  


### 常用 Webpack 插件解析记录  
#### css-loader 和 style-loader 的使用  
在 webpack 中 加载 非 js 的 css 文件(index.js 中通过 import css 引入的)，就需要 使用专门的 loader，即 css-loader 和 style-loader。  
先安装：  
```
npm i -D css-loader style-loader
```  
- **css-loader** 的作用是 让 webpack 支持解析 import 的 css 模块  
- **style-loader** 的作用是 将依赖的 css 注入到 html 中，注入是通过 JavaScript 脚本来实现的  

在 webpack.config.js 中添加以下配置：  
```javascript
module: {
	rules: [
		{
			test: /\.css$/,
			use: ['style-loader','css-loader']
		}
	]
}
```
rules 是 Webpack 中配置 不同模块的处理规则，是一个对象数组。每一个对象可以过滤一种或多种格式的文件(模块)。  
上述配置中，test 项 是通过正则来筛选出 需要处理的文件  
use 是配置使用什么 loader 进行处理，**处理的顺序是 从右向左**，即先使用写在后面的模块，后使用写在前面的模块。这里就是对筛选出的所有引入的 .css 文件先通过 css-loader 解析，再通过 style-loader 进行注入，从而实现 css 文件的注入。  

#### sass-loader 的使用  
如果想要处理引入的 .sass 文件，可以使用 sass-loader 模块。使用 sass-loader 模块将 sass 或者 scss 文件处理成 css 文件，再通过 css-loader 和 style-loader 即可注入。  
除了安装的css-loader 和 style-loader， 还需要安装 sass-loader 和 node-sass:  
```
npm i -D sass-loader node-sass
```  
在配置文件中添加 sass 模块的 rule:  
```javascript
module: {
  rules: [
  	{
  	  test: /\.(sc|c|sa)ss$/,
  	  use: ['style-loader','css-loader','sass-loader']
  	}
  ]
}
```
使用合并的正则来对所有种类的样式文件进行筛选过滤，在处理时先进行 sass-loader 再通过 css-loader 和 style-loader处理。  

#### 启用样式的 SourceMap  

由于之前将 sass 文件或者 css 文件通过 JavaScript 脚本注入，在页面中调试时是看不到写样式的，只有启用 sourceMap才能在调试时追踪样式源文件。  
此时需要配置 rules 里面 loader 的 options 如下：  
```javascript
module: {
  rules: [
    {
      test: /\.(sc|c|sa)ss$/,
      use: [
      	'style-loader',
      	{
      	  loader: 'css-loader',
      	  options: {
      	  	sourceMap: true,
      	  }
      	},
      	{
      	  loader: 'sass-loader',
      	  options:{
      	    sourceMap: true,
      	  }
      	}
      ] // end use
    }
  ] // end rules
}
```
一般只有在开发环境才会启用 sourseMap，这样在调试时可以检查元素的样式，定位到编写的源文件。  

#### PostCSS 的使用  
[PostCSS](https://www.postcss.com.cn/) 是一个 CSS 的预处理工具，可用来检查 CSS 以及为 CSS3 添加前缀，以及用于样式校验。  
基于 PostCSS 衍生出 [一系列处理 CSS 的插件](https://www.postcss.parts/)，比如可以使用 autoprefixer 结合 postcss-loader 为 CSS 代码自动添加 CSS3 规定的前缀。  
先安装需要的插件:  
```
npm i -D postcss-loader autoprefixer
```  
在 Webpack 的配置中，添加对 postcss 的处理规则。  
因为 postcss-loader 是预处理 css，所以应该放在 sass-loader 之后，css-loader 之前。配置包括 ident、sourceMap、plugins 等等，基本的配置如下所示：  
```javascript
module: {
  rules:[
    {
      test: /\.(sc|c|sa)ss$/,
      use: [
      'style-loader',
      {
      	loader: 'css-loader',
      	options: {
      		sourceMap: true,
      	}
      },
      {
      	loader: 'postcss-loader',
      	options: {
      		ident: 'postcss',
      		sourceMap: true,
      		plugins: (loader) => [
      		  require('autoprefixer')({
      		  	browsers: ['> 0.15% in CN']
      		  })
      		]
      	}
      },
      {
      	loader: 'sass-loader',
      	options:{
      		sourceMap: true,
      	}
      }
      ]
    }
  ]
},
```
上述代码中 browsers 的限定是 要兼容超过 85% 的浏览器，这些配置可以在 npmjs 官网上 的 [postcss-loader](https://www.npmjs.com/package/postcss-loader) 中查阅和借鉴。  


#### Webpack 抽取出所有样式输出单独的文件  

抽取出 所有模块的 CSS样式，就不能再使用 style-loader 进行注入了，可以使用 插件 mini-css-extract-plugin (Webpack4 之前版本 可以使用 extract-text-webpack-plugin)，提取 CSS 需要将 Webpack 的配置设置成 production 模式。  
先安装插件：  
```
npm i -D mini-css-extract-plugin
```
新增 生产版本的 Webpack 配置文件 webpack.prod.config.js  
先引入插件 mini-css-extract-plugin，再更改原有的 style-loader，并添加 plugins 配置，如下所示：  
```javascript
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 省略 声明 模式和其他配置部分
module: {
  rules: [
  {
  	test: /\.(sc|c|sa)ss$/,
  	use: [
  	  MiniCssExtractPlugin.loader,
  	  {
  	  	loader: 'css-loader',
  	  	options: {
  	  		sourceMap: true,
  	  	}
  	  }, {
  	  	loader: 'postcss-loader',
  	  	options: {
  	  		ident: 'postcss',
  	  		sourceMap: true,
  	  		plugins: (loader) => [
  	  			require('autoprefixer')({
  	  				browsers: ['> 0.15% in CN']
  	  			})
  	  		]
  	  	}
  	  }, {
  	  	loader: 'sass-loader',
  	  	options: {
  	  		sourceMap: true,
  	  	}
  	  }
  	]
  }
  ]
},
plugins: [
	new MiniCssExtractPlugin({
		filename: '[name].[hash].css', // 设置最终输出的文件名格式
		chunkFilename: '[id].[hash].css'
	})
],
```

用 `MiniCssExtractPlugin.loader ` 代替 原有的 style-loader ，并在 plugins 中使用 `new  MiniCssExtractPlugin({})` 配置输出的文件格式。  

#### Webpack 压缩CSS文件 和 JavaScript 文件  
Webpack4 中可以使用 **optimize-css-assets-webpack-plugin** 插件**压缩 CSS 文件**。  
先安装插件：  
```
npm i -D optimize-css-assets-webpack-plugin
```
在生产环境的配置文件中，先引入插件，再在 优化(optimization) 项 中进行配置  
```javascript
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// 与 module 和 plugins 同级
optimization: {
	minimizer: [
		new OptimizeCssAssetsPlugin({}), // 压缩 CSS 的插件
	]
}
```  


Webpack4 中可以使用 **uglifyjs-webpack-plugin** 插件**压缩 JavaScript 文件**。  
先安装插件：  
```
npm i -D uglifyjs-webpack-plugin
```  
如果上述安装出现 "Unexpected token: name <\*\*\*\*>, expected: punc<>..."，的报错，  
错误原因是 这个插件默认不支持 ES6 版本，  
可以尝试安装 beta 安装，即：  
```
npm i -D uglifyjs-webpack-plugin@beta
```  

同样是在 生产环境的配置中，先引入插件，再在 optimization中配置，如下所示：  
```javascript
const UglifyjsPlugin = require('uglifyjs-webpack-plugin');

// 与 module 和 plugins 同级
optimization: {
	minimizer: [
		new OptimizeCssAssetsPlugin({}), // 压缩 CSS 的插件
		new UglifyjsPlugin({
			cache: true,
			parallel: true,
			sourceMap: true // 压缩 javascript 的插件
		})
	]
}
```  
在 UglifyjsPlugin 的配置项中，分别配置了 cache: true 缓存无变化不压缩，parallel: true 启用并行压缩，sourceMap: true 开启 sourceMap。  

#### Webpack 中为生成的文件打hash版本号及后期处理  
因为如果一直使用相同的文件名，每次更改后，在生产环境中，浏览器端可能存在同名资源文件缓存的问题，为解决此问题，可以给输出的 js 、css 文件的文件名打上版本号。  
具体的操作方式是，在配置文件输出时，需要使用：  
```javascript
filename: 'index.[hash].js',

new MiniCssExtractPlugin({
	filename: '[name].[hash].css', // 设置最终输出的文件名格式
	chunkFilename: '[id].[hash].css'
})
```
即，使用 \*\*.[hash].css 来输出 带 Hash 版本的文件  

但是，带版本的文件给 html 引入带来了困难(文件名的变化导致了引入的繁琐。为解决 html 中引入带版本的 js/css 资源文件更新问题，可以使用 **html-webpack-plugin** 插件，此插件可以把打包后的 css 或 js 文件引用直接注入到 HTML 模版中，自动生成 html 文件。  
先安装插件：  
```
npm i -D html-webpack-plugin
```  
在 Webpack 配置文件中，先引入，然后在 plugins 配置项中进行配置，具体代码如下：  
```javascript
const HtmlPlugin = require('html-webpack-plugin');

plugins: [
	new HtmlPlugin({
		title: 'Webpack配置项学习', // 默认: Webpack App
		filename: 'index.html', // 默认值: index.html
		template: path.resolve(__dirname, 'src/main.html'), // 指定模版文件
		minify: { // 启用压缩的配置
			collapseWhitespace: true, // 是否折叠空白
			removeComments: true, // 是否移除注释
			removeAttributeQuotes: true // 是否移除属性的引号
		}
	})
]
```  
上述配置中，可将打包生成的带有版本号的文件注入到 index.html 中输出，这个 html 文件可以使用 src/main.html 下的模版生成，在模版中可以自己定义一些通用的东西。 
并且 html-webpack-plugin 插件可配置一些 输出 html 文件 的优化，例如折叠空白，移除注释，移除属性的引号等等，这些对性能优化都有帮助。  

经过以上配置后，每次运行 Webpack 打包，都会在 dist 目录中生成 index.html 和 带版本的 压缩 js 和 css 文件。  

由此也带来了一个小问题，就是会生成很多不同版本的文件累积在 dist 目录。这个问题可以使用 **clean-webpack-plugin** 插件来解决。  
先安装插件：  
```
npm i -D clean-webpack-plugin
```  
在 Webpack 配置文件中，先引入 clean-webpack-plugin，然后在 plugins 配置项中进行配置，具体代码如下：  
```javascript
const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');

plugins: [
	new HtmlPlugin({
		title: 'Webpack配置项学习', // 默认: Webpack App
		filename: 'index.html', // 默认值: index.html
		template: path.resolve(__dirname, 'src/main.html'), // 指定模版文件
		minify: { // 启用压缩的配置
			collapseWhitespace: true, // 是否折叠空白
			removeComments: true, // 是否移除注释
			removeAttributeQuotes: true // 是否移除属性的引号
		}
	}),
	new CleanPlugin()
]
```
上述的 CleanPlugin() 方法即可在每次编译输出前，先清空 dist 目录。CleanPlugin() 放在 plugins 中的任何位置都可以。老版本的 clean-webpack-plugin 可能需要传入路径参数，新版本(笔者安装的是 ^2.0.1)不需要传入参数。具体配置可查阅 npmjs 官网。  

#### Webpack 中加载图片和图片优化  

Webpack 构建过程中遇到 import、require、url 等都会经过 module 进行处理。而一些样式中可能会使用到背景图片，或者使用雪碧图(精灵图)等等  
sass-loader 或者 css-loader 在解析文件中 遇到 url引入资源文件时，会认为 url 是一个新的模块，但是却处理不了后缀为 .png 或者 .jpg 的文件，就会报错。如果只是针对资源文件来解决这个问题，可以使用 **file-loader** 来处理文件的导入。  
先安装插件：  
```
npm i -D file-loader
```  
然后在 Webpack 配置项中加入新的规则，开发环境和生产环境都需要配置。  
```javascript
{
	test: /\.(png|svg|jpg|gif|jpeg)$/,
	use: ['file-loader']
}
```
file-loader 插件只能实现将 图片文件拷贝到指定目录的功能。  

如果需要对图片进行优化和压缩，就需要在之前使用 **image-webpack-loader** 插件。  
先安装：  
```
npm i -D image-webpack-loader
```  
在 Webpack 中加入相关的配置，放在 file-loader 的后面，即使用时先用 image-webpack-loader 再用 file-loader，此时配置如下：  
```javascript
{
  test: /\.(png|svg|jpg|gif|jpeg)$/,
  use: [
    'file-loader',
    {
      loader: 'image-webpack-loader',
      options: {
        mozjpeg: {
        	progressive: true,
        	quality: 65
        }, // enabled: true 打开优化 png 文件的配置
        optipng: {
        	enabled: false,
        },
        pngquant: {
        	quality: '65-90',
        	speed: 4
        },
        gifsicle: {
        	interlaced: false,
        }, //  配置 quality 打开优化 webp 文件的配置
        webp: {
        	quality: 75
        }
      }
    }
  ]
}
```
运行后，dist 目录中的图片文件相比原文件 有一定比例的压缩  

#### Webpack 中将图片转成 base64 格式注入到页面  
**url-loader** 插件的功能类似 file-loader，可判断 url 地址对应的文件的大小，将限定大小内的图片文件转成 base64 格式注入到页面，提高访问效率。  
实际使用中确实可以将大小较小的图片转换成 base64 格式的文件注入到页面，减少图片的 http 请求。  
先安装插件：  
```
npm i -D url-loader
```  
在Webpack 图片的 rules 里面，把原来的 file-loader 换成 url-loader，即:  
```javascript
{
  test: /\.(png|svg|jpg|gif|jpeg)$/,
  use: [
    {
    	loader: 'url-loader',
    	options: {
    		limit: 10000
    	}
    },
    {
      loader: 'image-webpack-loader',
      options: {
        mozjpeg: {
        	progressive: true,
        	quality: 65
        }, // optipng.enabled: false will disable optipng
        optipng: {
          enabled: false,
        },
        pngquant: {
          quality: '65-90',
          speed: 4
        },
        gifsicle: {
          interlaced: false,
        }, // the webp option will enable WEBP
        webp: {
          quality: 75
        }
      }
    }
  ]
}
```
上述配置中 `limit: 10000` 限定的文件大小是 10 kb，小于 10 kb 的图片会被转换成 base64 格式的文件嵌入到 css 中，不会被当成文件引入。大于规定限制的文件，还是会被引入。 
注意限制图片的大小，太小的图片可考虑多个使用精灵图。  


#### Webpack 中提取合并 生产环境和开发环境的配置  

模式为 development  和 production 的配置文件有一些不同点，但也有很多相同点，相同的配置不应该重复写。  
插件 **webpack-merge** 可以把开发环境和生产环境的公共配置文件抽取成一个公共配置文件中，使用时通过 merge 的方式，引用 公共配置文件 和 不同模式的配置文件。  
先安装插件：  
```
npm i -D webpack-merge
```  
将原有的开发环境和生产环境的配置文件改造以下三个文件：  
- webpack.common.js  
- webpack.dev.js  
- webpack.prod.js  
都放在项目的根目录。  

在 配置文件 webpack.common.js 中保留使用的公共配置，例如 **入口文件定义，图片的处理规则，html模版的自动注入，自动清理 dist 目录**等等，这些操作都会用到。  
webpack.common.js 的配置需要 模块化输出  
```javascript
const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');

/* eslint-disable */
module.exports = { 
    entry: './src/index.js',
	// ...
	
}
```

在 配置文件 **webpack.dev.js** 中配置开发环境使用的独特配置项，使用时需要先引入 webpack.common.js 的输出 以及 webpack-merge 模块，通过  webpack-merge 模块中的方法进行合并，配置大概如下所示：  
```javascript
const mergeWebpack = require('webpack-merge');
const commonConfig = require('./webpack.common');

let devConfig = {
    mode: 'development',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
	// ...
}

module.exports = mergeWebpack(commonConfig, devConfig);
```

同样，在 **webpack.prod.js** 中配置生产环境使用的独特配置项，使用时也需要先引入 webpack.common.js 的输出 以及 webpack-merge 模块，即：  
```javascript
const mergeWebpack = require('webpack-merge');
const commonConfig = require('./webpack.common');
const webpack = require('webpack');

let prodConfig = {
    mode: 'production',
    output: {
        filename: 'index.[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
	// ...
}

module.exports = mergeWebpack(commonConfig, prodConfig);
```
webpack.prod.js 文件中的配置主要放 CSS 提取处理，css 文件的压缩以及 JavaScript  文件的压缩等等。  

此时需要重新配置 package.json 的 script 脚本，使用不同的指令运行开发环境或者生产环境，即：  
```javascript
"scripts": {
	"test": "echo \"Error: no test specified\" && exit 1",
	"build": "npx webpack --config webpack.dev.js",
	"watch": "npx webpack --watch --config webpack.dev.js",
	"dist": "npx webpack --config webpack.prod.js"
}
```
其中带有 watch 的指令是可以让 Webpack 启动自动编译。  

#### Webpack 中使用插件 webpack-dev-server 实现自动重新加载页面(热更新)  
插件 **webpack-dev-server** 提供了一个 可实时重新加载的 Web 服务器，webpack-dev-server 在内存中进行编译，并不直接输出至 dist 目录。 
先安装插件：  
```
npm i -D webpack-dev-server
```  
在开发环境的配置(webpack.dev.js)中，加入 devServer 的配置项(与 mode 同等级),常用配置项如下：  
```javascript
devServer: {
	clientLogLevel: 'warning', // 输出的异常级别 可能的值有 none, error, warning 或者 info（默认值)
	hot: true, // 启用 webpack 的模块热替换特性, 这个需要配合： webpack.HotModuleReplacementPlugin插件
	contentBase: path.join(__dirname, "dist"), // 告诉服务器从哪里提供内容， 默认情况下，将使用当前工作目录作为提供内容的目录
	compress: true, // 是否启用压缩一切服务都启用gzip
	host: '127.0.0.1', // host 指定使用一个 host。默认是 localhost。如果你希望服务器外部可访问 0.0.0.0
	port: 8880, // 端口
	open: true, // 是否打开浏览器
	overlay: { // 出现错误或者警告的时候，是否覆盖页面线上错误消息。
		warnings: true,
		errors: true
	},
	publicPath: '/', // 此路径下的打包文件可在浏览器中访问。
	proxy: { // 设置代理
		"/api": { // 访问api开头的请求，会跳转到  下面的target配置
			target: "http://127.0.0.1:8899",
			pathRewrite: {
				"^/api": "/ERMProject"
				// 例如请求 /api/getdatas 被转换成=> http://127.0.0.1:8899/ERMProject/getdatas
			}
		}
	},
	quiet: true, // 启用 quiet 后 来自 webpack 的错误或警告在控制台不可见。
	watchOptions: { // 监视文件相关的控制选项
		poll: true, // webpack 使用文件系统(file system)获取文件改动的通知。
		ignored: /node_modules/, // 忽略监控的文件夹，正则
		aggregateTimeout: 300 // 默认值，当第一个文件更改，会在重新构建前增加延迟
	}
}
```  
启用热更新需要 hot 配置项为 true ，并且需要引入 Webpack，在 plugins 中添加两个插件，即：  
```javascript
const webpack = require('webpack');

plugins: [
	new webpack.NamedModulesPlugin(), // 更易查看 patch 的依赖
	new webpack.HotModuleReplacementPlugin() // 替换插件
]
```
运行一下指令：  
```
npx webpack-dev-server --config webpack.dev.js
```  
在 windows 系统中 host 设置 0.0.0.0 可能会启动失败，建议使用 host: '127.0.0.1'，  
此时启动后，可在 http://127.0.0.1:8080/index.html 中看到运行的项目，此时更改源文件，保存后可看到实时更新。  

#### webpack-dev-server 插件配置 proxy 代理使用

上述配置中的代理功能，可以使用 axios 进行请求测试(先 npm i -P axios 安装)   
在index.js 入口文件中，请求接口如下：  
```javascript
import axios from 'axios';

axios.get('/api/findUser?page=1&username=')
    .then(res => console.log('res: ', res));
```
此时 开发环境的配置(webpack.dev.js) 中配置的代理项为：  
```javascript
proxy: { // 设置代理
	"/api": { // 访问api开头的请求，会跳转到  下面的target配置
		target: "http://127.0.0.1:8899",
		pathRewrite: {
			"^/api": "/ERMProject"
			// 例如请求 /api/getdatas 被转换成=> http://127.0.0.1:8899/ERMProject/getdatas
		}
	}
},
```
在加载页面时，可以正确地代理请求
真实的接口地址为：http://127.0.0.1:8899/ERMProject/findUser?page=1&username=  
请求 https 协议的接口，可能会因为 127.0.0.1 不在证书可信任列表而遭到拒绝。  
使用 proxy 可以轻松进行前后端分离 以及模拟调试，并解决请求接口过程中的跨域请求。  

#### webpack 配置中 启用 Babel  
很多项目中都需要将 ES6 文件转成 ES5 输出，就需要使用 babel 系列插件。  
先安装插件：  
```
npm i -D babel-loader babel-core @babel/preset-env
```  
在 babel 版本 1.7 之后，需要使用 `@babel/preset-env ` 而不是原来的 `babel-present-env`   
在 module 中 加入对 js 文件的处理规则，写在 webpack.common.js  文件中，即：  
```javascript
rules: [
	{
		test: /\.js$/,
		exclude: /(node_modules)/,
		use: [
			{
				loader: 'babel-loader',
				options: {
					cacheDirectory: true //启用 Babel 缓存
				}
			}
		]
	},
	// ...
]
```

**在 根目录新建 .babelrc 文件**，内容为：  
```javascript
{
    "presets": ["@babel/preset-env"],
}
```
此时，再运行 npm run build, 编译生成的 main.js 中就已经是被转换成 ES5 的 JavaScript 代码。  
上述rules配置的 options 项是 babel-loader 的优化规则，可以配置缓存 loader 的执行结果。  

对于 webpack 中 Babel 相关的优化，还有插件 **@babel/plugin-transform-runtime** (开发环境下安装使用) 和 插件 **@babel/runtime** (生产环境运行时安装使用)，具体的使用规则可以查阅 npmjs 官网中的插件描述。  


#### webpack 配置模块解析以及创建别名  
可以配置一些模型引用时的配置项，提升项目开发效率，例如，可以设置引入文件时不用带上后缀，使用别名来表示根目录等等，具体的配置如下：  
在 与 entry 同级的 resolve 配置中加入以下配置：  
```javascript
resolve: {
	alias: {
		'@': path.resolve(__dirname, 'src/')
	},
	extensions: [".js", ".vue", ".json"],
},
```
上述配置中，alias 里面是设置路径的别名。extensions 是设置引用时可不加文件后缀的文件类型。  



以上的 Webpack 相关的插件都是常用的插件，具体的配置项可能会因为 版本的更新有所改变，配置时可以根据提示或者 npmjs 官网的配置进行调整，一般都可以解决。

### Webpack 与 Gulp、Rollup 的区别与联系  
#### Gulp 构建工具  

[Gulp](http://gulpjs.com) 是一个**基于流**的自动化构建工具。除了可以管理和执行任务，还支持监听文件、读写文件。  
Gulp 引入流的概念，并提供一系列插件来处理流。  

常用的 Gulp 的方法有：  
- 通过 gulp.task 注册一个任务  
- 通过 gulp.run 执行任务  
- 通过 gulp.watch 监听文件的变化  
- 通过 gulp.src 读取文件  
- 通过 gulp.dest 写文件  

Gulp 的用法一般是：  
1. 先引入插件的依赖  
2. 设置任务，在任务中先声明filter过滤器  
3. 将源文件通过 pipe 管道处理，处理时选择过滤器或者插件的配置  
4. 返回处理后的文件  

Gulp 的优点是 好用又不失灵活，既可以单独构建也可和其他工具搭配使用。  

#### Rollup 构建工具  
[Rollup](https://rollypjs.org) 是一个专注于 ES6 的模块打包工具。  
Rollup 最开始的亮点是，可针对 ES6 代码进行 Tree Shaking，以除去那些已被定义但没被使用的代码并进 Scope Hoisting，以减少输出文件的大小 和提升运行性能。  

Rollup 与 Webpack 的区别与联系：  
- Rollup 是 Webpack 流行后才出现的替代品  
- Rollup 功能虽不如 Webpack 完善，但其配置和使用更简单  
- Rollup 不支持代码拆分，但打包出来的代码没有类似 Webpack 的加载、执行和缓存的代码

Rollup 在用于打包 JavaScript 库时比 Webpack 更有优势，因为其打包出来的代码更小。


### 参考资料  
- [Webpack中文官网](https://www.webpackjs.com/)  
- [Webpack 模块打包原理](https://juejin.im/post/5c94a2f36fb9a070fc623df4?utm_medium=hao.caibaojian.com&utm_source=hao.caibaojian.com)  
- [Webpack 官网](https://webpack.js.org/)  
- [Webpack4 入门到进阶](https://malun666.github.io/aicoder_vip_doc/#/pages/vip_2webpack)  
- [《深入浅出 Webpack》](http://webpack.wuhaolin.cn/)



