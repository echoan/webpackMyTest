import React, { Component } from 'react';
import './index.less';
class oneComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// celticsPlayer: [ { name: '肯巴沃克' }, { name: '塔图姆' }, { name: '杰伦' }, { name: '斯玛特' }, { name: '海沃德' } ]
		};
	}
	render() {
		return (
			<div id="OneDiv">
				{/* {this.state.celticsPlayer.map((item, index) => (
					<h3 key={index}>
						{item.name}
						{'我是组件One'}
					</h3>
				))} */}
				{this.props.player.map((item, index) => (
					<h3 key={index}>
						{item.name}
						{'我是组件One,数据是props传来的'}
					</h3>
				))}
			</div>
		);
	}
}

export default oneComponent;
