/** @format */

import React from 'react';
import logo from './logo.svg';
import './App.css';

// components
// import User from './components/User';
// https://codeburst.io/getting-started-with-react-router-5c978f70df91

function App() {
	return (
		<div className='App'>
			<header className='App-header'>
				<img src={logo} className='App-logo' alt='logo' />
				<p>Rello React</p>
				{/* <User name='santosh' age='21' /> */}
				<a
					className='App-link'
					href='https://reactjs.org'
					target='_blank'
					rel='noopener noreferrer'
				>
					Learn React
				</a>
			</header>
		</div>
	);
}

export default App;
