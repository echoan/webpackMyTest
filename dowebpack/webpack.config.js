//此文件用来写webpack的相关配置，进行相关配置后就会根据配置过的信息来进行打包
//引入path模块
const path = require('path');
//引入生成html的模块
const HtmlCreate = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //分离css和js
//导出一个对象，里面包含设置的打包设置
module.exports = {
	mode: 'development', //此配置是用来去除打包时的警告信息 此处可以填写development和production 一个打包之后的代码有缩进，一个会对打包后的代码进行压缩
	//指定打包的入口文件 将来打包时会自动寻找入口文件下的文件作为打包文件
	// entry:'./src/index.js',
	//指定输出打包后的目录和文件会自动创建
	//以上可以写成如下的形式
	entry: {
		main: './src/index.js'
	},
	output: {
		path: path.resolve('./dist'), //绝对路径
		filename: 'main.js'
	},
	//配置其他文件的打包规则
	module: {
		rules: [
			{ test: /\.js|.jsx$/, use: 'babel-loader', exclude: /node_modules/ },
			{
				test: /\.(jpg|jpeg|png|svg|gif|woff|ttf|eot)$/,
				use: [
					// {
					// 	loader: 'file-loader',
					// 	options: {
					// 		name: '[hash:8].[name].[ext]',
					// 		outputPath: 'images/'
					// 	}
					// },
					{
						loader: 'url-loader',
						options: {
							limit: 4000,
							name: '[hash:8].[name].[ext]',
							outputPath: 'static/'
						}
					},
					{
						loader: 'image-webpack-loader',
						options: {
							mozjpeg: {
								progressive: true,
								quality: 65
								//quality 1-100 值越大质量越好体积越大
							},
							optipng: {
								enabled: false
							},
							pngquant: {
								quality: '65-90',
								speed: 4
								// speed 1-11 值越大质量越好体积越大
							},
							gifsicle: {
								interlaced: false,
								optimizationLevel: 2
								//三个值1,2,3。3就是最极致的压缩
							},
							//ios不支持
							webp: {
								quality: 75
							}
						}
					}
				]
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
						options: {
							minimize: true //图片最小化
						}
					}
				]
			},
			{
				test: /\.css$/,
				//loader: [ 'style-loader', 'css-loader' ] //引入对css文件处理的加载器
				//loader: [ 'style-loader', { loader: 'css-loader', options: { modules: true } } ] //启用css的模块化
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: true //css模块化
						}
					}
				] //分离css和js
			},
			{
				test: /\.less$/,
				loader: [ 'style-loader', 'css-loader', 'less-loader' ]
			} //处理less文件
		]
	},
	plugins: [
		/*
         1.读取模板内容 2.得到产出文件 3.将产出文件作为script标签插入到html标签中 4.将html写入指定目录
        */
		new HtmlCreate({
			template: './src/index.html', //将src目录下面的index.html当成html模板
			filename: 'index.html', //产出文件的名字 自己设置一般设置为index.html
			//去除引入文件的双引号以便节省空间压缩体积
			minify: {
				removeAttributeQuotes: true
			}
		}),
		/*
		2.分离css和js
		*/
		new MiniCssExtractPlugin({
			filename: 'styles.css'
		})
	]
};
