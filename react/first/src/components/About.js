/** @format */

import React from 'react';

export default class About extends React.Component {
	constructor(props) {
		super(props);
		this.state = { state: 'JH', country: 'IN', city: 'RNC' };
	}

	changeCity = () => {
		this.setState({ city: 'DEL' });
	};

	render() {
		return (
			<h1>
				hello About! <br />
				<code>
					{this.props.name} and {this.state.state} and
				</code>
				<code>
					{this.state.country} and {this.state.city}
				</code>
				<br />
				<button onClick={this.changeCity}>set state</button>
			</h1>
		);
	}
}

