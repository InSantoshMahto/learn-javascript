/** @format */

import React from 'react';

export default class Team extends React.Component {
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
				hello Team! <br />
				<code>
					{this.state.country} and {this.state.city}
				</code>
				<br />
				<button onClick={this.changeCity}>set state</button>
			</h1>
		);
	}
}