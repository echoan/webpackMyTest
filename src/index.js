console.log('555555');
import { webpackOne } from './es6';
// import './css/index.css';
// import './css/index1.css';
import style from './css/index.css'; //css模块化的测试
import style1 from './css/index1.css'; //css模块化的测试
// console.log(style, style1);
// import './fonts/iconfont.css';
import './fonts/iconfont.less';
console.log(webpackOne);
document.getElementById('testOne').getElementsByTagName('div')[0].className = style.classOne; //css模块化的测试
document.getElementById('testTwo').getElementsByTagName('div')[0].className = style1.classOne; //css模块化的测试
document.getElementById('testZero').getElementsByTagName('div')[0].setAttribute('id', style.imgBox); //css模块化的测试

import React from 'react';
import ReactDom from 'react-dom';
// const myDom = React.createElement('h1', { id: 'Box' }, '我是一个h1标签');
const celticsPlayer = [ { name: '肯巴沃克' }, { name: '塔图姆' }, { name: '杰伦' }, { name: '斯玛特' }, { name: '海沃德' } ];
// import 'antd/dist/antd.css';
import 'antd/dist/antd1.less';
import One from './components/One/One';
import Two from './components/Two/Two';
ReactDom.render(
	<div>
		{/* {celticsPlayer.map((item, index) => {
			return <h3 key={index}>{item.name}</h3>;
		})} */}
		<One player={celticsPlayer} />
		<Two />
	</div>,
	document.getElementById('app')
);
