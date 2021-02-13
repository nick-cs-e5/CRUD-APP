import { h } from 'preact';
import { Router } from 'preact-router';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import Profile from '../routes/addBranch';

const App = () => (
	<div id="app">
		<div class="mdl-layout mdl-js-layout mdl-layout--fixed-drawer">
			<div class="mdl-layout__drawer shadow">
				<center>
					<p className="pt-4 mt-1 pb-2" style={{fontSize: 20, color: "#0091ea", fontWeight: "bold"}}>Company Branch</p>
				</center>
				<nav class="mdl-navigation">
				<a class="mdl-navigation__link shadow-sm" href="/" style={{color: "#000000", fontSize: 16, textDecoration: "none"}}>Home</a>
				<a class="mdl-navigation__link shadow-sm" href="/branch/add" style={{color: "#000000", fontSize: 16, textDecoration: "none"}}>Add Branch</a>
				</nav>
			</div>
			<main class="mdl-layout__content">
				<div class="page-content">
				<Router>
					<Home path="/" />
					<Profile path="/branch/add"/>
				</Router>
				</div>
			</main>
		</div>
	</div>
)

export default App;
