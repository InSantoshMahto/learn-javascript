/** @format */

import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import About from './components/About';
import Contact from './components/Contact';
import User from './components/User';
import Team from './components/Team';
import * as serviceWorker from './serviceWorker';

const routing = (
	<Router>
		<div>
			<ul>
				<li>
					<Link to='/'>Home</Link>
				</li>
				<li>
					<Link to='/about'>About</Link>
				</li>
				<li>
					<Link to='/team'>Team</Link>
				</li>
				<li>
					<Link to='/user'>User</Link>
				</li>
				<li>
					<Link to='/contact'>Contact</Link>
				</li>
			</ul>
			<Route path='/' component={App} />
			<Route path='/about' component={About} />
			<Route path='/user' component={User} />
			<Route path='/team' component={Team} />
			<Route path='/contact' component={Contact} />
		</div>
	</Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
