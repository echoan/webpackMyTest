//webpack 是什么？
/*
    Webpack其实就是一个打包工具，他的思想就是一切皆模块，css是模块，js是模块，图片是模块。
    并且提供了一些插件来(各种-loader)来编译模块，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript等），
    并将其转换和打包为合适的格式供浏览器使用。官方推荐使用CommonJs规范，但是也支持CMD、AMD、ES6模块
*/
// webpack可以做什么
/*
打包各种资源 css、 图片 、less、sass、typescript
转译 es6->es5
压缩代码 */
//如何使用webpack
/*
    1.初始化一个工程目录: npm init -y;

    2.安装  webpack: npm i webpack webpack-cli -D; webpack4, webpack 已经将 webpack 命令行相关的内容都迁移到 webpack-cli，所以除了 webpack 外，我们还需要安装 webpack-cli：

    3.在package.json的文件下去配置 将 

        "scripts": {
                "test": "echo "Error: no test specified" && exit 1"
                }

        修改为 

        "scripts": {
            "build": "webpack"
        } 
    用npm run build来执行打包命令

    4.打包时如果有没有手动去配置打包规则的话会自动寻找项目下的src目录中的index.js文件，并将其视为打包的
    (必须是index.js其他名字会报错找不到相关模块)文件，打包完成后将生成的打包文件(main.js)
    自动放在创建的dist文件夹下，如果配置了打包规则则按照打包规则来进行打包。
    
    5. 配置webpack.config.js文件设置打包规则 具体见webpack.config.js

    6.Html-webpack-plugin插件
        1 作用 根据配置的html产生一个引入打包后的html以方便测试
        2 安装 npm install html-webpack-plugin
        3 在webpack.config.js里面进行配置

    7.webpack-dev-server 插件

    1.作用 配置开发服务器 执行命令npm run dev 自动监听是否有修改 然后打包 打开浏览器
    2.安装 npm install webpack-dev-server -D
    3.在package.json文件中配置 此处

    "scripts": {
        "build": "webpack"
    },
    改为
    "scripts": {
        "build": "webpack",
        "dev":"webpack-dev-server"
    },
    这样一有更新会立马自动将更新同步到浏览器视图中

    8.webpack本身只打包js，假如需要打包其他模块 需要合适的loader 加载器。
    webpack打包时，发现这个要处理的文件不是 js 文件，然后就去配置文件中，查找有没有对应
    的第三方 loader 规则，如果能找到对应的规则，就会调用对应 loader 处理这种文件
    在调用 loader 时候，是从后往前调用的,当最后一个 loader 调用完毕，会把处理结果，
    直接交给 webpack 进行打包合并，最终输出到 main.js(打包之后的js) 中去。
    
    打包css文件 需要style-loader和css-loader
    安装：npm install style-loader css-loader -D
    css-loader 编译css代码
    style-loader 使用js把css样式作为style标签的内容插入到页面中
    loader的解析顺序是从下到上，从右往左,使用时两者顺序为css-loader在右，style-loader在左
    安装完之后需要在webpack.config.js里面进行配置才可以打包css文件

   
    打包图片
    file-loader url-loader (url-loader是比file-loader优化的版本)
    1 安装 npm i file-loader url-loader -D
    2 配置 见webpack.config.js

    less的打包
    less
    less less-loader style-loader css-loader
    1 安装 npm i less less-loader style-loader css-loader -D
    2 配置 见webpack.config.js
    */

/*使用webpack对项目中的图片资源进行打包和管理对于项目中图片的引用方式不同有所差异*/

//1.html中以img标签的src属性来引用图片 <img src ='imgPath'/>
/*安装并配置file-loader或url-loader
 如果使用file-loader 做如下配置
 use: [
        {
            loader: 'file-loader',
            options: {
                name: '[hash:8].[name].[ext]',//hash,name,ext是特殊占位符，分别表示文件对应的hash值,文件名称,文件的后缀名称,用namel属性来指定打包生成的图片的名称，默认以hash值命名
                outputPath: 'images/' //outputPath是为文件配置自定义 output 输出目录。默认文件自动生成在打包文件的根目录下。
            }
        }
    ]

除了file-loader以外，还可以使用url-loader,
使用url-loader时 做如下配置

use:[
        {
            loader:'url-loader',
            options:{
                limit:40000,
                name:'[hash:8].[name].[ext]',
                outputPath: 'static/'
            }
        }
]
url-loader功能类似于 file-loader，但是在打包的时候可以指定文件的限制值（单位:字节），如果文件小于指定的限制，会返回一个base64地址，
大于指定的限制值，则会返回一个图片资源。这样做的好处是可以减少http请求，提高性能。
除了file-loader和url-loader以外 对于html中的图片处理还需要 html-loader
安装配置html-loader如下
use:[
    {
        loader:'html-loader',
        options:{
            minimize: true,//图片最小化
        }
    }
]
*/
//2.css样式中以背景图来引用的图片 background: url(../img/two.jpg) no-repeat center center;
/*
对于图片的处理,使用url-loader或file-loader,配置如上
对于css文件的处理，使用css-loader和style-loader
配置如下：
    {
        test: /\.css$/,
        loader: [ 'style-loader', 'css-loader' ] //引入对css文件处理的加载器
    }
*/
//3.对于图片资源来说，通常体积都会比较大，所以有时候会使用loader来对图片进行优化，通常会使用image-webpack-loader来压缩图片体积。
/*
npm i image-webpack-loader -D
image-webpack-loader使用配置如下：
{
    loader: 'image-webpack-loader',
    options: {
            mozjpeg: {
                progressive: true,
                quality: 65
            }, //压缩jpg格式图片
            optipng: {
                enabled: false
            },//压缩png格式图片
            pngquant: {
                quality: '65-90',
                speed: 4
            },//压缩png格式图片
            gifsicle: {
                interlaced: false
            },//压缩gif图片
            //ios不支持
            webp: {
                quality: 75
            }
        }
}
*/
//css模块化和css资源的合并
/*如果多人协作开发的情况下，会有很大可能出现样式命名重复的情况，如果不做任何处理，后引入的css文件类名会覆盖掉之前引入的css相同类名的样式

对于这种情况可以使用css的模块化来处理
1.对css的处理启用模块化
//loader: [ 'style-loader', { loader: 'css-loader', options: { modules: true } } ] //启用css的模块化
2.为对应元素加上对应类名
3.可以看到CSS Modules对我们的类名做了哈希处理，这样就不用担心会有相同的样式的命名
但是如果我们引用了外部的字体或者外部其他的资源，在通过css模块化后，引用的内容的样式会出现问题，对于这种情况，我们可以将引入的外部资源的样式改为less，然后再
打包配置规则中，仅对自己写的css来进行模块化处理。

另外一个问题 我们知道，webpack对于css的处理是先用css-loader来编译css，后使用style-loader用js把css样式作为style标签的内容插入到页面中，
也就是css是js动态添加上去的，这样，当js文件中有一个长时间的阻塞事件时，页面将会处于长时间的无样式的状态，在体验上带来问题。
并且，只要修改了js部分的代码，那么css模块也会被重新打包，被当成css模块也有内容修改。
或者只修改了css模块，js模块是没有变化的，但是它们都是在一个打包完的文件中，所以都会被认为都有修改。
所以我们希望将css和js进行分离 css不再需要js动态插入到页面，而是先于js加载出来。

1.需要安装一个插件
npm install extract-text-webpack-plugin --save-dev
在webpack4.x的版本中，由于与webpack4兼容性问题，打包会提示Entrypoint undefined = extract-text-webpack-plugin-output-filename，
在webpack4.x的版本中我们使用mini-css-extract-plugin插件来处理这一问题
npm i mini-css-extract-plugin -D 安装

2.在webpack-config.js中添加如下配置
引入 
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
在plugins中 
new MiniCssExtractPlugin({
			filename: 'styles.css'
		})
在对css的处理规则上
use: [
        MiniCssExtractPlugin.loader,
        {
            loader: 'css-loader',
            options: {
                modules: true //css模块化
            }
        }
    ]

*/
//使用react
/*
1.安装
npm/cnpm install react react-dom -S
2.安装babel插件
npm/cnpm install babel-core babel-loader@7 babel-plugin-transform-runtime -D
cnpm/npm install babel-preset-env babel-preset-stage-0 -D
3.安装能够识别和转化jsx语法的包 babel-preset-react
cnpm/npm install babel-preset-react -D
4.在webpack.config.js中添加babel-loader的配置项
module:{
   rules:[
      {test:/\.js|jsx$/，use:'babel-loader'，exclude:./node_modules/}
    ]
}
5.在根目录添加 .babelrc配置文件
{
"presets":["env"，"stage-0"，"react"]，
"plugins":["transform-runtime"]
}
其他见index.js
*/

//React中antd的使用(React UI 组件库)
/*
    1.安装
    npm install antd -S
    2.在主入口文件引入antd的样式表 import 'antd/dist/antd.css
    3.在想使用antd组件的react组件中将antd组件导入
    4.将导入的antd组件以标签的方式丢到使用的位置即可
    见Two.js

    antd组件的按需导入
    如果在引用第三方框架的时候，将整个css全部引入进来，虽然是可以的，但是打包之后的文件体积显得过大
    有时候我们只引用了某个组件，那么这时再将整个的样式表全部引入就显得不是那么合适，所以可以通过配置将所需的样式按需自动加载,同时也避免了在主入口文件引入样式表。
    实现按需导入的方式
    1、安装用于按需加载组件代码和样式的 babel 插件。npm install babel-plugin-import
    2、在.babellrc中的plugins中添加如下配置 ["import", { "libraryName": "antd", "style": "css" }]或者在babel-loader中配置
    在.babellrc中配置如下

    按需引入相关
    在当前的这个demo下，我们是对css文件进行模块化处理的，我们引用的第三方库中的样式也是css，所以如果我们直接引入第三方库的css，那么样式不会起作用，所以这里我们拷贝了一份
    antd下的css并重新命名为了less文件，避免引入的样式不起作用。那么，如何避免将第三方库的css进行模块化，而又对于自己写的css进行模块化呢，我们可以将我们的自己的css改为less文件，在打包规则中，将less文件进行模块化处理
    而对css类型的文件不再进行模块化处理，这样就能避免我们引入的第三方库的css被模块化而不起作用了，同时保证了我们自己的样式less文件进行了模块化处理（有时候，如果我们自定义的样式文件如果是less
    ,我们其实没必要再进行模块化处理了）
*/
