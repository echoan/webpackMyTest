import React, { Component } from 'react';
import { Button, DatePicker } from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';
class TwoComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div id="antdBox">
				<Button type="primary" block>
					Primary
				</Button>
				<DatePicker locale={locale} />
			</div>
		);
	}
}

export default TwoComponent;
