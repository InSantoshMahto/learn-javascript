/** @format */

import React from 'react';

class User extends React.Component {
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
				hello User! <br />
				<code>
					{this.state.country} and {this.state.city}
				</code>
				<br />
				<button onClick={this.changeCity}>set state</button>
			</h1>
		);
	}
}

export default User;
